import React, { useEffect, useState, useRef } from "react";
import { DOC_WS_API as AGENT_WS_API } from "api";

import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import useWebSocket from "react-use-websocket";

import Chat from "./main";
import { useDispatch } from "react-redux";
import { fetchThreadRuns, fetchThreadsPreview, setCurrentChat, setCurrentThreadId, setThreadGraphType, setTimeline } from "store/slices/chat";
import { Box, IconButton } from "@mui/material";
import Logo from "ui-component/Logo";
import useAuth from "hooks/useAuth";
import ChatHistory from "./chatHistory";
import { useSelector } from "react-redux";
import { setMode, setSidebarToggle } from "store/slices/uiSlice";

export default function Main() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { currentChat, currentThreadId, threadGraphType } = useSelector(
    (state) => state.chat
  );

  const { sidebarToggle } = useSelector(
    (state) => state.ui
  );

  const [accessToken, setAccessToken] = useState("");
  // closed is true, open is false
  const [accountToggle, setAccountToggle] = useState(false);
  const [mobileSidebarToggle, setMobileSidebarToggle] = useState(false);
  
  const [hoverCustomTool, setHoverCustomTool] = useState(false);
  const accountMenuRef = useRef(null);

  const { logout } = useAuth();

  const handleSidebarClick = () => {
    dispatch(setSidebarToggle(!sidebarToggle));
  };

  const handleAccountClick = () => setAccountToggle((v) => !v);

  const handleMobileMenuClick = () => {
    setMobileSidebarToggle((v) => !v);
  };

  const handleOverlayClick = () => {
    setMobileSidebarToggle((v) => !v);
  };

  useEffect(() => {
    dispatch(fetchThreadsPreview());
    dispatch(setSidebarToggle(localStorage.getItem("sidebarCollapsed") ?? true))
  }, []);

  useEffect(() => {
    if (currentThreadId) {
      dispatch(fetchThreadRuns({uuid: currentThreadId}))
    } else {
      dispatch(setCurrentChat({}));
      dispatch(setTimeline({}));
    }
  }, [currentThreadId])

  useEffect(() => {
    if (threadGraphType!==null) {
      dispatch(setMode(threadGraphType));
      dispatch(setThreadGraphType(null));
    }
  }, [threadGraphType])

  useEffect(() => {
    const onDocClick = (e) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(e.target)
      ) {
        setAccountToggle(false);
      }
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setAccountToggle(false);
    };

    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);
  
  useEffect(() => {
    const access = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");

    if (access && refresh) {
      const user = jwt_decode(access);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (isExpired) {
        refreshToken().then((newAccess) => {
          setAccessToken(newAccess);
        });
      } else {
        setAccessToken(access);
      }
    }
  }, []);

  const socketUrl = `${AGENT_WS_API}?token=${accessToken}`;

  const shouldReconnect = React.useCallback(() => true, []);
  const wsOptions = React.useMemo(
    () => ({ shouldReconnect, reconnectAttempts: 4 }),
    [shouldReconnect]
  );

  const connectNow = React.useMemo(() => Boolean(accessToken), [accessToken]);

  const { sendMessage, lastMessage } = useWebSocket(
    socketUrl,
    wsOptions,
    connectNow
  );

  const handleLogout = async () => {
      try {
          await logout();
      } catch (err) {
          console.error(err);
      }
  };

  return (
    <Box className="app-container">
      <Box
        component="aside"
        className={`sidebar ${sidebarToggle ? "" : "collapsed"} ${
          mobileSidebarToggle ? "mobile-open" : ""
        }`}
        id="sidebar"
        >
        <Box className="sidebar-header">
          <Box
            className="sidebar-brand"
            data-tooltip="Fat Cat Platform Dashboard"
            data-tooltip-pos="bottom"
            >
            <Box className="brand-logo">
              <Logo />
            </Box>
            <span>Fat Cat Platform</span>
          </Box>

          {/* Toggle Sidebar Button (kept as button element with class/id) */}
          <IconButton
            className="toggle-sidebar"
            id="toggleSidebar"
            aria-label="Toggle sidebar"
            data-tooltip="Toggle Sidebar"
            data-tooltip-pos="bottom"
            size="small"
            onClick={handleSidebarClick}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </IconButton>
        </Box>

        <Box component="nav" className="sidebar-content">
          <Box
            className="custom-tool-header"
            data-tooltip="Fat Cat Platform Custom Analytics Tools"
            data-tooltip-pos="right"
            onMouseOver={() => setHoverCustomTool(true)}
            onMouseOut={() => setHoverCustomTool(false)}
            sx={{
              p: "16px 12px 8px 12px",
              borderBottom: "1px solid var(--line)",
              mb: "16px",
              transition: "all 0.2s",
              cursor: "pointer",
              bgcolor: hoverCustomTool ? "var(--brand-weak)" : "transparent",
              borderBottomColor: hoverCustomTool
                ? "var(--brand)"
                : "var(--line)",
            }}
          >
            <Box className="menu-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                </svg>
                Chats
            </Box>
          </Box>

          <ChatHistory />
        </Box>
      </Box>

      {/* Overlay for mobile */}
      <Box
        className={`sidebar-overlay ${mobileSidebarToggle ? "active" : ""}`}
        id="sidebarOverlay"
        onClick={handleOverlayClick}
      />

      {/* Main Content */}
      <Box className="main-container">
        <Box component="header">
          <Box className="header-content">
            <Box className="header-left">
              <button
                className="btn btn-secondary mobile-menu-btn"
                id="mobileMenuBtn"
                data-tooltip="Open Menu"
                data-tooltip-pos="bottom"
                aria-label="Open Menu"
                onClick={handleMobileMenuClick}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </button>
              <h1 className="header-title">
                Texas Rangers — Agentic Reasoning
              </h1>
            </Box>

            <Box className="account-menu">
              <button
                className="account-button"
                id="accountBtn"
                aria-label="Account menu"
                data-tooltip="Account Settings"
                data-tooltip-pos="bottom"
                onClick={handleAccountClick}
                ref={accountMenuRef}
              >
                {`${(user?.firstName?.[0] || "").toUpperCase()}${(user?.lastName?.[0] || "").toUpperCase()}`}
              </button>
              <Box
                className={`account-dropdown${accountToggle ? " active" : ""}`}
              >
                <Box className="account-info">
                  <Box className="account-name">{user?.name}</Box>
                  <Box className="account-email">{user?.email}</Box>
                </Box>
                <Box className="account-dropdown-divider" />
                <Box
                  component="a"
                  className="account-dropdown-item"
                  href="#"
                  data-tooltip="Sign out of your account"
                  data-tooltip-pos="left"
                  onClick={() => {handleLogout()}}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sign Out
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Chat sendMessage={sendMessage} lastMessage={lastMessage} />
      </Box>
    </Box>
  );
}
