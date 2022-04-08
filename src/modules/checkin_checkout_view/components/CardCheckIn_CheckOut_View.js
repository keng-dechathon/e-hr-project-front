import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import DataGrid from "../../common/DataGridTimeSheet";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { getMemberInformation } from "../../team/actions";
import { getTeamByHostInformation } from "../../timeSheetViewer/actions";
import { Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText } from "@mui/material";
import AutoComplete from "../../common/AutoComplete";
import { getHolidaysInformation } from "../../timeManagement/actions";
import { headers } from "./headers";
import { getCheckInformation } from "../../checkin_chekout/actions";
import Typography from "../../common/Typography/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { getAccountInformation } from "../../identity/actions";
import { getEmployeeInformtion } from "../../employeeInfomation/actions";
const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: "20px",
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

  cardcontant: {
    padding: 0,
    "&:last-child": {
      paddingBottom: "0 !important",
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
  helpText: {
    [theme.breakpoints.down(900)]: {
      fontSize: "9px !important",
    },
  },
  divider0: {
    [theme.breakpoints.up(900)]: {
      display: "none ",
    },
    [theme.breakpoints.down(900)]: {
      display: "flex ",
    },
  },
  gridNone: {
    [theme.breakpoints.up(900)]: {
      display: "none",
    },
  },
}));
const CustomToolbar = () => {
  return (
    <GridToolbarContainer >
      <GridToolbarExport printOptions={{ disableToolbarButton: true }}/>
    </GridToolbarContainer>
  );
};
const CardCheckIn_CheckOut_View = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  // const breakPoints = useMediaQuery(theme.breakpoints.down(900));

  const { teamByHostInformation } = useSelector(
    (state) => state.timeSheetViewerReducer
  );
  const { memberInformation } = useSelector((state) => state.teamReducer);
  const { holidaysInformation } = useSelector((state) => state.timeReducer);
  const { checkInformation } = useSelector(
    (state) => state.checkin_checkoutReducer
  );
  const { accountInformation } = useSelector((state) => state.accountReducer);
  const { empInformation } = useSelector((state) => state.employeeReducer);

  useEffect(() => {
    dispatch(getAccountInformation())
    dispatch(getTeamByHostInformation());
    dispatch(getHolidaysInformation());
    dispatch(getEmployeeInformtion());
  }, []);

  useEffect(() => {
    checkIsBetweenDate();
  }, [holidaysInformation]);

  const [isBetween, setIsBetween] = useState(false);
  const [day, setDay] = useState(new Date());
  const [showType, setShowType] = useState("Day");
  const [pageSize, setPageSize] = useState(10);
  const [selectState, setSelectState] = React.useState({});
  const [selectStateFilter, setSelectStateFilter] = React.useState("");
  const [filterOption, setFilterOption] = React.useState([]);
  const [resetTextField, setResetTextField] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isManage, setIsManage] = useState(false);
  let members = [];
  let Header = headers;
  let Info = [];

  useEffect(() => {
    setIsLoading(true);
    if (Object.keys(accountInformation).length !== 0) {
      dispatch(
        getCheckInformation(
          "",
          "",
          showType,
          String(selectState.id),
          moment(day).format("YYYY-MM-DD")
        )
      );
    }
  }, [accountInformation, day, showType]);
  useEffect(() => {
    if (Object.keys(accountInformation).length !== 0) {
      if (
        accountInformation.Role == "Manager" ||
        accountInformation.Role == "Management"
      ) {
        setIsManage(true);
      } else {
        setIsManage(false);
      }
    }
  }, [accountInformation]);
  useEffect(() => {
    setIsLoading(false);
  }, [checkInformation]);
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
  useEffect(() => {
    if (Object.keys(teamByHostInformation).length !== 0) {
      setFilterOption(teamByHostInformation.data);
      if (selectStateFilter === "" && teamByHostInformation.data.length !== 0) {
        setSelectStateFilter(teamByHostInformation.data[0].Team_id);
      }
    }
  }, [teamByHostInformation]);

  useEffect(() => {
    if (selectStateFilter && selectStateFilter !== "") {
      dispatch(getMemberInformation("", "", String(selectStateFilter)));
      setSelectState({});
      setResetTextField(true);
      dispatch(
        getCheckInformation(
          "",
          "",
          showType,
          String(selectState.id),
          moment(day).format("YYYY-MM-DD")
        )
      );
    }
  }, [selectStateFilter]);

  const handleChangeSelect = (event) => {
    setSelectStateFilter(event.target.value);
    setSelectState([]);
  };
  const handleClick = () => {
    if (Object.keys(selectState).length !== 0) {
      dispatch(
        getCheckInformation(
          "",
          "",
          showType,
          String(selectState.id),
          moment(day).format("YYYY-MM-DD")
        )
      );
    }
  };
  const setMember = () => {
    members = [];
    if (isManage) {
      if (Object.keys(memberInformation).length !== 0) {
        memberInformation.data.map((item, index) => {
          members.push({
            id: parseInt(item.id),
            text: item.Name,
          });
        });
      }
    } else {
      if (Object.keys(empInformation).length !== 0) {
        empInformation.data.map((item, index) => {
          members.push({
            id: parseInt(item.Emp_id),
            text: item.Name,
          });
        });
      }
    }
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
        console.log(item);
        Info[index].Date = moment(item.Check_in).format(" MMMM Do YYYY");
        Info[index].id = item.CheckId;
      });
      Info.reverse();
    }
  };

  setDataGrid();
  setMember();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={isManage ? 7 : 9} sm={6} md={5}>
            {selectStateFilter === "" ||
            Object.keys(memberInformation).length !== 0 ? (
              <div>
                <AutoComplete
                  size="small"
                  option={members}
                  selectState={selectState}
                  setSelectState={setSelectState}
                  setResetTextField={setResetTextField}
                  defaultValue={false}
                  multiple={false}
                  resetTextField={resetTextField}
                  style={{ backgroundColor: "white", width: "100%" }}
                />
                <FormHelperText className={classes.helpText}>
                  Select a Employee name to review Check-in and Check-out.{" "}
                </FormHelperText>
              </div>
            ) : (
              ""
            )}
          </Grid>
          {isManage ? (
            <Grid item xs={3} sm={4} md={2}>
              <Select
                value={selectStateFilter}
                onChange={handleChangeSelect}
                displayEmpty
                size="small"
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  backgroundColor: "white",
                  minWidth: "100px",
                  width: "100%",
                }}
                placeholder="Your have no team."
              >
                {Object.keys(teamByHostInformation).length !== 0 ? (
                  teamByHostInformation.data.length !== 0 ? (
                    filterOption.map((item) => {
                      return (
                        <MenuItem value={item.Team_id} key={item.Team_id}>
                          {item.Teamname}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem disabled value="">
                      <em>Your have no team.</em>
                    </MenuItem>
                  )
                ) : (
                  ""
                )}
              </Select>
              <FormHelperText className={classes.helpText}>
                Select a Team.{" "}
              </FormHelperText>
            </Grid>
          ) : (
            ""
          )}
          <Grid item xs={isManage ? 2 : 3} sm={2} md={1}>
            <Button
              variant="contained"
              endIcon={<SearchIcon />}
              style={{
                height: "40px",
                width: "100%",
              }}
              color="secondary"
              onClick={handleClick}
            >
              {"GO"}
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.gridNone}>
            <Divider className={classes.divider0} />
          </Grid>
          <Grid item xs={12} sm={7} style={{ width: "100%" }}>
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
                  This day is holiday
                </Typography>
              ) : (
                ""
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={5} style={{ width: "100%" }}>
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
              rowsPerPageOptions={[10, 20, 50]}
              pagination
              loading={isLoading}
              className={classes.datagrid}
              disableSelectionOnClick
              headers={Header ? Header : ""}
              rows={Info ? Info : ""}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default CardCheckIn_CheckOut_View;
