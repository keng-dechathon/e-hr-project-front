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
import { CardContent } from "@mui/material";
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
import { getCheckInformation } from "../actions";
import { checkIn, checkOut } from "../actions";
import { headers } from "./headers";
import { Divider } from "@mui/material";
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
const moment = extendMoment(Moment);

const CardCheckIn_CheckOut = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { holidaysInformation } = useSelector((state) => state.timeReducer);

  const { checkInformation } = useSelector(
    (state) => state.checkin_checkoutReducer
  );
  const { accountInformation } = useSelector((state) => state.accountReducer);

  useEffect(() => {
    dispatch(getHolidaysInformation());
  }, []);

  useEffect(() => {
    checkIsBetweenDate();
  }, [holidaysInformation]);

  const [isBetween, setIsBetween] = useState(false);
  const [day, setDay] = useState(new Date());
  const [showType, setShowType] = useState("Day");
  const [pageSize, setPageSize] = useState(10);
  let Header = headers;
  let Info = [];

  useEffect(() => {
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

  const onClickCheckIn = async () => {
    await checkIn();
  };

  const onClickCheckOut = async () => {
    await checkOut();
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

  const checkIsBetweenDate = () => {
    if (Object.keys(holidaysInformation).length !== 0) {
      const nowYear = moment(new Date()).format("YYYY");
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
        const now = new Date();
        const range = moment().range(start, end);
        if (range.contains(now)) {
          setIsBetween(true);
        }
      });
    }
  };
  const setDataGrid = () => {
    if (Object.keys(checkInformation).length !== 0) {
      checkInformation.data.map((item, index) => {      
        Info.push(item);
        Info[index].Date =  moment(item.Check_in).format(" MMMM Do YYYY");
        Info[index].id = item.CheckId;
      });
      Info.reverse();
    }
  };
  console.log(Info);
  setDataGrid()
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className={classes.box}>
        <Divider />
        <Stack direction="row" spacing={2} style={{ margin: "15px 0" }}>
          <Button
            variant="contained"
            className={classNames(
              classes.checkButton,
              isBetween ? classes.cin_holiday : classes.cin_normal
            )}
            onClick={onClickCheckIn}
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
            onClick={onClickCheckOut}
          >
            {/* <MoodBadIcon fontSize="small" style={{ marginRight: "5px" }} /> */}
            <pre>Check-out</pre>
          </Button>
          {isBetween ? (
            <Typography variant="h7" color="mute" className={classes.attention}>
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
        <Divider />
        <div
          style={{
            display: "inline-block !important",
            position: "relative !important",
            width: "100%",
            height: "40px",
            marginTop: "15px",
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
                className={classes.attention2}
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
            <Stack direction="row" spacing={1} className={classes.ButtonAdd}>
              <Button
                variant={showType === "Day" ? "outlined" : "contained"}
                onClick={() => {
                  setShowType("Day");
                }}
              >
                <pre>DAY</pre>
              </Button>
              <Button
                variant={showType === "Month" ? "outlined" : "contained"}
                onClick={() => {
                  setShowType("Month");
                }}
              >
                <pre>month</pre>
              </Button>
              <Button
                variant={showType === "Year" ? "outlined" : "contained"}
                onClick={() => {
                  setShowType("Year");
                }}
              >
                <pre>Year</pre>
              </Button>
            </Stack>
          </Stack>
        </div>
        <DataGrid        
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
          className={classes.datagrid}
          disableSelectionOnClick   
          headers={Header ? Header : ""}
          rows={Info ? Info : ""}       
        />
      </Box>
    </LocalizationProvider>
  );
};

export default CardCheckIn_CheckOut;
