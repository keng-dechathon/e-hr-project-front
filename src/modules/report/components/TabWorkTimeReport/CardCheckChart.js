import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import {
  getAllCheckInformation,
  getAllToDayCheckInformation,
} from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { getDateFormat } from "../../../../utils/miscellaneous";
import { getHolidaysInformation } from "../../../timeManagement/actions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Box } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";
import { getEmployeeInformtion } from "../../../employeeInfomation/actions";
import Typography from "../../../common/Typography/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ErrorIcon from "@mui/icons-material/Error";
import CardCheckCount from "./CardCheckCount";
import { Card } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };
const useStyles = makeStyles(() => ({
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

const CardCheckChart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { holidaysInformation } = useSelector((state) => state.timeReducer);
  const { allCheckInformation } = useSelector((state) => state.reportReducer);

  const [isBetween, setIsBetween] = useState(false);
  const [day, setDay] = useState(new Date());
  const [showType, setShowType] = useState("Day");
  const [inTime, setInTime] = useState(0);
  const [outInTime, setOutInTime] = useState(0);
  const [late, setLate] = useState(0);
  const [overTime, setOverTime] = useState(0);
  const [outEarly, setOutEarly] = useState(0);

  const labels = [
    "Check in,In time",
    "Check out,In time",
    "Late",
    "Over Time",
    "Check Out Early",
  ];

  useEffect(() => {
    dispatch(getHolidaysInformation());
    dispatch(getEmployeeInformtion());
    dispatch(getAllCheckInformation("", "", getDateFormat(day), showType));
  }, []);
  useEffect(() => {
    checkIsBetweenDate();
  }, [holidaysInformation]);
  useEffect(() => {
    dispatch(getAllCheckInformation("", "", getDateFormat(day), showType));
  }, [day, showType]);
  useEffect(() => {
    setData();
  }, [allCheckInformation]);

  let data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: [inTime, outInTime, late, overTime, outEarly],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
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
  const setData = () => {
    if (Object.keys(allCheckInformation).length !== 0) {
      setInTime(
        allCheckInformation.data.filter(
          (item) => item.Check_in_status === "In time"
        ).length
      );
      setOutInTime(
        allCheckInformation.data.filter(
          (item) => item.Check_out_status === "In time"
        ).length
      );
      setLate(
        allCheckInformation.data.filter(
          (item) => item.Check_in_status === "Late"
        ).length
      );
      setOverTime(
        allCheckInformation.data.filter(
          (item) => item.Check_out_status === "Over Time"
        ).length
      );
      setOutEarly(
        allCheckInformation.data.filter(
          (item) => item.Check_out_status === "Check Out Early"
        ).length
      );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Card style={{ padding: "0 15px" }}>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            class="chart-container"
            style={{ padding: "15px", width: "470px" ,minWidth:"300px" }}
          >
            <Doughnut data={data} />
          </div>
        </div>
      </Card>
    </LocalizationProvider>
  );
};

export default CardCheckChart;
