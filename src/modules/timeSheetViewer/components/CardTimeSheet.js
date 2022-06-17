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
import Moment from "moment";
import { extendMoment } from "moment-range";
import Typography from "../../common/Typography/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { getTimeSheetInformationByDate } from "../../timeSheetRecord/actions";
import { getDateFormat } from "../../../utils/miscellaneous";
import { columns } from "./headers";
import { getTimeSheetById } from "../actions";
import { getChargeCode, getLocation } from "../../timeSheetManagement/actions";
import { getHolidaysInformation } from "../../timeManagement/actions";
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  // ButtonAdd: {
  //   display: "flex",
  //   right: "40px !important",
  //   position: "absolute  !important",
  // },

  // cardcontant: {
  //   padding: 0,
  //   "&:last-child": {
  //     paddingBottom: "0 !important",
  //   },
  // },
  header: {
    backgroundColor: "#FFFAFA !important",
    display: "flex",
    position: "relative !important",
    alignItems: "center !important",
    justifyContent: "center",
    width: "100%",
    height: "60px",
    marginBottom: "5px",
    justifyContent: "flex-start",
  },
  // attention: {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginLeft: "10px",
  // },
  // normal: {
  //   backgroundColor: "#8bc34a !important",
  // },
  // holiday: {
  //   backgroundColor: "#2196f3 !important",
  // },
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
  },
  attention: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
      width: "100% ",
    },
  },
  paddingTop: {
    paddingTop: "0px !important",
  },
  paddingTop2: {
    [theme.breakpoints.up(900)]: {
      paddingTop: "5px !important",
    },
  },
}));
const moment = extendMoment(Moment);

const CardTimeSheet = (props) => {
  const { id, isLoading, setIsLoading } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { timeSheetInformationByID } = useSelector(
    (state) => state.timeSheetViewerReducer
  );
  const { locationInformation, chargeCodeInformation } = useSelector(
    (state) => state.timeSheetMngReducer
  );
  const { holidaysInformation } = useSelector((state) => state.timeReducer);

  const [day, setDay] = useState(new Date());
  const [isBetween, setIsBetween] = useState(false);

  let header = columns;
  let Info = [];

  useEffect(() => {
    setIsLoading(true);
    dispatch(getChargeCode());
    dispatch(getLocation());
    dispatch(getHolidaysInformation());
    dispatch(getTimeSheetById("", "", id, getDateFormat(day)));
  }, []);
  useEffect(() => {
    setIsLoading(false);
  }, [timeSheetInformationByID]);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getTimeSheetById("", "", id, getDateFormat(day)));
  }, [day]);

  useEffect(() => {
    checkIsBetweenDate();
  }, [holidaysInformation, day]);

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
        // console.log( moment(item.Date).format("DD/MM/YYYY"));
        // Info[index].Date = new Date(item.Date);
        Info[index].Date = moment(item.Date).format("DD/MM/YYYY");
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
      <Box className={classes.box}>
        <Grid container spacing={2}>
          <Grid
            item
            sm={12}
            md={7}
            className={classes.paddingTop}
            style={{ width: "100%" }}
          >
            <Stack direction="row" className={classes.daySearch}>
              <DatePicker
                value={day}
                inputFormat="dd/MM/yyyy"
                style={{ width: "100%" }}
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
          <Grid item sm={12} style={{ width: "100%" }}>
            <DataGrid
              rowHeight={40}
              pageSize={100}
              headers={header}
              rows={Info}
              loading={isLoading}
            />
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default CardTimeSheet;
