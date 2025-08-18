import React from "react";
import { useSelector } from "react-redux";
import {
  Accordion, AccordionSummary, AccordionDetails,
  Typography, Stack, Chip, Box, CircularProgress,
  Grid, Card, CardActionArea, CardContent, CardMedia, Link, Divider
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LanguageIcon from "@mui/icons-material/Language";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";

const HEADLINES = {
  assistant: "Processing",
  classifier: "Analyzing query intent",
  catalog: "Checking roster/catalog metadata",
  extract_players: "Resolving player names",
  retrieval: "Retrieving context",
  web_facet: "Preparing web searches",
  web_search: "Web results",
  integrate: "Integrate",
};

const NO_DETAIL_NODES = ["assistant", "retrieval"]

function PhaseIcon({ phase }) {
  if (phase === "start") return <CircularProgress size={14} thickness={6} sx={{ mr: 1 }} />;
  if (phase === "end")   return <CheckCircleOutlineIcon fontSize="small" color="success" sx={{ mr: 1 }} />;
  if (phase === "error") return <ErrorOutlineIcon fontSize="small" color="error" sx={{ mr: 1 }} />;
  return null;
}

const clamp = (lines) => ({
  display: "-webkit-box",
  WebkitLineClamp: lines,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-word",
});
const getDomain = (url) => {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; }
};
const faviconFor = (url) => {
  const d = getDomain(url);
  return d ? `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent("https://" + d)}` : "";
};

