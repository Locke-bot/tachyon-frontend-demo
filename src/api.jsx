// export const DOC_WS_API =`wss://tachyon-883917794458.us-central1.run.app/ws/insight-doc/`;
// export const MINDSET_WS_API =`wss://tachyon-883917794458.us-central1.run.app/ws/insight-mindset/`;
// export const FOLDER_WS_API =`wss://tachyon-883917794458.us-central1.run.app/ws/insight-folder/`;
// export const COMPARE_FOLDER_WS_API =`wss://tachyon-883917794458.us-central1.run.app/ws/insight-compare-folder/`;
// export const TOP_FOLDER_WS_API =`wss://tachyon-883917794458.us-central1.run.app/ws/insight-top-folder/`;
// export const COMPARE_MINDSET_WS_API =`wss://tachyon-883917794458.us-central1.run.app/ws/insight-compare-mindset/`;
// export const DISCOVERY_WS_API =`wss://tachyon-883917794458.us-central1.run.app/ws/insight-discovery/`;
// export const TOOL_WS_API =`wss://tachyon-883917794458.us-central1.run.app/ws/tool/`;
// export const DRAFT_WS_API =`wss://tachyon-883917794458.us-central1.run.app/ws/draft/`;

export const DOC_WS_API =
window.location.href.includes("localhost") ||
window.location.href.includes("127.0.0.1")
    ? `ws://127.0.0.1:8000/ws/agent/`
    : `wss://tachyon-883917794458.us-central1.run.app/ws/agent/`;