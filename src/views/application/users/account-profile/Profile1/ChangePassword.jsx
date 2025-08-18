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
  const { changePassword } = useAuth();
  const scriptedRef = useScriptRef();

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        oldPassword: Yup.string().max(255).required("Old password is required"),
        newPassword: Yup.string().max(255).required("New password is required"),
        confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], "Passwords must match")
        .required("Confirm new password is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await changePassword(values.oldPassword, values.newPassword);
          if (scriptedRef.current) {
            setStatus({ success: true });
            dispatch(
              openSnackbar({
                open: true,
                anchorOrigin: { vertical: "top", horizontal: "right" },
                message: "Password changed successfully!",
                variant: "alert",
                alert: {
                  color: "success",
                },
                close: false,
              })
            );
            setSubmitting(false);
          }
        } catch (err) {
          if (Object.values(err)?.[0]?.[0]) {setErrors({ submit: Object.values(err)?.[0]?.[0] });}
          if (scriptedRef.current) {
            setStatus({ success: false });
            setSubmitting(false);
          }
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
          <SubCard title="Change Password">
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.oldPassword && errors.oldPassword)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="old-password">Old Password</InputLabel>
                    <OutlinedInput
                      id="old-password"
                      value={values.oldPassword}
                      name="oldPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      label="Old Password"
                    />
                    {touched.oldPassword && errors.oldPassword && (
                      <FormHelperText error>
                        {errors.oldPassword}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.newPassword && errors.newPassword)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="new-password">New Password</InputLabel>
                    <OutlinedInput
                      id="new-password"
                      value={values.newPassword}
                      name="newPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      label="New Password"
                    />
                    {touched.lastName && errors.lastName && (
                      <FormHelperText error>{errors.lastName}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(
                      touched.confirmNewPassword && errors.confirmNewPassword
                    )}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="confirm-new-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="confirm-new-password"
                      value={values.confirmNewPassword}
                      name="confirmNewPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      label="Confirm Password"
                    />
                    {touched.confirmNewPassword && errors.confirmNewPassword && (
                      <FormHelperText error>{errors.confirmNewPassword}</FormHelperText>
                    )}                    
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
            </Grid>
          </SubCard>
        </form>
      )}
    </Formik>
  );
};

export default MyAccount;
