import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../common/Typography/Typography";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CardWorkTimeReport from "./TabWorkTimeReport/CardWorkTimeReport";
import CardLeaveReport from "./TabLeave/CardLeaveReport";
import CardLeaveSummarize from "./TabLeave/CardLeaveSummarize";
import CardRestOfLeave from "./TabLeave/CardRestOfLeave";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
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
    // marginRight: "10px !important",
    padding: "0 !important",
    // minWidth: "100px !important",
    textTransform: "none !important",
    fontWeight: "bold !important",
    fontSize: "18px !important",
    padding: "0px 10px",
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

const ContentReport = () => {
  const classes = useStyles();
  const theme = useTheme();

  const breakPoint = useMediaQuery(theme.breakpoints.down(700));

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.box}>
      <Typography
        variant="h3"
        color="pink"
        fontWeight="medium"
        className={classes.headerTitle}
      >
        Report
      </Typography>
      <Box sx={{ width: "100%", typography: "body1", marginTop: "10px" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              className={classes.tablist}
              variant="scrollable"
              scrollButtons={breakPoint}
              allowScrollButtonsMobile={breakPoint}
            >
              <Tab label="Work-time" value="1" className={classes.tabitem} />
              <Tab
                label="Leave request"
                value="2"
                className={classes.tabitem}
              />
              <Tab
                label="Leave summarize"
                value="3"
                className={classes.tabitem}
              />
              <Tab
                label="The rest of leave"
                value="4"
                className={classes.tabitem}
              />
            </TabList>
          </Box>
          <TabPanel value="1" className={classes.tabpanel}>
            <CardWorkTimeReport />
          </TabPanel>
          <TabPanel value="2" className={classes.tabpanel}>
            <CardLeaveReport />
          </TabPanel>
          <TabPanel value="3" className={classes.tabpanel}>
            <CardLeaveSummarize />
          </TabPanel>
          <TabPanel value="4" className={classes.tabpanel}>
            <CardRestOfLeave />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ContentReport;
