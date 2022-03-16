import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../common/Typography/Typography";
import Box from "@mui/material/Box";
import CardTimeSheetViewer from "./CardTimeSheetViewer";
import { Divider } from "@mui/material";
const useStyles = makeStyles(() => ({
  margintop: {
    marginTop: "40px",
  },
  padding: {
    padding: "24px",
  },
  box: {
    padding: "40px ",
  },
}));

const ContentTimeSheetViewer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography variant="h3" color="pink" fontWeight="medium">
        Time Sheet Viewer
      </Typography>
      <Box sx={{ width: "100%", typography: "body1", marginTop: "15px" }}>
        <Divider/>
        <CardTimeSheetViewer/>
      </Box>
    </Box>
  );
};

export default ContentTimeSheetViewer;
