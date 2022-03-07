import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import DataGrid from "../../common/DataGridTimeSheet";
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
import { checkIn, checkOut } from "../actions";
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
}));
const moment = extendMoment(Moment);

const CardCheckIn_CheckOut = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { holidaysInformation } = useSelector((state) => state.timeReducer);
  useEffect(() => {
    dispatch(getHolidaysInformation());
  }, []);
  useEffect(() => {
    checkIsBetweenDate();
  }, [holidaysInformation]);

  const [isBetween, setIsBetween] = useState(false);
  const onClickCheckIn = async () => {
    await checkIn();
  };
  const onClickCheckOut = async () => {
    await checkOut();
  };

  const checkIsBetweenDate = () => {
    if (Object.keys(holidaysInformation).length !== 0) {
      const nowYear = moment(new Date()).format("YYYY");
      holidaysInformation.data.map((item) => {
        const start = new Date(
          moment(moment(item.Start).format("MMM Do ") + nowYear, "MMM Do YYYY")
        );
        const end = new Date(
          moment(moment(item.End).format("MMM Do ") + nowYear, "MMM Do YYYY").add(1, "days")
        );
        const now = new Date();
        const range = moment().range(start, end);
        if (range.contains(now)) {
          setIsBetween(true);
        }
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className={classes.box}>
        <Stack direction="row" spacing={2}>
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
      </Box>
    </LocalizationProvider>
  );
};

export default CardCheckIn_CheckOut;
