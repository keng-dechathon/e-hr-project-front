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
import { columns } from "./headers";
import { updateDateState, clearDateState } from "../actions";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { deleteTimeSheet, addTimeSheet } from "../actions";
import { values } from "lodash";

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
  const { timesheetByDate, dateState } = useSelector(
    (state) => state.timesheetReducer
  );

  const [day, setDay] = useState(new Date());
  const [deleteID, setDeleteID] = useState("");

  useEffect(() => {
    dispatch(getTimeSheetInformationByDate("", "", getDateFormat(day)));
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
    const values = { Date: getDateFormat(day),Start_at:moment(new Date()).format("HH:mm:ss"),End_at:moment(new Date()).format("HH:mm:ss") };
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
          <Button
            variant="outlined"
            className={classes.ButtonAdd}
            onClick={onClickAdd}
          >
            <pre>+ ADD</pre>
          </Button>
        </div>
        <DataGrid
          rowHeight={40}
          headers={header}
          rows={Info}
          // editRowsModel={editRowsModel}
          // onEditRowsModelChange={handleEditRowsModelChange}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default CardTimeSheetRecord;
