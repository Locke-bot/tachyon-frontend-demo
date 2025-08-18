import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  useTheme,
} from "@mui/material";
import AddComment from "@mui/icons-material/AddComment";
import { v4 as uuidv4 } from "uuid";

import { openSnackbar } from "store/slices/snackbar";
import { IOSSwitch } from "./utils";

import { marked } from "marked";
import {
  fetchThreadsPreview,
  setCurrentChat,
  setCurrentThreadId,
  setTimeline,
} from "store/slices/chat";
import { useDispatch, useSelector } from "react-redux";

import ReasoningStepsComponent from "./ReasoningComponent";
import { setMode } from "store/slices/uiSlice";

const renderer = new marked.Renderer();
renderer.br = () => "<br><br>";

marked.setOptions({
  breaks: true,
  gfm: true,
  renderer,
});

export default function Main({ sendMessage, lastMessage }) {
  const dispatch = useDispatch();
  const { currentChat, currentThreadId, timeline } = useSelector(
    (state) => state.chat
  );

  const { mode } = useSelector(
    (state) => state.ui
  );

  const [question, setQuestion] = useState("");
  const [recording, setRecording] = useState(false);
  const [Mic, setMic] = useState(null);
  const [webChecked, setWebChecked] = useState(true);
  const inputRef = useRef(null);
  const localAnswerRef = useRef(null);

  const psContainerRef = useRef(null);
  const shouldAutoScrollRef = useRef(true);

  const ORDER = [
    // "assistant",
    "classifier",
    "catalog",
    "extract_players",
    "retrieval",
    "web_facet",
    "web_search",
    "integrate",
    // "answer"
    // "condense",
  ];
  const [visibleNodes, setVisibleNodes] = useState(ORDER);

  const handleScroll = () => {
    const psRefCurrent = psContainerRef.current;
    if (!psRefCurrent) return;
    const threshold = 5;
    const distance =
      psRefCurrent.scrollHeight -
      (psRefCurrent.scrollTop + psRefCurrent.clientHeight);
    shouldAutoScrollRef.current = distance < threshold;
  };

  useEffect(() => {
    const el = psContainerRef.current;
    if (shouldAutoScrollRef.current && el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "auto" });
    }
  }, [currentChat, timeline]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ok =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    if (!ok) return;

    import("./mic")
      .then((m) => setMic(() => m.default))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (webChecked) {
      setVisibleNodes(ORDER);
    } else {
      setVisibleNodes(ORDER.filter((i) => i.startsWith("web_")));
    }
  }, [webChecked]);

  useEffect(() => {
    if (lastMessage !== null) {
      if (
        [
          "APIError",
          "ValueError",
          "Error",
          "TimeoutError",
          "EmbeddingError",
        ].includes(JSON.parse(lastMessage?.data)?.message)
      ) {
        let amber =
          JSON.parse(lastMessage.data).message === "APIError"
            ? "OpenAI Error"
            : JSON.parse(lastMessage.data).message === "EmbeddingError"
            ? "File not parsed yet, please contact tech support."
            : JSON.parse(lastMessage.data).message === "TimeoutError"
            ? "Response timed out, please run again."
            : JSON.parse(lastMessage.data).message === "ValueError"
            ? "There was a problem processing your query."
            : "An error occurred";

        dispatch(
          openSnackbar({
            open: true,
            anchorOrigin: { vertical: "top", horizontal: "right" },
            message: amber,
            autoHideDuration: 5000,
            variant: "alert",
            alert: {
              color: "error",
            },
            close: false,
          })
        );
      }

      let data = JSON.parse(lastMessage?.data);
      // console.log(data);
      if (!data?.run_id || !currentChat.hasOwnProperty(data.run_id)) return;

      let thread_id = data.thread_id;
      let run_id = data.run_id;

      if (data?.type === "error") {
        dispatch(
          openSnackbar({
            open: true,
            anchorOrigin: { vertical: "top", horizontal: "right" },
            message: "An error occurred",
            autoHideDuration: 5000,
            variant: "alert",
            alert: {
              color: "error",
            },
            close: false,
          })
        );
        let updatedTimeline = { ...timeline };
        delete updatedTimeline[run_id];
        dispatch(setTimeline(updatedTimeline));

        let updatedChat = { ...currentChat };
        let q = updatedChat[run_id][0];
        delete updatedChat[run_id];
        setQuestion(q);
        dispatch(setCurrentChat(updatedChat));
      } else if (data?.type === "done") {
        if (Object.keys(currentChat).length === 1) {
          dispatch(fetchThreadsPreview({ uuid: currentThreadId }));
          dispatch(setCurrentThreadId(thread_id));
        }
      } else if (data?.type === "progress") {
        let node = data.node;
        let phase = data.phase;
        let detail = data.detail;
        if (visibleNodes.includes(node)) {
          let updatedTimeline = {
            ...timeline,
            [run_id]: {
              ...(timeline[run_id] || {}),
              [node]: [phase, detail],
            },
          };
          
          dispatch(setTimeline(updatedTimeline));
        }
      } else if (["answer", "assistant"].includes(data?.node) && data?.delta) {
        let token = data.delta;
        if (token) {
          localAnswerRef.current += token;
          
          const updated = { ...currentChat };
          const prev = updated[run_id];
          updated[run_id] = [prev[0], localAnswerRef.current];
          
          dispatch(setCurrentChat(updated));
        }
      } else if (
        ["answer", "assistant", "integrate"].includes(data?.node) &&
        data?.messages
      ) {
        let token = data.messages.at(-1)?.content;
        if (token) {
          localAnswerRef.current = token;

          const updated = { ...currentChat };
          const prev = updated[run_id];
          updated[run_id] = [prev[0], localAnswerRef.current];
          dispatch(setCurrentChat(updated));
        }
      }
    }
  }, [lastMessage]);

  const send = (query) => {
    setRecording(false);

    let q =
      query && typeof query === "string" ? query.trim() : question?.trim();
    if (q) {
      localAnswerRef.current = "";
      setQuestion("");

      const runId = uuidv4();
      dispatch(setCurrentChat({ ...currentChat, [runId]: [q.trim(), null] }));
      shouldAutoScrollRef.current = true;
      setTimeout(() => {
        const el = psContainerRef.current;
        if (el) {
          el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
        }
      }, 0);
      sendMessage(
        JSON.stringify({
          action: "input",
          message: q,
          thread_id: currentThreadId,
          run_id: runId,
          web_search: webChecked,
          type: mode
        })
      );
    }
  };

  const newChat = () => {
    dispatch(setCurrentThreadId(""));
  };

  const chatList = React.useMemo(
    () => (
      <>
        {Object.entries(currentChat).map(([runId, [q, a]]) => (
          <React.Fragment key={runId}>
            {[q, a].map((item_, idx) => (
              <React.Fragment key={idx}>
                {idx === 1 && (
                  <>
                    <ReasoningStepsComponent
                      runId={runId}
                      order={visibleNodes}
                    />
                  </>
                )}
                {item_ ? (
                  <Box
                    className={`message ${idx ? "assistant" : "user"}`}
                    style={{ fontSize: "smaller" }}
                    dangerouslySetInnerHTML={{ __html: marked(item_) }}
                  />
                ) : null}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </>
    ),
    [currentChat, timeline]
  );

  return (
    <Box component="main">
      <Box className="chat-panel">
        <Box className="chat-header">
          <Box className="chat-header-title">
            <span>Conversation</span>
          </Box>

          <Box className="chat-header-controls">
            <Box
              className="control-group"
              data-tooltip="Choose response depth: Simple for quick answers, Deep Dive for comprehensive analysis"
              data-tooltip-pos="bottom"
              data-tooltip-multiline
            >
              <label className="control-label">Mode</label>
              <ToggleButtonGroup
                value={mode.toLowerCase()}
                exclusive
                onChange={(_, v) => v && dispatch(setMode(v))}
                size="small"
                color="primary"
                disabled={Boolean(currentChat && Object.keys(currentChat).length)}
              >
                <ToggleButton value="simple" style={{ display: currentChat && Object.keys(currentChat).length && mode.toLowerCase()!=="simple" ? "none" : undefined }}>Simple</ToggleButton>
                <ToggleButton value="deep" style={{ display: currentChat && Object.keys(currentChat).length && mode.toLowerCase()!=="deep" ? "none" : undefined }}>Deep Dive</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box
              className="control-group"
              data-tooltip="Enable web search for real-time information"
              data-tooltip-pos="bottom"
            >
              <label className="control-label">Web Search</label>
              <label className="toggle-switch">
                <IOSSwitch
                  checked={webChecked}
                  onChange={(e) => setWebChecked(e.target.checked)}
                  sx={{
                    height: "22px",
                    width: "39px",
                    "& .MuiSwitch-thumb": { height: "18px", width: "18px" },
                    "& .MuiSwitch-track": { opacity: 1 },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#34773d",
                    },
                  }}
                />
              </label>
            </Box>

            <Box>
              <Tooltip id="new-chat-button" title="New chat">
                <IconButton onClick={newChat}>
                  <AddComment />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <Box
          className="chat-messages"
          id="chatMessages"
          onScroll={handleScroll}
          ref={psContainerRef}
        >
          {chatList}
        </Box>
        <Box className="composer">
          <Box className="composer-wrapper">
            <TextField
              inputRef={inputRef}
              sx={{
                "& .MuiInputBase-root textarea": {
                  minHeight: "unset !important",
                },
              }}
              multiline
              maxRows={4}
              id="question"
              fullWidth
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.code === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  setQuestion(e.target.value);
                  send();
                }
              }}
              placeholder={"Enter your question or prompt here."}
              InputProps={{
                className: "composer-input-wrapper",
                classes: { input: "composer-input" },
                endAdornment: (
                  <InputAdornment position="end" style={{ margin: 0 }}>
                    {Mic ? (
                      <Mic
                        question={question}
                        recording={recording}
                        setQuestion={setQuestion}
                        setRecording={setRecording}
                        style={{
                          color: !recording ? undefined : "blue",
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </InputAdornment>
                ),
              }}
              aria-describedby="search-helper-text"
              inputProps={{ "aria-label": "weight" }}
            />
          </Box>
          <button
            className="send-button p0"
            id="sendBtn"
            aria-label="Send message"
            data-tooltip="Send message (Enter)"
            data-tooltip-pos="left"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </Box>
      </Box>
    </Box>
  );
}
