import React, { useState } from "react";
import { Grid, Typography, Box } from "@mui/material";

function UserActivity({ data }) {
    const rowHeight = 73;
    const [expandedRow, setExpandedRow] = useState(null);

    const toggleRow = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    const getRowStyle = (index) => ({
        display: "flex",
        alignItems: "center",
        borderBottom: '1px solid #eeeeee',
        minHeight: `${rowHeight}px`,
        cursor: 'pointer',
        whiteSpace: expandedRow === index ? 'normal' : 'nowrap',
        overflow: expandedRow === index ? 'visible' : 'hidden',
        textOverflow: expandedRow === index ? 'clip' : 'ellipsis',
    });
    
    const tableStyle = {
        height: `calc(4*${rowHeight}px)`,
        overflowY: "auto",
        display: "block",
        width: "100%",
    };
    
    const typoStyle = {
        padding: "0 10px",
        textOverflow: "ellipsis",
        overflow: "hidden",
    };

    return (
        <Box sx={tableStyle}>
            {data.map((prompt, index) => (
                <Grid container key={index} alignItems="center" onClick={() => toggleRow(index)}>
                    <Grid item xs style={getRowStyle(index)}>
                        <Typography variant="subtitle1" sx={typoStyle}>
                            {prompt}
                        </Typography>
                    </Grid>
                </Grid>
            ))}
        </Box>
    );
}

export default UserActivity;
