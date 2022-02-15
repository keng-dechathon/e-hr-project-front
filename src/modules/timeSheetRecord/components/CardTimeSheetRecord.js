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
import { getTimeSheetInformationByDate } from "../actions";
import { getDateFormat } from "../../../utils/miscellaneous";
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
  dateButton: {},
}));

const CardTimeSheetRecord = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { timesheetByDate } = useSelector(state => state.timesheetReducer)

  const [day, setDay] = useState(new Date());
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    dispatch(getTimeSheetInformationByDate('','',getDateFormat(new Date())))
  }, []);
console.log(timesheetByDate);
  const setNextDate = () => {
    let tomorrow = moment(day).add(1, "days");
    setDay(tomorrow);
  };
  const setBeforeDate = () => {
    let yesterday = moment(day).add(-1, "days");
    setDay(yesterday);
  };
  const setToDay = () => {
    setDay(moment());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className={classes.box}>
        <div
          style={{
            display: "inline-block !important",
            position: "relative !important",
            width: "100%",
            height: "40px",
            marginBottom: "15px",
            justifyContent: "flex-start",
          }}
        >
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
          <Button variant="outlined" className={classes.ButtonAdd}>
            <pre>+ ADD</pre>
          </Button>
        </div>
        <DataGrid />
      </Box>
    </LocalizationProvider>
  );
};

export default CardTimeSheetRecord;
