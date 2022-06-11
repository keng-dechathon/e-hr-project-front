import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../common/Typography/Typography";
import Box from "@mui/material/Box";
import CardEmpInformation from "./CardEmpInformation";
import { isPath } from "../../../utils/miscellaneous";
import { empInfoPath, empMgnt } from "./path";
import { Divider } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CardCompanyManagement from "../../company/components/CardCompanyManagement";
import CardPositionManagement from "../../position/components/CardPositionManagement";
const useStyles = makeStyles((theme) => ({
  Topic: {
    marginBottom: "10px",
  },
  box: {
    padding: "40px 40px 0 40px ",
    [theme.breakpoints.down("xs")]: {
      padding: "20px 20px  0 20px ",
    },
  },
  tabitem: {
    marginRight: "10px !important",
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
  tabpanel: {
    padding: " 10px 0 0 0 !important",
  },
  headerTitle: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "30px ",
    },
  },
}));

const ContentEmpInformation = () => {
  const classes = useStyles();
  const theme = useTheme();

  const breakPoint = useMediaQuery(theme.breakpoints.down(400));

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
        {isPath(empInfoPath) && "Employee Information"}
        {isPath(empMgnt) && "Employee Management"}
      </Typography>

      {isPath(empInfoPath) ? (
        <Box sx={{ width: "100%", typography: "body1", marginTop: "15px" }}>
          <Divider style={{ marginBottom: "10px" }} />
          <CardEmpInformation />
        </Box>
      ) : (
        ""
      )}

      {isPath(empMgnt) ? (
        <Box
          sx={{ width: "100%", typography: "body1", marginTop: "10px" }}
          className={classes.box2}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                className={classes.tablist}
                variant="scrollable"
                scrollButtons={breakPoint}
                allowScrollButtonsMobile={breakPoint}
              >
                <Tab label="Employee" value="1" className={classes.tabitem} />
                <Tab label="Company" value="2" className={classes.tabitem} />
                <Tab label="Position" value="3" className={classes.tabitem} />
              </TabList>
            </Box>
            <TabPanel value="1" className={classes.tabpanel}>
              <CardEmpInformation />
            </TabPanel>
            <TabPanel value="2" className={classes.tabpanel}>
              <CardCompanyManagement/>
            </TabPanel>
            <TabPanel value="3" className={classes.tabpanel}>
              <CardPositionManagement/>
            </TabPanel>
          </TabContext>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default ContentEmpInformation;
