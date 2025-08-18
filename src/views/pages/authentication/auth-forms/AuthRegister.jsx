import React, { useEffect } from "react";
import { useDispatch } from "store";
import { Link, useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project imports
import AnimateButton from "ui-component/extended/AnimateButton";
import useAuth from "hooks/useAuth";
import {
  strengthColor,
  strengthIndicatorNumFunc,
} from "utils/password-strength";
import { openSnackbar } from "store/slices/snackbar";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// ===========================|| FIREBASE - REGISTER ||=========================== //

const JWTRegister = ({ data, ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const [strength, setStrength] = React.useState(0);
  const [level, setLevel] = React.useState();
  const { register } = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicatorNumFunc(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  return (
    <>
      <Formik
        initialValues={{
          email: data.email,
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          submit: null,
          tandc: false,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required")
            .test("is-same-email", "Email cannot be changed", function (value) {
              return value === data.email;
            }),
          password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .max(255)
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),
          tandc: Yup.boolean().oneOf(
            [true],
            "You must accept the terms and conditions"
          ),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await register(
              data.email,
              values.password,
              values.firstName,
              values.lastName,
              data.token,
            );
            setStatus({ success: true });
            setSubmitting(false);
            dispatch(
              openSnackbar({
                open: true,
                anchorOrigin: { vertical: "top", horizontal: "right" },
                message: "Your registration has been successfully completed.",
                variant: "alert",
                alert: {
                  color: "success",
                },
                close: false,
              })
            );

            setTimeout(() => {
              navigate("/check-mail/", { replace: true });
            }, 1500);
          } catch (err) {
            if (Object.values(err)?.[0]?.[0]) {
              setErrors({ submit: Object.values(err)?.[0] });
            }
            setStatus({ success: false });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) =>
            <form noValidate autoComplete="off" onSubmit={handleSubmit} {...others}>
              <Grid container spacing={matchDownSM ? 0 : 2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    autoComplete="off"
                    margin="normal"
                    name="firstName"
                    type="text"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ ...theme.typography.customInput }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    autoComplete="off"
                    margin="normal"
                    name="lastName"
                    type="text"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ ...theme.typography.customInput }}
                  />
                </Grid>
              </Grid>
              <FormControl
                fullWidth
                error={Boolean(touched.email && errors.email)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-email-register">
                  Email Address / Username
                </InputLabel>
                <OutlinedInput
                  disabled
                  autoComplete="off"
                  id="outlined-adornment-email-register"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.email && errors.email && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.password && errors.password)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-password-register">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-register"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  inputProps={{ autoComplete: "new-password" }}                  
                  value={values.password}
                  name="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {touched.password && errors.password && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-password-register"
                  >
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-confirm-password-register">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-confirm-password-register"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  inputProps={{ autoComplete: "new-password" }}                  
                  value={values.confirmPassword}
                  name="confirmPassword"
                  label="Confirm Password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-password-register"
                  >
                    {errors.confirmPassword}
                  </FormHelperText>
                )}
              </FormControl>

              {strength !== 0 && (
                <FormControl fullWidth>
                  <Box sx={{ mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Box
                          style={{ backgroundColor: level?.color }}
                          sx={{ width: 85, height: 8, borderRadius: "7px" }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" fontSize="0.75rem">
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </FormControl>
              )}

              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="tandc"
                        checked={values.tandc}
                        onChange={handleChange}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="subtitle1">
                        Agree with &nbsp;
                        <Typography
                          variant="subtitle1"
                          component={Link}
                          to="/toc"
                          target="_blank"
                        >
                          Terms & Condition.
                        </Typography>
                      </Typography>
                    }
                  />
                  {touched.tandc && errors.tandc && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password-register"
                    >
                      {errors.tandc}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}

              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    Sign up
                  </Button>
                </AnimateButton>
              </Box>
            </form>
        }
      </Formik>
    </>
  );
};

export default JWTRegister;
