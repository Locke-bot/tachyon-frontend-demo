import React from "react";
import { useSelector } from "react-redux";
import {
  Accordion, AccordionSummary, AccordionDetails,
  Typography, Stack, Chip, Box, CircularProgress
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LanguageIcon from "@mui/icons-material/Language";

const ORDER = ["assistant", "classifier", "catalog", "extract_players", "retrieval", "web_facet"/*, "web_search"*/];

const HEADLINES = {
  assistant: "Processing",
  classifier: "Analyzing query intent",
  catalog: "Checking roster/catalog metadata",
  extract_players: "Resolving player names",
  retrieval: "Retrieving context",
  web_facet: "Preparing web searches",
};

function PhaseIcon({ phase }) {
  if (phase === "start") return <CircularProgress size={14} thickness={6} sx={{ mr: 1 }} />;
  if (phase === "end")   return <CheckCircleOutlineIcon fontSize="small" color="success" sx={{ mr: 1 }} />;
  if (phase === "error") return <ErrorOutlineIcon fontSize="small" color="error" sx={{ mr: 1 }} />;
  return null;
}

function NodeDetail({ node, detail }) {
  if (detail == null) return null;

  if (node === "classifier") {
    const text = (typeof detail === "string" ? detail : "").trim();
    return text ? (
      <Typography variant="body2" sx={{ ml: 3, mt: 0.5}} className="node-detail">
        <em>Interpreted as:</em> “{text}”
      </Typography>
    ) : null;
  }

  if (node === "catalog") {
    const text = (typeof detail === "string" ? detail : "").trim();
    return text ? (
      <Typography variant="body2" sx={{ ml: 3, mt: 0.5, whiteSpace: "pre-wrap" }} className="node-detail">
        {text}
      </Typography>
    ) : null;
  }

  if (node === "extract_players") {
    const items = Array.isArray(detail) ? detail.filter(Boolean) : [];
    return items.length ? (
      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ ml: 3, mt: 0.5 }} className="node-detail">
        <Typography variant="body2" sx={{ mr: 0.5, mt: "2px" }} component="span"><em>Matched:</em></Typography>
        {items.map((name, i) => (
          <Chip key={i} label={name} size="small" variant="outlined" />
        ))}
      </Stack>
    ) : null;
  }

  if (node === "web_facet") {
    const queries = Array.isArray(detail) ? detail.filter(Boolean) : [];
    return queries.length ? (
      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ ml: 3, mt: 0.5 }} className="node-detail">
        {queries.map((q, i) => (
          <Chip
            key={i}
            icon={<LanguageIcon sx={{ fontSize: 16 }} />}
            label={q}
            size="small"
            variant="outlined"
          />
        ))}
      </Stack>
    ) : null;
  }

  if (node === "retrieval") return null;
  if (node === "assistant") return null;

  // fallback
  if (typeof detail === "string" && detail.trim()) {
    return <Typography variant="body2" sx={{ ml: 3, mt: 0.5 }} className="node-detail">{detail.trim()}</Typography>;
  }
  if (Array.isArray(detail) && detail.length) {
    return (
      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ ml: 3, mt: 0.5 }}  className="node-detail">
        {detail.map((d, i) => <Chip key={i} label={String(d)} size="small" variant="outlined" />)}
      </Stack>
    );
  }
  return null;
}

export default function ReasoningStepsComponent({ runId, defaultExpanded = true, title = "Reasoning steps" }) {
  const { timeline } = useSelector((state) => state.chat);
  const data = timeline?.[runId] || {}; // { node: [phase, detail] }
  const nodes = ORDER.filter((n) => data[n]);

  const [expanded, setExpanded] = React.useState(defaultExpanded);

  if (nodes.length === 0) return null;

  return (
    <Accordion expanded={expanded} disableGutters elevation={0} onChange={(_, is) => setExpanded(is)} sx={{ bgcolor: "transparent", mt: 1, maxWidth: "95%" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            minHeight: "unset",
            "& .MuiAccordionSummary-content": {
              my: 1, // override default margin
            },
          }}
        >
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }} onClick={() => setExpanded(false)}>
        <Stack spacing={1}>
          {nodes.map((node) => {
            const [phase, detail] = data[node] || [];
            return (
              <Box key={node} sx={{ pb: 1, borderBottom: "1px solid", borderColor: "divider" }} style={{ fontSize: 1}}>
                <Stack direction="row" alignItems="center" spacing={1} style={{ fontSize: 10 }}>
                  <PhaseIcon phase={phase} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }} style={{ fontSize: 10 }} class="flashin-red">
                    {HEADLINES[node] || node}
                  </Typography>
                </Stack>
                <NodeDetail node={node} detail={detail} />
              </Box>
            );
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}