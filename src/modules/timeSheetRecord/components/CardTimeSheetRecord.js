import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import DataGrid from "../../common/DataGridTimeSheet";

import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import Typography from "../../common/Typography/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { getTimeSheetInformationByDate } from "../actions";
import { getDateFormat } from "../../../utils/miscellaneous";
import { columns } from "./headers";
import { updateDateState, clearDateState } from "../actions";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { deleteTimeSheet, addTimeSheet } from "../actions";
import { getHolidaysInformation } from "../../timeManagement/actions";
import { Stack } from "@mui/material";
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
  attention: {
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
const moment = extendMoment(Moment);

const CardTimeSheetRecord = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { timesheetByDate, dateState } = useSelector(
    (state) => state.timesheetReducer
  );
  const { holidaysInformation } = useSelector((state) => state.timeReducer);

  const [day, setDay] = useState(new Date());
  const [deleteID, setDeleteID] = useState("");
  const [isBetween, setIsBetween] = useState(false);

  useEffect(() => {
    dispatch(getTimeSheetInformationByDate("", "", getDateFormat(day)));
    dispatch(getHolidaysInformation());
  }, []);
  useEffect(() => {
    dispatch(getTimeSheetInformationByDate("", "", getDateFormat(day)));
    dispatch(updateDateState(getDateFormat(day)));
  }, [day]);

  useEffect(() => {
    if (deleteID !== "") {
      const onDelete = async (id) => {
        await deleteTimeSheet(String(id));
        dispatch(getTimeSheetInformationByDate("", "", getDateFormat(day)));
      };
      onDelete(deleteID);
      setDeleteID("");
    }
  }, [deleteID]);

  useEffect(() => {
    setIsBetween(false);
    checkIsBetweenDate();
  }, [holidaysInformation, day]);
  const onClickDelete = React.useCallback(
    (id) => () => {
      setDeleteID(id);
    },
    []
  );

  let header = columns;
  let Info = [];
  header[8] = {
    field: "actions",
    type: "actions",
    headerName: "Action",
    headerClassName: "bg-light-green",
    width: 70,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={onClickDelete(params.id)}
      />,
    ],
  };
  const onClickAdd = async () => {
    const values = {
      Date: getDateFormat(day),
      Start_at: moment(new Date()).format("HH:mm:ss"),
      End_at: moment(new Date()).format("HH:mm:ss"),
    };
    await addTimeSheet(values);
    dispatch(getTimeSheetInformationByDate("", "", getDateFormat(day)));
  };
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
    if (Object.keys(timesheetByDate).length !== 0) {
      timesheetByDate.data.map((item, index) => {
        // let Duration = moment.duration(
        //   moment(item.End_at, "h:mm:ss A").diff(
        //     moment(item.Start_at, "h:mm:ss A")
        //   )
        // );
        Info.push(item);
        Info[index].id = item.Sheet_id;
        // console.log(new Date(item.Date));
        Info[index].Date = new Date(item.Date);
        // Info[index].Start = moment(item.Start_at, "h:mm:ss A").format("HH:mm");
        Info[index].Start = new Date(
          moment(item.Start_at, "h:mm:ss A").format()
        );
        // console.log(new Date(moment(item.Start_at, "h:mm:ss A").format()));
        Info[index].End = new Date(moment(item.End_at, "h:mm:ss A").format());
        // Info[index].duration = moment
        //   .utc(Duration.as("milliseconds"))
        //   .format("HH:mm");
      });
    }
  };
  const checkIsBetweenDate = () => {
    if (Object.keys(holidaysInformation).length !== 0) {
      const nowYear = moment(day).format("YYYY");
      holidaysInformation.data.map((item) => {
        const start = new Date(
          moment(moment(item.Start).format("MMM Do ") + nowYear, "MMM Do YYYY")
        );
        const end = new Date(
          moment(moment(item.End).format("MMM Do ") + nowYear, "MMM Do YYYY").add(1, "days")
        );
        const now = day;
        const range = moment().range(start, end);
        if (range.contains(now)) {
          setIsBetween(true);
        }
      });
    }
  };
  setDataGrid();
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
          <Stack direction="row" style={{ alignItems: "center" }}>
            <Button
              variant="contained"
              className={isBetween ? classes.holiday : classes.normal}
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
              inputFormat="dd/MM/yyyy"
              onChange={(newValue) => {
                setDay(newValue);
              }}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
            {isBetween ? (
              <Typography
                variant="h7"
                color="mute"
                className={classes.attention}
              >
                <ErrorOutlineIcon
                  fontSize="small"
                  style={{ marginRight: "5px" }}
                />
                This day is holiday
              </Typography>
            ) : (
              ""
            )}

            <Button
              variant="outlined"
              className={classes.ButtonAdd}
              onClick={onClickAdd}
            >
              <pre>+ ADD</pre>
            </Button>
          </Stack>
        </div>
        <DataGrid rowHeight={40} headers={header} rows={Info} />
      </Box>
    </LocalizationProvider>
  );
};

export default CardTimeSheetRecord;
