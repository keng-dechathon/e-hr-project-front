import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../common/Typography/Typography";
import CardTimeSheetRecord from "./CardTimeSheetRecord";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: "40px",
  },
  padding: {
    padding: "24px",
  },
  box: {
    padding: "40px 40px 0 40px ",
    [theme.breakpoints.down("xs")]: {
      padding: "20px 20px  0 20px ",
    },
  },
  headerTitle: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "30px ",
    },
  },
}));

const ContentTimeSheetRecord = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography
        variant="h3"
        color="pink"
        fontWeight="medium"
        className={classes.headerTitle}
      >
        Time Sheet Record
      </Typography>
      <Box sx={{ width: "100%", typography: "body1", marginTop: "15px" }}>
        <Divider />
        <CardTimeSheetRecord />
      </Box>
    </Box>
  );
};

export default ContentTimeSheetRecord;
