import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  useMediaQuery,
} from "@mui/material";

// project imports
import Header from "./Header";
import Sidebar from "./Sidebar";

import LAYOUT_CONST from "constant";
import useConfig from "hooks/useConfig";
import { drawerWidth } from "store/constant";
import { openDrawer } from "store/slices/menu";
import { useDispatch, useSelector } from "store";

// styles
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open, layout }) => ({
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    ...(!open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter + 200,
      }),
      [theme.breakpoints.up("md")]: {
        marginLeft: "20px",
        width: `calc(100%)`,
        marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 88,
      },
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter + 200,
      }),
      marginLeft: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? "20px" : 0,
      marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 88,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.up("md")]: {
        marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 88,
      },
    }),
    [theme.breakpoints.down("md")]: {
      marginLeft: "20px",
      padding: "16px",
      marginTop: 88,
      ...(!open && {
        width: `calc(100% - ${drawerWidth}px)`,
      }),
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
      marginRight: "10px",
      padding: "16px",
      marginTop: 88,
      ...(!open && {
        width: `calc(100% - ${drawerWidth}px)`,
      }),
    },
  })
);

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const location = useLocation();

  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);
  const { drawerType, container, layout } = useConfig();

  const [currentPathName, setCurrentPathName] = useState("");

  // useEffect(() => {
  //   let pathname = location.pathname;
  //   if (pathname[pathname.length - 1] === "/") {
  //     pathname = pathname.slice(0, -1);
  //   }
  //   if (pathname[0] === "/") {
  //     pathname = pathname.slice(1);
  //   }
  //   setCurrentPathName(pathname);
  // }, [location]);

  useEffect(() => {
    if (drawerType === LAYOUT_CONST.DEFAULT_DRAWER) {
      dispatch(openDrawer(true));
    } else {
      dispatch(openDrawer(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerType]);

  useEffect(() => {
    if (drawerType === LAYOUT_CONST.DEFAULT_DRAWER) {
      dispatch(openDrawer(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (matchDownMd) {
      dispatch(openDrawer(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  const condition = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd;

  const header = useMemo(
    () => (
      <Toolbar sx={{ p: condition ? "10px" : "16px" }}>
        <Header />
      </Toolbar>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [layout, matchDownMd]
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* drawer */}
      {(layout === LAYOUT_CONST.VERTICAL_LAYOUT || matchDownMd) && <Sidebar />}
      {/* {(layout === LAYOUT_CONST.VERTICAL_LAYOUT || matchDownMd)} */}

      {/* main content */}
      <Main
        theme={theme}
        open={drawerOpen}
        layout={layout}
        sx={{ px: 1 }}
        style={{ paddingTop: 0, paddingBottom: 0 }}
        id="main-parent"
      >
        <Container
          maxWidth={container ? "lg" : false}
          {...(!container && { sx: { px: { xs: 0 } } })}
          id="main-parent-container"
        >
          <Outlet />
        </Container>
      </Main>
    </Box>
  );
};

export default MainLayout;
