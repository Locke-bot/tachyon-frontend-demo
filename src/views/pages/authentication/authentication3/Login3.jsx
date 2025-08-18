import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

// project imports
import AuthWrapper1 from "../AuthWrapper1";
import AuthCardWrapper from "../AuthCardWrapper";
import AuthLogin from "../auth-forms/AuthLogin";
import Logo from "ui-component/Logo";
import AuthFooter from "ui-component/cards/AuthFooter";
import useAuth from "hooks/useAuth";

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AuthWrapper1>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid
                    item
                    sx={{ mb: 0 }}
                    // spacing={3}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <a
                      href="https://www.avrij.com/"
                      target="_blank"
                      aria-label="theme-logo"
                    >
                      <Logo height={46} />
                    </a>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={3}
                          textAlign="center"
                        >
                          {/* <Box
                            style={{
                              display: "flex",
                              justifyContent: "right",
                              width: "100%",
                            }}
                          >
                            <img src={powered} alt="powered" width={131} />
                          </Box> */}
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            textAlign={matchDownSM ? "center" : "inherit"}
                          >
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
