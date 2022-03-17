import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@mui/material/Drawer";
import { getEmployeeInformtionByID } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { navHeight } from "../../layout/components/Attribute";
import Typography from "../../common/Typography/Typography";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@material-ui/lab/Skeleton";
import CardContactInfo from "./CardContactInfo";
import CardPersonalInfo from "./CardPersonalInfo";
import CardWorkInfo from "./CardWorkInfo";
import CardChangeEmail from "./CardChangeEmail";
import { isPath } from "../../../utils/miscellaneous";
import { empMgnt } from "./path";
import CardLeaveInfomation from "./CardLeaveInformation";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const useStyles = makeStyles((theme) => ({
  ButtonAdd: {
    display: "flex",
  },
  box: {
    marginTop: "20px",
  },
  cardcontant: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  datagrid: {
    "& .MuiDataGrid-cell": {
      borderRight: "0px !important",
    },
    "& .MuiDataGrid-columnHeader": {
      borderRight: "0px !important",
    },
  },
  drawer: {
    marginTop: navHeight,
  },
  Topic: {
    marginBottom: "10px",
  },
  tabitem: {
    marginRight: "20px !important",
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
    padding: " 8px 20px  !important",
  },
  headername: {
    margin: "0 25px",
    display: "flex",

    justifyContent: "center !important",
    flexDirection: "column  !important",
  },
  closeButton: {
    display: "flex",
    top: "10px",
    right: "10px !important",
    position: "fixed",
    marginRight:"15px",
  },
}));

const DrawerEmpInformation = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { open, setOpen, ID } = props;
  const { empInformationByID } = useSelector((state) => state.employeeReducer);
  const [value, setValue] = React.useState("1");

  useEffect(() => {
    if (open === true && ID) dispatch(getEmployeeInformtionByID("", "", ID));
  }, [open, ID]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const dispatchEmp = () => {
    dispatch(getEmployeeInformtionByID("", "", ID));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          width: "100%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "100%",
            boxSizing: "border-box",
          },
          zIndex: 1253,
        }}
      >
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Box sx={{ padding: "20px", bgcolor: "#F7F0F3", display: "flex" }}>
            <Avatar
              src={
                empInformationByID.length !== 0 ? empInformationByID.Img : ""
              }
              sx={{ width: 100, height: 100 }}
            />
            <div className={classes.headername}>
              <Typography variant="h6" fontWeight="bold">
                {empInformationByID.length !== 0 ? (
                  empInformationByID.Firstname +
                  " " +
                  empInformationByID.Lastname
                ) : (
                  <Skeleton width={"100%"} height={40} animation="wave" />
                )}
              </Typography>
              <Typography variant="subtitle1" color="mute" fontWeight="meduim">
                {empInformationByID.length !== 0 ? (
                  empInformationByID.Company +
                  " • " +
                  empInformationByID.Position
                ) : (
                  <Skeleton width={"100%"} height={40} animation="wave" />
                )}
              </Typography>
            </div>
            <div className={classes.closeButton}>
              <IconButton color="primary" size="large" onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </div>
          </Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              {isPath(empMgnt) ? (
                <TabList onChange={handleChange} className={classes.tablist}>
                  <Tab label="Profile" value="1" className={classes.tabitem} />
                  <Tab
                    label="Leave Information"
                    value="2"
                    className={classes.tabitem}
                  />
                  <Tab
                    label="Authentication"
                    value="3"
                    className={classes.tabitem}
                  />
                </TabList>
              ) : (
                <TabList onChange={handleChange} className={classes.tablist}>
                  <Tab label="Profile" value="1" className={classes.tabitem} />
                </TabList>
              )}
            </Box>
            <TabPanel value="1" className={classes.tabpanel}>
              <CardPersonalInfo id={ID} />
              <CardContactInfo id={ID} />
              <CardWorkInfo id={ID} />
            </TabPanel>
            <TabPanel value="2" className={classes.tabpanel}>
              <CardLeaveInfomation id={ID} />
            </TabPanel>
            <TabPanel value="3" className={classes.tabpanel}>
              <CardChangeEmail id={ID} />
            </TabPanel>
          </TabContext>
        </Box>
      </Drawer>
    </>
  );
};

export default DrawerEmpInformation;