/* ---------- render a single web group (images + hits) ---------- */
function WebQueryGroup({ query, group }) {
  // Normalize group into { hits, images }
  let hits = [];
  let images = [];
  if (Array.isArray(group)) {
    hits = group;
  } else if (group && typeof group === "object") {
    hits = Array.isArray(group.hits) ? group.hits : [];
    images = Array.isArray(group.images) ? group.images : [];
  }
  const hasAnything = images.length > 0 || hits.length > 0;
  if (!hasAnything) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <LanguageIcon fontSize="small" />
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {query || "Search"}
        </Typography>
        {hits.length ? <Chip size="small" label={`${hits.length}`} variant="outlined" /> : null}
      </Stack>

      {images.length > 0 && (
        <Grid container spacing={1} sx={{ mb: 1 }}>
          {images.slice(0, 6).map((img, i) => {
            const url = typeof img === "string" ? img : img?.url;
            const alt = typeof img === "string" ? "" : (img?.description || "");
            if (!url) return null;
            return (
              <Grid item xs={6} sm={4} md={3} key={`${url}-${i}`}>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    image={url}
                    alt={alt}
                    sx={{ height: 140, objectFit: "cover", bgcolor: "background.default" }}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {hits.length > 0 && (
        <Grid container spacing={1.5}>
          {hits.map((hit, idx) => {
            const domain = getDomain(hit?.url || "");
            const scorePct = typeof hit?.score === "number" ? Math.round(hit.score * 100) : null;
            const favicon = hit?.favicon || faviconFor(hit?.url);

            return (
              <Grid item xs={12} sm={6} md={4} key={(hit && hit.url) || idx}>
                <Card variant="outlined" sx={{ height: "100%", borderRadius: 2 }}>
                  <CardActionArea
                    component={Link}
                    href={hit?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="none"
                    sx={{ height: "100%" }}
                  >
                    <CardContent sx={{ pt: 1.25, maxWidth: "270px" }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, ...clamp(2) }}>
                        {hit?.title || domain || "Untitled"}
                      </Typography>

                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5, mb: 0.75 }}>
                        {favicon ? (
                          <Box component="img" src={favicon} alt={domain} sx={{ width: 16, height: 16, mr: 0.5 }} />
                        ) : null}
                        {domain ? (
                          <Chip size="small" label={domain} variant="outlined" />
                        ) : null}
                        {scorePct != null ? (
                          <Chip size="small" label={`${scorePct}%`} variant="outlined" />
                        ) : null}
                      </Stack>

                      {hit?.content ? (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ ...clamp(3), width: { xs: "100%", md: "80%" }, maxWidth: { md: 260 }, lineHeight: 1.35 }}
                        >
                          {hit.content}
                        </Typography>
                      ) : null}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}

/* ---------- node detail renderer ---------- */
function NodeDetail({ node, detail, facetDetail }) {
  if (detail == null) return null;

  if (node === "integrate") {
    const items = Array.isArray(detail)
      ? detail.filter((t) => typeof t === "string" && t.trim())
      : [];
    if (!items.length) return null;

    return (
      <Timeline
        sx={{
          ml: 2,
          py: 0.5,
          "& .MuiTimelineItem-root:before": { flex: 0, padding: 0 },
          "& .MuiTimelineItem-root": { minHeight: "unset" },
          "& .MuiTimelineItem-root:not(:last-child)": { py: 1.25 },
        }}
      >
        {items.map((text, idx) => (
          <TimelineItem key={idx} sx={{ minHeight: "unset" }}>
            <TimelineSeparator>
              <TimelineDot variant="filled" sx={{ width: 8, height: 8, mt: 0.5 }} />
              {idx < items.length - 1 ? (
                <TimelineConnector sx={{ bgcolor: "divider" }} />
              ) : null}
            </TimelineSeparator>
            <TimelineContent sx={{ py: 0, mt: -0.25 }}>
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                {text}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    );
  }

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
        {/* <Typography variant="body2" sx={{ mr: 0.5, mt: "2px" }} component="span"><em>Matched:</em></Typography> */}
        {items.map((name, i) => (
          <Chip key={i} label={name} size="small" variant="outlined" className="node-detail"/>
        ))}
      </Stack>
    ) : null;
  }

  // When web results exist, we render them under web_search (and we hide web_facet row entirely)
  if (node === "web_search") {
    const groups = Array.isArray(detail) ? detail : [];
    const any = groups.some((g) =>
      Array.isArray(g) ? g.length : (g && typeof g === "object" && (g.hits?.length || g.images?.length))
    );
    if (!any) return null;
    
    return (
      <Box sx={{ ml: 0.5, mt: 0.5 }}>
        <Divider sx={{ mb: 2 }} />
        {groups.map((g, i) => (
          <WebQueryGroup key={i} query={facetDetail?.[i] || ""} group={g} />
        ))}
      </Box>
    );
  }

  // If we got here for web_facet, it means there are no web_search results yet → show the facet chips
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

  if (node === "retrieval" || node === "assistant" || node == "condense") return null;

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

/* ---------- main component ---------- */
export default function ReasoningStepsComponent({ runId, order, defaultExpanded=true}) {
  const { currentChat, timeline } = useSelector((state) => state.chat);
  const nodeMap = timeline?.[runId] || {};              // { node: [phase, detail] }
  const facetDetail = Array.isArray(nodeMap?.web_facet?.[1]) ? nodeMap.web_facet[1] : [];
  const webSearchDetail = nodeMap?.web_search?.[1];
  const hasWebResults =
    Array.isArray(webSearchDetail) &&
    webSearchDetail.some((g) =>
      Array.isArray(g) ? g.length : (g && typeof g === "object" && (g.hits?.length || g.images?.length))
    );

  // Only show nodes that appeared; if we have real web results, hide the web_facet row
  let nodes = order.filter((n) => nodeMap[n]);
  if (hasWebResults) nodes = nodes.filter((n) => n !== "web_facet");

  const [expanded, setExpanded] = React.useState(defaultExpanded);
  if (!(currentChat && Object.keys(currentChat).length)) return null;
  
  return (
    <Accordion
      expanded={expanded}
      disableGutters
      elevation={0}
      onChange={(_, is) => setExpanded(is)}
      sx={{
        bgcolor: "transparent",
        my: 1,
        maxWidth: "95%",
        "&::before": { display: "none" },
        bgcolor: (t) =>
          // t.palette.mode === "light"
          //   ? t.palette.grey[50]
            expanded ? t.palette.grey[50] : t.palette.background.paper,
      }}
      className="reasoning-steps"
    >
      <AccordionSummary
        // expandIcon={processing ? <CircularProgress /> : <ExpandMoreIcon />}
        expandIcon={nodes.length && expanded ? <ExpandMoreIcon /> : <></>}
        sx={{
          minHeight: "unset",
          "& .MuiAccordionSummary-content": { my: 1 },
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }} className={`${currentChat[runId] && currentChat[runId][0] && currentChat[runId][1] ? "" : "loading-shimmer"}`}>
          {currentChat[runId] && currentChat[runId][0] && currentChat[runId][1] ? "Done" : "Processing" }
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ pt: 0 }} onClick={() => setExpanded(false)}>
        <Stack spacing={1}>
          {nodes.map((node) => {
            const [phase, detail] = nodeMap[node] || [];
            return (
              detail||NO_DETAIL_NODES.includes(node)||phase==="start" ? <Box key={node}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PhaseIcon phase={phase} />
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 10 }}>
                    {HEADLINES[node] || node}
                  </Typography>
                </Stack>
                <NodeDetail node={node} detail={detail} facetDetail={facetDetail} />
              </Box>  : <></>
            );
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
