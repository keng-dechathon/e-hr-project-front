import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import DataGrid from "../../../common/DataGridTimeSheet";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Box from "@mui/material/Box";
import ModalUpdate from "../../../common/ModalUpdate";
import Typography from "../../../common/Typography/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { getTimeSheetInformationByDate } from "../../actions";
import { getDateFormat } from "../../../../utils/miscellaneous";
import { columns } from "./headers";
import { updateDateState, clearDateState } from "../../actions";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { deleteTimeSheet, addTimeSheet } from "../../actions";
import { getHolidaysInformation } from "../../../timeManagement/actions";
import { Stack } from "@mui/material";
import { getCookieFromBrowser, removeCookie } from "../../../../utils/cookie";
import { updateTimeSheet } from "../../actions";
import FormTimeShettRecordWithForm from "./FormTimeShettRecordWithForm";
import { Grid } from "@mui/material";
import ConfirmDialog from "../../../common/ConfirmDialog";
import {
  getLocation,
  getChargeCode,
} from "../../../timeSheetManagement/actions";

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

const CardTimeSheetRecordWithForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { timesheetByDate, dateState } = useSelector(
    (state) => state.timesheetReducer
  );
  const { holidaysInformation } = useSelector((state) => state.timeReducer);
  const { locationInformation, chargeCodeInformation } = useSelector(
    (state) => state.timeSheetMngReducer
  );

  const [day, setDay] = useState(new Date());
  const [deleteID, setDeleteID] = useState("");
  const [isBetween, setIsBetween] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [ID, setID] = useState("");
  const [option, setOption] = useState("");

  useEffect(() => {
    setIsLoading(true);
    dispatch(getTimeSheetInformationByDate("", "", getDateFormat(day)));
    dispatch(getHolidaysInformation());
    dispatch(getLocation());
    dispatch(getChargeCode());
  }, []);

  useEffect(() => {
    setIsLoading(true);
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
  const handleClose = () => {
    setOpen(false);
  };

  const onClickDelete = React.useCallback(
    (id) => () => {
      setDeleteID(id);
      setOpenDialog(true);
    },
    []
  );

  let header = columns;
  let Info = [];

  header[columns.length] = {
    field: "actions",
    type: "actions",
    headerName: "Action",
    headerClassName: "bg-light-green",
    width: 90,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        onClick={onClickUpdate(params.id)}
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={onClickDelete(params.id)}
      />,
    ],
  };
  const onClickUpdate = React.useCallback(
    (id) => () => {
      setOpen(true);
      setOption("update");
      setID(id);
    },
    []
  );
  const onClickAdd = async () => {
    setOpen(true);
    setOption("add");
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
    if (
      Object.keys(timesheetByDate).length !== 0 &&
      Object.keys(locationInformation).length !== 0 &&
      Object.keys(chargeCodeInformation).length !== 0
    ) {
      timesheetByDate.data.map((item, index) => {
        item = JSON.parse(JSON.stringify(item));
        Info.push(item);
        // console.log( item.Location_id);

        Info[index].id = item.Sheet_id;
        Info[index].Location_Name = locationInformation.data.filter(
          (location) =>  String(location.Location_id) ===  String(item.Location_id)
        )[0].Location_Name;
        Info[index].ChargeCode_Name = chargeCodeInformation.data.filter(
          (chagecode) => String(chagecode.ChargeCode_id) === String(item.Charge_code_id)
        )[0].ChargeCode_Name;
        Info[index].Date = moment(item.Date).format("DD/MM/YYYY");
        Info[index].Start = moment(item.Start_at, "h:mm:ss A").format("H:mm");
        Info[index].End = moment(item.End_at, "h:mm:ss A").format("H:mm");
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
      <ModalUpdate
        open={open}
        handleClose={handleClose}
        title="Timesheet Update"
      >
        <FormTimeShettRecordWithForm
          handleClose={handleClose}
          option={option}
          day={day}
          id={ID}
        />
      </ModalUpdate>
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
              <Button
                variant="contained"
                className={isBetween ? classes.holiday : classes.normal}
                onClick={setToDay}
                style={{ height: "40px", marginLeft: "16px" }}
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
              loading={loadingAdd}
              disabled={loadingAdd}
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

export default CardTimeSheetRecordWithForm;
