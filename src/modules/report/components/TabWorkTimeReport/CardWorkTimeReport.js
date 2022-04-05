import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import {
  getAllCheckInformation,
  getAllToDayCheckInformation,
} from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { getDateFormat } from "../../../../utils/miscellaneous";
import { getHolidaysInformation } from "../../../timeManagement/actions";
import CardCheckChart from "./CardCheckChart";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import moment from "moment";
import { Grid } from "@mui/material";
import { getEmployeeInformtion } from "../../../employeeInfomation/actions";
import CardTable from "./CardTable";
import CardCheckCount from "./CardCheckCount";
const useStyles = makeStyles(() => ({
  box: {
    marginTop: "20px",
  },
  cardcontant: {
    padding: 0,
    "&:last-child": {
      paddingBottom: "0 !important",
    },
  },
  ButtonAdd: {
    display: "flex",
    // right: "40px !important",
    // position: "absolute  !important",
    width: "100%",
    justifyContent: "flex-end",
  },
  box: {
    marginTop: "20px",
  },
  cardcontant: {
    padding: 0,
    "&:last-child": {
      paddingBottom: "0 !important",
    },
  },
  checkButton: {
    width: "125px ",
  },
  attention: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  attention2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "10px",
  },
  normal: {
    backgroundColor: "#8bc34a !important",
  },
  holiday: {
    backgroundColor: "#2196f3 !important",
  },
}));

const CardWorkTimeReport = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={9}  style={{width:"100%"}}>
          <CardCheckChart />
        </Grid>
        <Grid item xs={12} sm={12} md={3} style={{width:"100%"}}>
          <CardCheckCount />
        </Grid>
        <Grid item xs={12} sm={12}  style={{width:"100%"}}>
          <CardTable />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default CardWorkTimeReport;
