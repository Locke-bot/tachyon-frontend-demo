import React from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { IconButton, Tooltip } from "@mui/material";

function Mic({ question, recording, setQuestion, setRecording }) {
  const recRef = React.useRef(null);
  const recordingRef = React.useRef(recording);
  const finalTextRef = React.useRef("");

  React.useEffect(() => {
    recordingRef.current = recording;
  }, [recording]);

  React.useEffect(() => {
    if (!question) finalTextRef.current = "";
  }, [question]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      console.log("Speech Recognition Not Available");
      return;
    }

    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";

    rec.onstart = () => {
      finalTextRef.current = "";
    };
    rec.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) finalTextRef.current += res[0].transcript;
        else interim += res[0].transcript;
      }
      if (recordingRef.current) setQuestion(finalTextRef.current + interim);
    };
    rec.onerror = () => {};

    recRef.current = rec;

    if (recordingRef.current) {
      try {
        rec.start();
      } catch {}
    }

    rec.onend = () => {
      if (recordingRef.current) {
        try {
          rec.start();
        } catch {}
      }
    };

    return () => {
      try {
        rec.abort();
      } catch {}
      recRef.current = null;
    };
  }, [setQuestion]);

  // start/stop when `recording` changes (no handler rebinds here)
  React.useEffect(() => {
    const rec = recRef.current;
    if (!rec) return;
    if (recording) {
      try {
        rec.start();
      } catch {}
    } else {
      try {
        rec.abort();
      } catch {}
    }
  }, [recording]);

  return (
    <>
      {recording && <div className="pulse-ring" />}
      <Tooltip title="Talk">
        <IconButton onClick={() => setRecording(v => !v)} className={`mic-button ${recording ? "recording" : ""}`} id="micButton" style={{ padding: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 1a4 4 0 0 0-4 4v7a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </IconButton>
      </Tooltip>
    </>
  );
}

export default Mic;
