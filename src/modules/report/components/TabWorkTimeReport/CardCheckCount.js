import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import {
  getAllCheckInformation,
  getAllToDayCheckInformation,
} from "../../actions";
import { useSelector, useDispatch } from "react-redux";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { Grid } from "@mui/material";
import { getEmployeeInformtion } from "../../../employeeInfomation/actions";
import Typography from "../../../common/Typography/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import { Card } from "@mui/material";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CancelIcon from "@mui/icons-material/Cancel";
const useStyles = makeStyles((theme) => ({
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
  cardCount: {
    color: "#FFFFFF",
    display: "flex",
    position: "relative",
    // justifyContent: "flex-end ",
    alignItems: "center",
    marginBottom: "15px",
    height: "175.33px",
    padding: "10px",
    [theme.breakpoints.down("xs")]: {
      height: "100px",
    },
  },
}));

const CardCheckCount = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { empInformation } = useSelector((state) => state.employeeReducer);
  const { toDayCheckInformation } = useSelector((state) => state.reportReducer);

  const [empCount, setEmpCount] = useState(0);
  const [toDayCheck, setToDayCheck] = useState(0);
  const [toDayLate, setToDayLate] = useState(0);
  const [toDayDontCheck, setToDayDontCheck] = useState(0);
  const [toDayLeave, setToDayLeave] = useState(0);

  useEffect(() => {
    dispatch(getEmployeeInformtion());
    dispatch(getAllToDayCheckInformation());
  }, []);

  useEffect(() => {
    setNumberOfEmployee();
  }, [empInformation]);
  useEffect(() => {
    setNumberOfEmployeeCheckToDay();
  }, [toDayCheckInformation]);

  const setNumberOfEmployee = () => {
    if (Object.keys(empInformation).length !== 0) {
      setEmpCount(
        empInformation.data.filter((item) => {
          let keep = true;
          if (item.Active_Status === true) {
            keep =
              item.Role === "Manager" ||
              item.Role === "Hr" ||
              item.Role === "Staff";
             
          } else {
            keep = false;
          }
          if(keep === true) console.log(item);
          return keep;
        }).length
      );
    }
  };

  const setNumberOfEmployeeCheckToDay = () => {
    if (Object.keys(toDayCheckInformation).length !== 0) {
      setToDayCheck(
        toDayCheckInformation.data.filter(
          (item) =>
            item.Check_in_status === "Late" ||
            item.Check_in_status === "In time"
        ).length
      );
      setToDayLate(
        toDayCheckInformation.data.filter(
          (item) => item.Check_in_status === "Late"
        ).length
      );
      setToDayDontCheck(
        toDayCheckInformation.data.filter(
          (item) => item.Check_in_status === "-" && item.Detail !== "Leaved"
        ).length
      );
      setToDayLeave(
        toDayCheckInformation.data.filter((item) => item.Detail === "Leaved")
          .length
      );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container>
        <Grid item xs={12}>
          <Card
            className={classes.cardCount}
            style={{
              backgroundColor: "#90EE90",
            }}
          >
            <CheckCircleIcon
              style={{
                color: "white",
                width: "70px",
                height: "70px",
                position: "absolute",
                left: "15px",
              }}
            />
            <div style={{ position: "absolute", right: "15px" }}>
              <Typography
                variant="subtitle1"
                color="white"
                style={{
                  display: "flex",
                  justifyContent: "right ",
                  width: "100%",
                }}
              >
                Check-in today
              </Typography>
              <Typography
                variant="h3"
                color="white"
                style={{
                  display: "flex",
                  justifyContent: "right ",
                  width: "100%",
                }}
              >
                {toDayCheck + "/" + empCount}
              </Typography>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card
            className={classes.cardCount}
            style={{
              backgroundColor: "#C74B50",
            }}
          >
            <ErrorIcon
              style={{
                color: "white",
                width: "70px",
                height: "70px",
                position: "absolute",
                left: "15px",
              }}
            />
            <div style={{ position: "absolute", right: "15px" }}>
              <Typography
                variant="subtitle1"
                color="white"
                style={{
                  display: "flex",
                  justifyContent: "right ",
                  width: "100%",
                }}
              >
                Late today
              </Typography>
              <Typography
                variant="h3"
                color="white"
                style={{
                  display: "flex",
                  justifyContent: "right ",
                  width: "100%",
                }}
              >
                {toDayLate}
              </Typography>
            </div>
          </Card>
        </Grid>
        {/* <Grid item xs={12}>
            <Card
              style={{
                padding: "10px",
                backgroundColor: "#FFD32D",
                color: "#FFFFFF",
                display: "flex",
                position: "relative",
                alignItems: "center",
                marginBottom: "10px",
                height: "147.5px",
              }}
            >
              <CancelIcon
                style={{
                  color: "white",
                  width: "70px",
                  height: "70px",
                  position: "absolute",
                  left: "15px",
                }}
              />
              <div style={{ position: "absolute", right: "15px" }}>
                <Typography
                  variant="subtitle1"
                  color="white"
                  style={{
                    display: "flex",
                    justifyContent: "right ",
                    width: "100%",
                  }}
                >
                  Don't check-in today
                </Typography>
                <Typography
                  variant="h3"
                  color="white"
                  style={{
                    display: "flex",
                    justifyContent: "right ",
                    width: "100%",
                  }}
                >
                  {toDayDontCheck + "/" + empCount}
                </Typography>
              </div>
            </Card>
          </Grid> */}
        <Grid item xs={12}>
          <Card
            className={classes.cardCount}
            style={{
              backgroundColor: "#180A0A",
              marginBottom: "0px ",
            }}
          >
            <DirectionsCarIcon
              style={{
                color: "white",
                width: "70px",
                height: "70px",
                position: "absolute",
                left: "15px",
              }}
            />
            <div style={{ position: "absolute", right: "15px" }}>
              <Typography
                variant="subtitle1"
                color="white"
                style={{
                  display: "flex",
                  justifyContent: "right ",
                  width: "100%",
                }}
              >
                Leave today
              </Typography>
              <Typography
                variant="h3"
                color="white"
                style={{
                  display: "flex",
                  justifyContent: "right ",
                  width: "100%",
                }}
              >
                {toDayLeave}
              </Typography>
            </div>
          </Card>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default CardCheckCount;
