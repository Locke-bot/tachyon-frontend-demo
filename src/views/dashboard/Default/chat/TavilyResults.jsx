import React from "react";
import { useSelector } from "react-redux";
import {
  Accordion, AccordionSummary, AccordionDetails,
  Typography, Stack, Chip, Box, Grid, Card,
  CardActionArea, CardContent, CardMedia, Link, Divider
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LanguageIcon from "@mui/icons-material/Language";

const getDomain = (url) => {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; }
};
const faviconFor = (url) => {
  const d = getDomain(url);
  return d ? `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent("https://" + d)}` : "";
};
const clamp = (lines) => ({
  display: "-webkit-box",
  WebkitLineClamp: lines,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-word",
});

function QueryGroup({ query, group }) {
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
                    <CardContent sx={{ pt: 1.25 }}>
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
                          sx={{
                            ...clamp(3),
                            width: { xs: "100%", md: "80%" },
                            maxWidth: { md: 260 },
                            lineHeight: 1.35,
                          }}
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

export default function TavilyResults({ runId, defaultExpanded = true, title = "Web results" }) {
  const { timeline } = useSelector((state) => state.chat);
  const nodeMap = timeline?.[runId] || {};

  const facetDetail = Array.isArray(nodeMap?.web_facet?.[1]) ? nodeMap.web_facet[1] : [];
  const searchDetailRaw = nodeMap?.web_search?.[1];
  const searchDetail = Array.isArray(searchDetailRaw) ? searchDetailRaw : [];

  const [expanded, setExpanded] = React.useState(defaultExpanded);

  const any =
    Array.isArray(searchDetail) &&
    searchDetail.some((g) =>
      Array.isArray(g) ? g.length : (g && typeof g === "object" && (g.hits?.length || g.images?.length))
    );

  if (!any) return null;
  
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
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }} onClick={() => setExpanded(false)}>
        <Divider sx={{ mb: 2 }} />
        {searchDetail.map((group, i) => (
          <QueryGroup key={i} query={facetDetail[i] || ""} group={group} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}