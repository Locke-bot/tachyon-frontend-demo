import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Tab, Tabs } from "@mui/material";

// project imports
import MyAccount from "./MyAccount";
import ChangePassword from "./ChangePassword";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";

// assets
import LibraryBooksTwoToneIcon from "@mui/icons-material/LibraryBooksTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import { setDisabled } from "store/slices/menu";
import { useDispatch } from "react-redux";
import CustomerSupport from "./CustomerSupport";
import useAuth from "hooks/useAuth";

// tabs panel
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// tabs option
const initialTabsOption = [
  {
    label: "My Account",
    icon: <LibraryBooksTwoToneIcon sx={{ fontSize: "1.3rem" }} />,
  },
  {
    label: "Change Password",
    icon: <LockTwoToneIcon sx={{ fontSize: "1.3rem" }} />,
  },
  {
    label: "Support Form",
    icon: <SupportAgentIcon sx={{ fontSize: "1.3rem" }} />,
  },
];

// ==============================|| PROFILE 1 ||============================== //

const Profile1 = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { user } = useAuth();

  const [tabsOption, setTabsOption] = useState(initialTabsOption);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(setDisabled(true));
  }, []);

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="scrollable"
            sx={{
              mb: 3,
              "& a": {
                minHeight: "auto",
                minWidth: 10,
                py: 1.5,
                px: 1,
                mr: 2.25,
                color: theme.palette.mode === "dark" ? "grey.600" : "grey.900",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              },
              "& a.Mui-selected": {
                color: theme.palette.primary.main,
              },
              "& .MuiTabs-indicator": {
                bottom: 2,
              },
              "& a > svg": {
                marginBottom: "0px !important",
                mr: 1.25,
              },
            }}
          >
            {tabsOption.map((tab, index) => (
              <Tab
                key={index}
                component={Link}
                to="#"
                icon={tab.icon}
                label={tab.label}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
          <TabPanel value={value} index={0}>
            <MyAccount />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ChangePassword />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CustomerSupport />
          </TabPanel>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Profile1;
