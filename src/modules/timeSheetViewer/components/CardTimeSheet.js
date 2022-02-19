import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import DataGrid from "../../common/DataGridTimeSheet";

import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { getTimeSheetInformationByDate } from "../../timeSheetRecord/actions";
import { getDateFormat } from "../../../utils/miscellaneous";
import { columns } from "./headers";
import { getTimeSheetById } from "../actions";
import { getChargeCode, getLocation } from "../../timeSheetManagement/actions";

const useStyles = makeStyles(() => ({
  ButtonAdd: {
    display: "flex",
    right: "40px !important",
    position: "absolute  !important",
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
  header: {
    backgroundColor: "#FFFAFA !important",
    display: "flex",
    position: "relative !important",
    alignItems: "center !important",
    justifyContent: "center",
    width: "100%",
    height: "60px",
    justifyContent: "flex-start",
  },
}));

const CardTimeSheet = (props) => {
  const { id } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { timeSheetInformationByID } = useSelector(
    (state) => state.timeSheetViewerReducer
  );
  const { locationInformation, chargeCodeInformation } = useSelector(
    (state) => state.timeSheetMngReducer
  );
  const [day, setDay] = useState(new Date());

  let header = columns;
  let Info = [];

  useEffect(() => {
    dispatch(getChargeCode());
    dispatch(getLocation());
    dispatch(getTimeSheetById("", "", id, getDateFormat(day)));
  }, []);

  useEffect(() => {
    dispatch(getTimeSheetById("", "", id, getDateFormat(day)));
  }, [day]);

  const setNextDate = () => {
    let tomorrow = moment(day).add(1, "days");
    setDay(new Date(tomorrow));
  };
  const setBeforeDate = () => {
    let yesterday = moment(day).add(-1, "days");
    setDay(new Date(yesterday));
  };
  const setToDay = () => {
    setDay(new Date(moment()));
  };

  const setDataGrid = () => {
    if (
      Object.keys(timeSheetInformationByID).length !== 0 &&
      Object.keys(locationInformation).length !== 0 &&
      Object.keys(chargeCodeInformation).length !== 0
    ) {
      timeSheetInformationByID.data.map((item, index) => {
        Info.push(item);
        Info[index].id = item.Sheet_id;
        Info[index].Location =
          locationInformation.data.filter((a) => {
            return a.Location_id === item.Location_id;
          }).length !== 0
            ? locationInformation.data.filter((a) => {
                return a.Location_id === item.Location_id;
              })[0].Location_Name
            : "";
        Info[index].Charge_code =
          chargeCodeInformation.data.filter((a) => {
            return a.ChargeCode_id === item.Charge_code_id;
          }).length !== 0
            ? chargeCodeInformation.data.filter((a) => {
                return a.ChargeCode_id === item.Charge_code_id;
              })[0].ChargeCode_Name
            : "";

        Info[index].Date = new Date(item.Date);
        Info[index].Start = new Date(
          moment(item.Start_at, "h:mm:ss A").format()
        );
        Info[index].End = new Date(moment(item.End_at, "h:mm:ss A").format());
      });
    }
  };
  setDataGrid();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className={classes.box}>
        <div className={classes.header}>
          <Button
            variant="outlined"
            className={classes.dateButton}
            onClick={setToDay}
          >
            <pre>TODAY</pre>
          </Button>
          <IconButton
            color="primary"
            aria-label="before"
            component="span"
            onClick={setBeforeDate}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="before"
            component="span"
            onClick={setNextDate}
          >
            <ChevronRightIcon />
          </IconButton>
          <DatePicker
            value={day}
            onChange={(newValue) => {
              setDay(newValue);
            }}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </div>
        <DataGrid rowHeight={40} headers={header} rows={Info} />
      </Box>
    </LocalizationProvider>
  );
};

export default CardTimeSheet;
