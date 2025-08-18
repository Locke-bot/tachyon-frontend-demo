import React, { useState } from "react";
import { useDispatch } from "react-redux";

// material-ui
import {
  Avatar,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import WatchLaterTwoToneIcon from "@mui/icons-material/WatchLaterTwoTone";
import { fetchUserPrompts } from "store/slices/adminSlice";

function timeAgo(dateString) {
  if (dateString === "None") {
    return "";
  }
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

function UserActivity({ data }) {
    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] = useState(-1)

    const rowHeight = 73;
  
    const iconSX = {
      fontSize: "0.875rem",
      marginRight: 0.2,
      verticalAlign: "sub",
    };
    
    const tableStyle = {
      height: `calc(4*${rowHeight}px)`,
      overflowY: "auto",
      display: "block",
    };
    
    const rowStyle = {
      cursor: "pointer",
    };
    const handleRowClick = (uuid, index) => {
        setSelectedIndex(index)
        dispatch(fetchUserPrompts({uuid}))
    };
    return (
        <TableContainer sx={tableStyle}>
        <Table>
            <TableBody>
            {Object.keys(data).map((name, index) => (
                <TableRow
                hover
                key={index}
                sx={{...rowStyle, ...(index===selectedIndex && { backgroundColor: '#2196f33b !important' })}}
                onClick={() => handleRowClick(data[name][0], index)}
                >
                <TableCell sx={{ pl: 3 }}>
                    <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    sx={{ flexWrap: "nowrap" }}
                    >
                    <Grid item>
                        <Avatar>{name[0]}</Avatar>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Typography
                        component="div"
                        align="left"
                        variant="subtitle1"
                        >
                        {name}
                        </Typography>
                    </Grid>
                    </Grid>
                </TableCell>
                <TableCell>
                    <Grid item>
                    <Typography align="left" variant="caption">
                        <WatchLaterTwoToneIcon sx={iconSX} />
                        {timeAgo(data[name][1])}
                    </Typography>
                    </Grid>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

// const UserActivity = ({ data }) => (
// );

export default UserActivity;
