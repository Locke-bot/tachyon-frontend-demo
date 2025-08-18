import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Badge,
  Button,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";

// assets
import WatchLaterTwoToneIcon from "@mui/icons-material/WatchLaterTwoTone";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import Avatar1 from "assets/images/users/avatar-1.png";
import Avatar2 from "assets/images/users/avatar-2.png";
import Avatar3 from "assets/images/users/avatar-3.png";

// ===========================|| DATA WIDGET - USER ACTIVITY CARD ||=========================== //

function timeAgo(dateString) {
  if (dateString === 'None') {return ''}
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

const UserActivity = ({ title, data }) => {
  const theme = useTheme();
  const rowHeight = 64;

  const iconSX = {
    fontSize: "0.875rem",
    marginRight: 0.2,
    verticalAlign: "sub",
  };

  const cardContentStyle = {
    height: `calc(24px + 4*${rowHeight}px)`,
    overflowY: "auto",
  };

  return (
    <MainCard title={title} content={false}>
      <CardContent sx={cardContentStyle}>
        <Grid container spacing={gridSpacing} alignItems="center">
          {Object.keys(data).map((name) => {
            return (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Box sx={{ position: "relative" }}>
                      <Badge
                        overlap="circular"
                        badgeContent={
                          <FiberManualRecordIcon
                            sx={{
                              color: theme.palette.success.main,
                              fontSize: "0.875rem",
                            }}
                          />
                        }
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                      >
                        <Avatar alt="image" src={Avatar1} />
                      </Badge>
                    </Box>
                  </Grid>
                  <Grid item xs zeroMinWidth sx={{display: "flex", alignItems: "center"}}>
                    <Typography
                      align="left"
                      component="div"
                      variant="subtitle1"
                    >
                      {name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="left" variant="caption">
                      <WatchLaterTwoToneIcon sx={iconSX} />
                      {timeAgo(data[name][1])}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button variant="text" size="small">
          View all Projects
        </Button>
      </CardActions>
    </MainCard>
  );
};

UserActivity.propTypes = {
  title: PropTypes.string,
};

export default UserActivity;
