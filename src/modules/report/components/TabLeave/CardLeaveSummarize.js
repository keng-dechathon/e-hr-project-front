import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
// import FormHolidaysUpdate from './FormHolidaysUpdate'
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import DataGrid from "../../../common/DataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { allLeaveHeader } from "./allLeaveHeader";
import moment from "moment";
import {
  QuickSearchToolbar,
  escapeRegExp,
} from "../../../common/QuickSearchToolbar/QuickSearchToolbar";
import { Button } from "@mui/material";
import { getAllLeaveInformation } from "../../actions";

import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";
import Typography from "../../../common/Typography/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ErrorIcon from "@mui/icons-material/Error";
import classNames from "classnames";
import { getLeaveTypeInformation } from "../../../leaveType/actions";
import { Divider } from "@mui/material";
import renderCellExpand from "../../../common/DataGridTimeSheet/renderCellExpand";
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
  searchBox:{
    height:"59px",
  },
}));

const CardLeaveSummarize = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { empInformation } = useSelector((state) => state.employeeReducer);
  const { allLeaveInformation } = useSelector((state) => state.reportReducer);
  const { holidaysInformation } = useSelector((state) => state.timeReducer);
  const { leaveTypeInformation } = useSelector(
    (state) => state.leaveTypeReducer
  );

  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);
  const [pageSize, setPageSize] = useState(50);

  const [isBetween, setIsBetween] = useState(false);
  const [day, setDay] = useState(new Date());
  const [showType, setShowType] = useState("Day");
  const [sortModel, setSortModel] = useState([
    {
      field: "ID",
      sort: "desc",
    },
  ]);
  const [isSetInfo, setIsSetInfo] = useState(false);
  const [Info, setInfo] = useState([]);
  const [Header, setHeader] = useState([]);

  useEffect(() => {
    dispatch(getAllLeaveInformation());
    dispatch(getLeaveTypeInformation());
  }, []);
  useEffect(() => {
    checkIsBetweenDate();
  }, [holidaysInformation, day]);
  useEffect(() => {
    if (Object.keys(leaveTypeInformation).length !== 0) setHeaderColumn();
    else dispatch(getLeaveTypeInformation());
  }, [leaveTypeInformation]);
  useEffect(() => {
    setDataGrid();
  }, [allLeaveInformation, day, showType]);
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    if (Info.length !== 0) {
      const filteredRows = Info.filter((row) => {
        return Object.keys(row).some((field) => {
          if (field !== "Type_ID")
            return searchRegex.test(row[field].toString());
        });
      });
      setSearchInfo(filteredRows);
    }
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
  const setHeaderColumn = () => {
    setHeader([]);
    setHeader((Info) => [
      ...Info,
      {
        field: "Name",
        headerName: "Name",
        minWidth: 200,
        headerClassName: "bg-light-green",
        renderCell: renderCellExpand,
        sortable: false,
      },
    ]);

    if (Object.keys(leaveTypeInformation).length !== 0) {
      leaveTypeInformation.data.map((item, index) => {
        setHeader((Info) => [
          ...Info,
          {
            field: item.Type_name,
            headerName: item.Type_name,
            minWidth: 80,
            flex: 1,
            headerClassName: "bg-light-green",
            renderCell: renderCellExpand,
            sortable: false,
          },
        ]);
      });
    }
  };
  const setDataGrid = () => {
    setInfo([]);
    setIsSetInfo(false);
    if (
      Object.keys(allLeaveInformation).length !== 0 &&
      Object.keys(empInformation).length !== 0 &&
      Object.keys(leaveTypeInformation).length !== 0
    ) {
      empInformation.data.map((emp) => {
        if (emp.Active_Status) {
          let temp = {};
          let count = {};
          console.log(emp);
          temp.Name = emp.Name;
          temp.id = emp.Emp_id;
          leaveTypeInformation.data.map((type) => {
            temp[type.Type_name] = 0;
          });
          allLeaveInformation.data.map((item) => {
            if (String(item.Emp_id) === String(emp.Emp_id)) {
              if (showType === "Day") {
                let start = new Date(moment(item.Begin).format());
                let end = new Date(moment(moment(item.End).format()));
                let range = moment().range(start, end);
                if (range.contains(day)) {
                  if (typeof count[item.Type_name] === "undefined") {
                    count[item.Type_name] = item.Amount;
                  } else {
                    count[item.Type_name] += item.Amount;
                  }
                }
              }
              if (showType === "Month") {
                let year = moment(day).format("YYYY");
                let month = moment(day).format("MM");
                let startOfMonth = moment([year, month - 1]).format();
                let endOfMonth = moment(startOfMonth).endOf("month").format();
                let range = moment().range(startOfMonth, endOfMonth);
                let Begin = new Date(moment(item.Begin).format());
                let End = new Date(moment(item.End).format());
                if (range.contains(Begin) || range.contains(End)) {
                  if (typeof count[item.Type_name] === "undefined") {
                    count[item.Type_name] = item.Amount;
                  } else {
                    count[item.Type_name] += item.Amount;
                  }
                }
              }
              if (showType === "Year") {
                let year = moment(day).format("YYYY");
                let startOfYear = new Date(year, 1, 1);
                let endOfYear = new Date(year, 12, 31);
                let range = moment().range(startOfYear, endOfYear);
                let Begin = new Date(moment(item.Begin).format());
                let End = new Date(moment(item.End).format());
                if (range.contains(Begin) || range.contains(End)) {
                  if (typeof count[item.Type_name] === "undefined") {
                    count[item.Type_name] = item.Amount;
                  } else {
                    count[item.Type_name] += item.Amount;
                  }
                }
              }
            } else {
            }
          });
          Object.keys(count).map(function (key) {
            temp[key] = count[key];
          });
          Object.keys(temp).map(function (key) {
            if (temp[key] === 0) temp[key] = "0";
          });
          setInfo((Info) => [...Info, temp]);
        }
      });
      setIsSetInfo(true);
    }
  };

  // setDataGrid();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
              <Typography variant="h5" color={"pink"} fontWeight="bold">
                ALL LEAVE SUMMARIZE
              </Typography>
              <Divider style={{ marginTop: "10px" }} />
            </Grid> */}
          <Grid item xs={12}  style={{marginTop: "15px",}}>
            <QuickSearchToolbar
              value={searchText}
              style={{maxWidth:"500px"}}
              onChange={(event) => requestSearch(event.target.value)}
              clearSearch={() => requestSearch("")}
            />
          </Grid>
          <Grid item sm={12} md={7}  style={{width:"100%"}}>
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
          <Grid
            item
            sm={12}
            md={5}
            style={{ width: "100%" }}          
          >
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
          <Grid item sm={12} style={{ width: "100%" }}>
            <DataGrid
              sortingOrder={["desc", "asc"]}
              sortModel={sortModel}
              onSortModelChange={(model) =>
                Info.length !== 0 ? setSortModel(model) : ""
              }
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[50, 100]}
              pagination
              loading={isSetInfo ? false : true}
              disableSelectionOnClick
              className={classes.datagrid}
              headers={Header ? Header : ""}
              rows={searchText ? searchInfo : Info ? Info : ""}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </>
  );
};

export default CardLeaveSummarize;
