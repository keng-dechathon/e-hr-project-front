import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "../../common/Typography/Typography";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CardExpenseManagement from "./CardExpenseManagement";
import { Divider } from "@mui/material";
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
    padding: " 16px 0 !important",
  },
  headerTitle: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "30px ",
    },
  },
}));

const ContentExpenseManagement = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography
        variant="h3"
        color="pink"
        fontWeight="medium"
        className={classes.headerTitle}
      >
        Expense Management
      </Typography>
      <Box sx={{ width: "100%", typography: "body1", marginTop: "15px" }}>
        <Divider style={{ marginBottom: "10px" }} />
        <CardExpenseManagement />
      </Box>
    </Box>
  );
};

export default ContentExpenseManagement;
