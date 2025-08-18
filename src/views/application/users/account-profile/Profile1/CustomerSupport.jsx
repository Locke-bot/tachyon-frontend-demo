import React, { useEffect, useState } from "react";
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
  NativeSelect,
} from "@mui/material";

// project imports
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import { gridSpacing } from "store/constant";

import * as Yup from "yup";
import { Formik } from "formik";

import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { formatISO, parseISO } from 'date-fns';

import authAxios from 'utils/axios';
import { openSnackbar } from "store/slices/snackbar";

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

const useStyles = makeStyles((theme) => ({
  textarea: {
    "& textarea": {
      paddingTop: "30.5px",
    },
  },
}));

const CustomerSupport = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const classes = useStyles();
  //   const { updateProfile, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState("")

  const handleDateChange = (newValue) => {
    if (!newValue) {
        setSelectedDate(null)
    } else {
        const isoFormattedDate = formatISO(newValue);
        setSelectedDate(isoFormattedDate);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        firstName: "",
        lastName: "",
        description: "",
        date: null,
        priority: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        lastName: Yup.string().max(255).required("Last name is required"),
        firstName: Yup.string().max(255).required("First name is required"),
        description: Yup.string().max(255).required("Description is required"),
        priority: Yup.string().max(255).required("Priority is required"),
        date: Yup.date().required("Date is required"),
      })}
      onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting, }) => {
        authAxios.post('api/support/ticket/', {...values, date: formatISO(values['date'])}).then((response) => {
            setStatus({ success: true });
            dispatch(
                openSnackbar({
                    open: true,
                    anchorOrigin: { vertical: "top", horizontal: "right" },
                    message: "Support Ticket sent successfully.",
                    variant: "alert",
                    alert: {
                    color: "success",
                    },
                    close: false,
                })
            );
            resetForm();
        }).catch((err) => {
          console.log(err)
          setStatus({ success: false });
          setErrors({ submit: err.message });
        }).finally(() => {
            setSubmitting(false);
        })
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
        setFieldValue
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <SubCard title="Support Form">
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
                    error={Boolean(touched.email && errors.email)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-email">Email</InputLabel>
                    <OutlinedInput
                      id="outlined-email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      label="Email"
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error>{errors.email}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.description && errors.description)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-description">
                      Description
                    </InputLabel>
                    <OutlinedInput
                      className={classes.textarea}
                      multiline
                      minRows={10}
                      maxRows={10}
                      id="outlined-description"
                      value={values.description}
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      label="Description"
                    />
                    {touched.description && errors.description && (
                      <FormHelperText error>{errors.description}</FormHelperText>
                    )}                    
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.date && errors.date)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <Typography htmlFor="outlined-date" color={"#697586"}>
                      Date
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      {/* <DatePicker onChange={handleDateChange}/> */}
                      <DatePicker value={values.date} onChange={(newValue) => {
                          if (!newValue) {
                              setFieldValue('date', null)
                            } else {
                            setFieldValue('date', newValue)
                        }
                      }}/>
                    </LocalizationProvider>
                    {touched.date && errors.date && (
                      <FormHelperText error>{errors.date}</FormHelperText>
                    )}                    
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.priority && errors.priority)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <Typography htmlFor="outlined-date" color={"#697586"} visibility={"hidden"}>
                      Priority
                    </Typography>
                    <TextField
                      id="outlined-priority"
                      value={values.priority}
                      name="priority"
                      select
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      label="Priority"
                      SelectProps={{
                        native: true,
                      }}                      
                    >
                        {['', 'Low', 'Medium', 'High'].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}                        
                    </TextField>
                    {touched.priority && errors.priority && (
                      <FormHelperText error>{errors.priority}</FormHelperText>
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
                      Submit
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

export default CustomerSupport;
