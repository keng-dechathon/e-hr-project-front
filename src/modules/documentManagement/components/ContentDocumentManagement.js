import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../common/Typography/Typography";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CardDocumentManagement from "./TabDocumentRequest/CardDocumentManagement";
import { Divider } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CardDocumentType from "./TabDocumentType/CardDocumentType";
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
    marginRight: "30px !important",
    padding: "0 !important",
    minWidth: "150px !important",
    textTransform: "none !important",
    fontWeight: "bold !important",
    fontSize: "18px !important",
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

const ContentDocumentManagement = () => {
  const classes = useStyles();
  const theme = useTheme();

  const breakPoint = useMediaQuery(theme.breakpoints.down(500));

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
        Document Management
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
              <Tab
                label="Document Request"
                value="1"
                className={classes.tabitem}
              />
              <Tab
                label="Document Type"
                value="2"
                className={classes.tabitem}
              />
            </TabList>
          </Box>
          <TabPanel value="1" className={classes.tabpanel}>
            <CardDocumentManagement />
          </TabPanel>
          <TabPanel value="2" className={classes.tabpanel}>
            <CardDocumentType />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ContentDocumentManagement;
