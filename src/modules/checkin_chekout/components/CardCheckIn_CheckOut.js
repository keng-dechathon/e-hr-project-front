import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import DataGrid from "../../common/DataGrid";
import MoodIcon from "@mui/icons-material/Mood";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { Grid } from "@mui/material";
import { pushSnackbarAction } from "../../layout/actions";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import Moment from "moment";
import { extendMoment } from "moment-range";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { getHolidaysInformation } from "../../timeManagement/actions";
import { lightGreen } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import Typography from "../../common/Typography/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { getCheckInformation, getYearCheckInformation } from "../actions";
import { checkIn, checkOut } from "../actions";
import { headers } from "./headers";
import ConfirmDialog from "../../common/ConfirmDialog";
import { Divider } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  cin_normal: {
    backgroundColor: "#8bc34a !important",
  },
  cin_holiday: {
    backgroundColor: "#2196f3 !important",
  },
  cout_normal: {
    backgroundColor: "#f44336!important",
  },
  cout_holiday: {
    backgroundColor: "#f06292 !important",
  },

  ButtonAdd: {
    display: "flex",
    // right: "40px !important",
    // position: "absolute  !important",
    width: "100%",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center !important",
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
  checkButton: {
    width: "125px ",
    [theme.breakpoints.down("xs")]: {
      width: "100% ",
    },
  },
  attention: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down(900)]: {
      display: "none ",
    },
  },
  attention2: {
    [theme.breakpoints.up(900)]: {
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      marginLeft: "15px",
    },
    [theme.breakpoints.down(900)]: {
      display: "none",
    },
  },
  normal: {
    backgroundColor: "#8bc34a !important",
  },
  holiday: {
    backgroundColor: "#2196f3 !important",
  },
  daySearch: {
    width: "100% !important",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center !important",
    },
  },
  typeBT: {
    [theme.breakpoints.down(900)]: {
      width: "100%",
    },
  },
  datePicker: {
    [theme.breakpoints.down(900)]: {
      width: "100%",
    },
  },
  paddingTop: {
    paddingTop: "5px !important",
  },
  paddingTop2: {
    [theme.breakpoints.up(900)]: {
      paddingTop: "5px !important",
    },
  },
  removePadding: {
    paddingTop: "0px !important",
  },
}));
const moment = extendMoment(Moment);

