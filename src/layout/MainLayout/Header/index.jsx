// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, useMediaQuery } from "@mui/material";

// project imports
import LAYOUT_CONST from "constant";
import useConfig from "hooks/useConfig";
import LogoSection from "../LogoSection";
import MobileSection from "./MobileSection";
import ProfileSection from "./ProfileSection";
import FullScreenSection from "./FullScreenSection";

import { useDispatch, useSelector } from "store";
import { openDrawer } from "store/slices/menu";

// assets
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { IconArrowsMaximize, IconArrowsMinimize } from "@tabler/icons-react";
import Logo from "ui-component/Logo";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);

  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const { layout } = useConfig();
  const [state, setState] = useState("");

  const [currentPathName, setCurrentPathName] = useState("");

  useEffect(() => {
    let pathname = location.pathname;
    if (pathname[pathname.length - 1] === "/") {
      pathname = pathname.slice(0, -1);
    }
    if (pathname[0] === "/") {
      pathname = pathname.slice(1);
    }
    setCurrentPathName(pathname);
    if (pathname.toLowerCase() === "chat") {
      setState("Chat");
    } else if (pathname.toLowerCase() === "/account-profile") {
      setState("Account");
    } else {
      setState(null);
    }
  }, [location]);
  
  // if (currentPathName.startsWith("report/")) {
  //   return (
  //       <Logo height={35} />
  //   );
  // }

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        {layout === LAYOUT_CONST.VERTICAL_LAYOUT ||
        (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd) ? (
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              border: "1px solid",
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.dark.main
                  : theme.palette.primary.light,
              background:
                theme.palette.mode === "dark"
                  ? theme.palette.dark.main
                  : theme.palette.primary.light,
              color: theme.palette.primary.dark,
              transition: "all .2s ease-in-out",
              '&[aria-controls="menu-list-grow"],&:hover': {
                borderColor: theme.palette.primary.main,
                background: theme.palette.primary.main,
                color: theme.palette.primary.light,
              },
              display: "none",
            }}
            title={drawerOpen ? "Collapse side drawer" : "Expand side drawer"}
            aria-controls={drawerOpen ? "menu-list-grow" : undefined}
            onClick={() => dispatch(openDrawer(!drawerOpen))}
            aria-haspopup="true"
            color="inherit"
          >
            {!drawerOpen ? <IconArrowsMaximize /> : <IconArrowsMinimize />}
          </Avatar>
        ) : null}
      </Box>

      {/* header search */}
      <Box sx={{ flexGrow: 1 }} />

      <Box
        component="span"
        sx={{
          position: { xs: "static", md: "absolute" },
          left: { xs: 0, md: "50%" },
          transform: { xs: 0, md: "translateX(-50%)" },
          display: { xs: "none", md: "block" },
          flexGrow: 1,
        }}
      >
        <LogoSection />
      </Box>
      <Box sx={{ flexGrow: 1 }} />

      {/* full sceen toggler */}
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <FullScreenSection />
      </Box>

      {/* profile */}
      <ProfileSection state={state} />

      {/* mobile header */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <MobileSection />
      </Box>
    </>
  );
};

export default Header;
