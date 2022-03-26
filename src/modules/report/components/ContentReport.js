import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../common/Typography/Typography";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CardWorkTimeReport from "./TabWorkTimeReport/CardWorkTimeReport";
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
  margintop: {
    marginTop: "10px",
  },
  tabitem: {
    marginRight: "30px !important",
    padding: "0 !important",
    minWidth: "100px !important",
    textTransform: "none !important",
    fontWeight: "bold !important",
    fontSize: "18px !important",
    padding:"0px 10px",
    "&:hover": {
      color: "#C91F92 !important",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#C91F92 !important",
    },
  },
  tablist: {
    "& .MuiTabs-indicator": {
      backgroundColor: "#C91F92 !important",
    },
  },
  padding: {
    padding: "24px",
  },
  tabpanel: {
    padding: " 16px 0 0 0 !important",
  },
}));

const ContentReport = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.box}>
      <Typography variant="h3" color="pink" fontWeight="medium">
        Report
      </Typography>
      <Box sx={{ width: "100%", typography: "body1", marginTop: "10px" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} className={classes.tablist}>
              <Tab label="Work Time" value="1" className={classes.tabitem} />
              <Tab label="Leave" value="2" className={classes.tabitem} />
            </TabList>
          </Box>
          <TabPanel value="1" className={classes.tabpanel}>
            <CardWorkTimeReport/>
          </TabPanel>
          <TabPanel value="2" className={classes.tabpanel}></TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ContentReport;