const CardCheckIn_CheckOut = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { holidaysInformation } = useSelector((state) => state.timeReducer);

  const { checkInformation, yearCheckInformation } = useSelector(
    (state) => state.checkin_checkoutReducer
  );
  const { accountInformation } = useSelector((state) => state.accountReducer);
  
  useEffect(() => {
    dispatch(getHolidaysInformation());
  }, []);

  const [isBetween, setIsBetween] = useState(false);
  const [day, setDay] = useState(new Date());
  const [showType, setShowType] = useState("Day");
  const [pageSize, setPageSize] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [checkStatus, setCheckStatus] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  
  let toDayId = "";
  let Header = headers;
  let Info = [];

  useEffect(() => {
    checkIsBetweenDate();
  }, [holidaysInformation, day]);
  useEffect(() => {
    setIsLoading(false);
  }, [checkInformation]);
  useEffect(() => {
    setIsLoading(true);
    if (Object.keys(accountInformation).length !== 0) {
      dispatch(
        getCheckInformation(
          "",
          "",
          showType,
          String(accountInformation.Emp_id),
          moment(day).format("YYYY-MM-DD")
        )
      );
    }
  }, [accountInformation, day, showType]);

  useEffect(() => {
    if (Object.keys(accountInformation).length !== 0) {
      dispatch(
        getYearCheckInformation(
          "",
          "",
          String(accountInformation.Emp_id),
          moment(day).format("YYYY-MM-DD")
        )
      );
    }
  }, [accountInformation, day]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const isCheckIn = () => {
    setOpenDialog(true);
    setCheckStatus("checkin");
  };
  const isCheckOut = () => {
    setOpenDialog(true);
    setCheckStatus("checkout");
  };
  const onClickCheckIn = async () => {
    await checkIn();
    if (Object.keys(accountInformation).length !== 0) {
      dispatch(
        getCheckInformation(
          "",
          "",
          showType,
          String(accountInformation.Emp_id),
          moment(day).format("YYYY-MM-DD")
        )
      );
    }
    setOpenDialog(false);
    setCheckStatus("");
  };

  const onClickCheckOut = async () => {
    if (toDayId.length !== 0) {
      await checkOut(String(toDayId));
      if (Object.keys(accountInformation).length !== 0) {
        dispatch(
          getCheckInformation(
            "",
            "",
            showType,
            String(accountInformation.Emp_id),
            moment(day).format("YYYY-MM-DD")
          )
        );
      }
    } else {
      pushSnackbarAction("warning", "You must check in first.");
    }
    setOpenDialog(false);
    setCheckStatus("");
  };
  // console.log(toDayId);
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

  const setDataGrid = () => {
    if (Object.keys(checkInformation).length !== 0) {
      checkInformation.data.map((item, index) => {
        Info.push(item);
        Info[index].Date = moment(item.Check_in).format(" MMMM Do YYYY");
        Info[index].id = item.CheckId;
      });
      Info.reverse();
    }
    if (Object.keys(yearCheckInformation).length !== 0) {
      yearCheckInformation.data.map((item, index) => {
        if (index === 0) {
          toDayId = item.CheckId;
        } else {
          if (parseInt(toDayId) < parseInt(item.CheckId)) {
            toDayId = item.CheckId;
          }
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
        onClick={
          checkStatus === "checkin"
            ? onClickCheckIn
            : checkStatus === "checkout"
            ? onClickCheckOut
            : ""
        }
        message={
          checkStatus === "checkin"
            ? "Did you confirm to check in ?"
            : checkStatus === "checkout"
            ? "Did you confirm to check out ?"
            : "Did you confirm ?"
        }
      />
      <Box className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} className={classes.removePadding}>
            <Stack direction="row" spacing={2} style={{ margin: "15px 0" }}>
              <Button
                variant="contained"
                className={classNames(
                  classes.checkButton,
                  isBetween ? classes.cin_holiday : classes.cin_normal
                )}
                onClick={isCheckIn}
              >
                {/* <MoodIcon fontSize="small" style={{ marginRight: "5px" }} /> */}
                <pre>Check-in</pre>
              </Button>
              <Button
                variant="contained"
                className={classNames(
                  classes.checkButton,
                  isBetween ? classes.cout_holiday : classes.cout_normal
                )}
                onClick={isCheckOut}
              >
                {/* <MoodBadIcon fontSize="small" style={{ marginRight: "5px" }} /> */}
                <pre>Check-out</pre>
              </Button>
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
                  To day is holiday
                </Typography>
              ) : (
                ""
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} className={classes.removePadding}>
            <Divider />
          </Grid>
          <Grid item sm={12} md={7} style={{ width: "100%" }}>
            <Stack direction="row" className={classes.daySearch}>
              <Button
                variant="contained"
                className={isBetween ? classes.holiday : classes.normal}
                onClick={setToDay}
                style={{ height: "37px" }}
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
                  className={classes.attention2}
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
          <Grid item sm={12} md={5} style={{ width: "100%" }}>
            <Stack direction="row" spacing={1} className={classes.ButtonAdd}>
              <Button
                variant={showType === "Day" ? "outlined" : "contained"}
                className={classes.typeBT}
                onClick={() => {
                  setShowType("Day");
                }}
              >
                <pre>DAY</pre>
              </Button>
              <Button
                className={classes.typeBT}
                variant={showType === "Month" ? "outlined" : "contained"}
                onClick={() => {
                  setShowType("Month");
                }}
              >
                <pre>month</pre>
              </Button>
              <Button
                className={classes.typeBT}
                variant={showType === "Year" ? "outlined" : "contained"}
                onClick={() => {
                  setShowType("Year");
                }}
              >
                <pre>Year</pre>
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} style={{ width: "100%" }}>
            <DataGrid
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 20, 50, 100]}
              pagination
              loading={isLoading}
              className={classes.datagrid}
              disableSelectionOnClick
              headers={Header ? Header : ""}
              rows={Info ? Info : ""}
            />
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default CardCheckIn_CheckOut;
