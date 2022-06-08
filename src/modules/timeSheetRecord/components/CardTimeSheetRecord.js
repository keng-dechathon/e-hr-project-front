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
import { getCookieFromBrowser, removeCookie } from "../../../utils/cookie";
import { updateTimeSheet } from "../actions";
import { Grid } from "@mui/material";
import ConfirmDialog from "../../common/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  ButtonAdd: {
    minWidth: "110px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
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
    [theme.breakpoints.down(900)]: {
      display: "none ",
    },
  },
  normal: {
    backgroundColor: "#8bc34a !important",
  },
  holiday: {
    backgroundColor: "#2196f3 !important",
  },
  datePicker: {
    [theme.breakpoints.down(900)]: {
      width: "100% ",
    },
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
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    checkTimeSheetCookie();
    dispatch(getTimeSheetInformationByDate("", "", getDateFormat(day)));
    dispatch(getHolidaysInformation());
  }, []);
  useEffect(() => {
    setIsLoading(true);
    checkTimeSheetCookie();
    dispatch(getTimeSheetInformationByDate("", "", getDateFormat(day)));
    dispatch(updateDateState(getDateFormat(day)));
  }, [day]);

  useEffect(() => {
    if (deleteID !== "" && confirmDelete) {
      const onDelete = async (id) => {
        await deleteTimeSheet(String(id));
        dispatch(getTimeSheetInformationByDate("", "", getDateFormat(day)));
        setDeleteID("");
        setConfirmDelete(false);
      };
      onDelete(deleteID);
    }
  }, [deleteID, confirmDelete]);

  useEffect(() => {
    setIsBetween(false);
    checkIsBetweenDate();
  }, [holidaysInformation, day]);

  useEffect(() => {
    setIsLoading(false);
  }, [timesheetByDate]);

  const ConfirmDelete = () => {
    setConfirmDelete(true);
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const onClickDelete = React.useCallback(
    (id) => () => {
      setDeleteID(id);
      setOpenDialog(true);
    },
    []
  );
  const checkTimeSheetCookie = async () => {
    if (
      getCookieFromBrowser("Sheet_Id") !== undefined &&
      getCookieFromBrowser("Sheet_Detail") !== undefined
    ) {
      const values = {
        Detail: getCookieFromBrowser("Sheet_Detail"),
        Sheet_id: getCookieFromBrowser("Sheet_Id"),
      };
      await updateTimeSheet(values);
      removeCookie("Sheet_Detail");
      removeCookie("Sheet_Id");
    }
    if (
      getCookieFromBrowser("Remark") !== undefined &&
      getCookieFromBrowser("SheetRemark_Id") !== undefined
    ) {
      const values = {
        Remark: getCookieFromBrowser("Remark"),
        Sheet_id: getCookieFromBrowser("SheetRemark_Id"),
      };
      await updateTimeSheet(values);
      removeCookie("Remark");
      removeCookie("SheetRemark_Id");
    }
    dispatch(getTimeSheetInformationByDate("", "", getDateFormat(day)));
  };

  let header = columns;
  let Info = [];
  header[columns.length] = {
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
    checkTimeSheetCookie();
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
        console.log(item);
        Info.push(item);
        if (item.Remark === "") {
          if (
            getCookieFromBrowser("Remark") !== undefined &&
            getCookieFromBrowser("SheetRemark_Id") !== undefined
          ) {
            if (
              String(item.Sheet_id) ===
              String(getCookieFromBrowser("SheetRemark_Id"))
            ) {
              Info[index].Remark = getCookieFromBrowser("Remark");
            }
          }
        }
        if (item.Detail === "") {
          if (
            getCookieFromBrowser("Sheet_Id") !== undefined &&
            getCookieFromBrowser("Sheet_Detail") !== undefined
          ) {
            if (
              String(item.Sheet_id) === String(getCookieFromBrowser("Sheet_Id"))
            ) {
              Info[index].Detail = getCookieFromBrowser("Sheet_Detail");
            }
          }
        }
        Info[index].id = item.Sheet_id;
        Info[index].Date = new Date(item.Date);
        Info[index].Start = new Date(
          moment(item.Start_at, "h:mm:ss A").format()
        );
        Info[index].End = new Date(moment(item.End_at, "h:mm:ss A").format());
      });
    }
  };
  const checkIsBetweenDate = () => {
    if (Object.keys(holidaysInformation).length !== 0) {
      setIsBetween(false);
      const nowYear = moment(day).format("YYYY");
      holidaysInformation.data.map((item) => {
        const start = new Date(
          moment(moment(item.Start).format("MMM Do ") + nowYear, "MMM Do YYYY")
        );
        const end = new Date(
          moment(
            moment(item.End).format("MMM Do ") + nowYear,
            "MMM Do YYYY"
          ).add(1, "days")
        );
        const range = moment().range(start, end);
        if (range.contains(day)) {
          setIsBetween(true);
        }
      });
    }
  };
  setDataGrid();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ConfirmDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        onClick={ConfirmDelete}
        message={"Do you insist on deleting timesheet ?"}
      />
      <Box className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={9} sm={7}>
            <Stack
              direction="row"
              style={{ alignItems: "center", width: "100%" }}
            >
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
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    className={classes.datePicker}
                  />
                )}
              />
              {isBetween ? (
                <Typography
                  variant="subtitle1"
                  color="mute"
                  className={classes.attention}
                >
                  <ErrorOutlineIcon
                    fontSize="small"
                    style={{ marginRight: "5px" }}
                  />
                  holiday
                </Typography>
              ) : (
                ""
              )}
            </Stack>
          </Grid>
          <Grid
            item
            xs={3}
            sm={5}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              className={classes.ButtonAdd}
              onClick={onClickAdd}
            >
              <pre>+ ADD</pre>
            </Button>
          </Grid>
          <Grid item xs={12} style={{ width: "100%" }}>
            <DataGrid
              loading={isLoading}
              rowHeight={40}
              headers={header}
              rows={Info}
              pageSize={100}
            />
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default CardTimeSheetRecord;
