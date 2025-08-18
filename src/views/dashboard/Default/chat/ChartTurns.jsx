import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

// material-ui
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { IconCopy, IconClipboardCheck } from "@tabler/icons-react";

// project imports
import { gridSpacing } from "store/constant";
import { useTheme } from "@mui/material/styles";

// markdown
import { marked } from "marked";
marked.setOptions({ breaks: true });

const ChatTurn = ({ text, variant = "question", isLast = false }) => {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  const [cleanCopied, setCleanCopied] = useState(false); // preserved for equivalence

  const getProcessedHtml = (t) => marked(t || "");

  const copyToClipboard = (t) => {
    navigator.clipboard
      .writeText((t || "").replace(/<BEGIN_HTML>[\s\S]*?<\/BEGIN_HTML>/g, "").trim())
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
  };

  useEffect(() => {
    if (copied) {
      const id = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(id);
    }
  }, [copied]);

  useEffect(() => {
    if (cleanCopied) {
      const id = setTimeout(() => setCleanCopied(false), 2000);
      return () => clearTimeout(id);
    }
  }, [cleanCopied]);

  // Delegate clicks for `.pill-button` to scroll to targets (kept from original)
  useEffect(() => {
    const handlePillClick = (event) => {
      const pill = event.target.closest(".pill-button");
      if (!pill) return;

      const id = pill.dataset.id;
      const section = pill.dataset.sectionId;
      const target = document.getElementById(`${section}-${id}`);
      if (!target) return;

      target.scrollIntoView({ behavior: "auto" });
    };

    document.addEventListener("click", handlePillClick);
    return () => document.removeEventListener("click", handlePillClick);
  }, []);

  return (
    <>
      <Grid item className="content-grid">
        <Grid container spacing={gridSpacing} textAlign="left">
          {variant === "question" ? (
            // QUESTION — now RIGHT bubble
            <Grid style={{ width: "calc(100% - 40px)" }}>
              <Grid
                container
                spacing={gridSpacing}
                style={{
                  justifyContent: "space-between",
                  marginTop: 0,
                  marginLeft: 0,
                }}
              >
                <Grid item />
                <Grid item style={{ width: "calc(100% - 40px)" }}>
                  <Card
                    sx={{
                      display: "inline-block",
                      float: "right",
                      // keep question colors the same as before
                      background:
                        theme.palette.mode === "dark"
                          ? theme.palette.dark[900]
                          : theme.palette.secondary.light,
                      width: "fit-content",
                      maxWidth: "calc(100% - 24px)",
                    }}
                  >
                    <CardContent sx={{ p: 2, pb: "16px !important" }}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Typography variant="body2" className="message user">{text}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          ) : // ANSWER — now LEFT bubble
          typeof text === "string" && !text.trim() ? (
            <div className="dot-typing"></div>
          ) : (
            <Grid item>
              <Grid container spacing={gridSpacing}>
                <Grid item>
                  <Card
                    sx={{
                      display: "inline-block",
                      float: "left",
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "grey.600"
                          : theme.palette.primary.light,
                      width: "calc(100% - 24px)",
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 2,
                        pb: "16px !important",
                        width: "fit-content",
                        maxWidth: "calc(100% - 24px)",
                      }}
                    >
                      <Grid container spacing={1} position={"relative"}>
                        <Grid
                          item
                          style={{
                            width: "inherit",
                            paddingBottom: "8px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            className="message assistant answer"
                            color={theme.palette.mode === "dark" ? "dark.900" : ""}
                            dangerouslySetInnerHTML={{
                              __html: getProcessedHtml(text),
                            }}
                          />
                        </Grid>

                        {isLast ? (
                          <></>
                        ) : text?.trim() ? (
                          <Box className="icon-footer-cover">
                            <Tooltip title={copied ? "Copied" : "Copy"}>
                              <IconButton
                                className="icon-copy"
                                disableTouchRipple
                                onClick={() => copyToClipboard(text)}
                              >
                                {copied ? (
                                  <IconClipboardCheck size={18} style={{ minWidth: "18px" }} />
                                ) : (
                                  <IconCopy size={18} style={{ minWidth: "18px" }} />
                                )}
                              </IconButton>
                            </Tooltip>
                          </Box>
                        ) : (
                          <></>
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

ChatTurn.propTypes = {
  variant: PropTypes.oneOf(["question", "answer"]).isRequired,
  text: PropTypes.string, // question or answer content
  isLast: PropTypes.bool, // for answers: hide copy icon when true
};

export default React.memo(ChatTurn);