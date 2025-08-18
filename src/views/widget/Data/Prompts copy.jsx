import React from "react";
import { Grid, Typography, Box } from "@mui/material";

function UserActivity({ data }) {
    const rowHeight = 73;

    const rowStyle = {
        display: "flex",
        alignItems: "center",
        borderBottom: '1px solid #eeeeee',
        minHeight: `${rowHeight}px`
    };
    
    const tableStyle = {
      height: `calc(4*${rowHeight}px)`,
      overflowY: "auto",
      display: "block",
      width: "100%",
    };
    
    const typoStyle = {
      padding: "0 10px",
    }

    return (
        <Box sx={tableStyle}>
            {data.map((prompt, index) => (
                <Grid container key={index} alignItems="center">
                    <Grid item xs style={rowStyle}>
                        <Typography variant="subtitle1" noWrap sx={typoStyle}>
                            {prompt}
                        </Typography>
                    </Grid>
                </Grid>
            ))}
        </Box>
    );
}

export default UserActivity;
