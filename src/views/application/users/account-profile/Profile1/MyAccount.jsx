import React, { useEffect } from "react";
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
  Typography,
  TextField,
} from "@mui/material";

// project imports
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import { gridSpacing } from "store/constant";

import useAuth from "hooks/useAuth";

import * as Yup from "yup";
import { Formik } from "formik";

import useScriptRef from "hooks/useScriptRef";
import { openSnackbar } from "store/slices/snackbar";
import { useDispatch } from "react-redux";

const deviceStateSX = {
  display: "inline-flex",
  alignItems: "center",
  "& >svg": {
    width: 12,
    height: 12,
    mr: 0.5,
  },
};

// ==============================|| PROFILE 1 - MY ACCOUNT ||============================== //

const MyAccount = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { updateProfile, user } = useAuth();

  return (
    <Formik
      initialValues={{
        email: user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        lastName: Yup.string().max(255).required("Last name is required"),
        firstName: Yup.string().max(255).required("First name is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await updateProfile(values.firstName, values.lastName);
          setStatus({ success: true });
          dispatch(
            openSnackbar({
              open: true,
              anchorOrigin: { vertical: "top", horizontal: "right" },
              message: "Profile Updated!",
              variant: "alert",
              alert: {
                color: "success",
              },
              close: false,
            })
          );
          setSubmitting(false);
        } catch (err) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        status,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <SubCard title="General Settings">
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.firstName && errors.firstName)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-fname">First Name</InputLabel>
                    <OutlinedInput
                      id="outlined-fname"
                      value={values.firstName}
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      label="First Name"
                    />
                    {touched.firstName && errors.firstName && (
                      <FormHelperText error>{errors.firstName}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.lastName && errors.lastName)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-lname">Last Name</InputLabel>
                    <OutlinedInput
                      id="outlined-lname"
                      value={values.lastName}
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      label="Last Name"
                    />
                    {touched.lastName && errors.lastName && (
                      <FormHelperText error>{errors.lastName}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.lastName && errors.lastName)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-email">Email</InputLabel>
                    <OutlinedInput
                      disabled
                      id="outlined-email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      label="Email"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
              <Grid spacing={2} container justifyContent="flex-end">
                <Grid item>
                  <AnimateButton>
                    <Button
                      variant="contained"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Update Profile
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default MyAccount;
