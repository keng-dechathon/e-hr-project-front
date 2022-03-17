import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import DataGrid from "../../common/DataGridTimeSheet";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
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
import moment from "moment";
import { InputLabel } from "@mui/material";
import { getMemberInformation } from "../../team/actions";
import { getDateFormat } from "../../../utils/miscellaneous";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
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
  dateButton: {},
}));

const CardCheckIn_CheckOut_View = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { teamByHostInformation } = useSelector(
    (state) => state.timeSheetViewerReducer
  );
  const { memberInformation } = useSelector((state) => state.teamReducer);
  const { holidaysInformation } = useSelector((state) => state.timeReducer);
  const { checkInformation } = useSelector(
    (state) => state.checkin_checkoutReducer
  );
  const { accountInformation } = useSelector((state) => state.accountReducer);

  useEffect(() => {
    dispatch(getTeamByHostInformation());
    dispatch(getHolidaysInformation());
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

  const members = [];
  let Header = headers;
  let Info = [];

  useEffect(() => {
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
    if (Object.keys(memberInformation).length !== 0) {
      memberInformation.data.map((item, index) => {
        members.push({
          id: parseInt(item.id),
          text: item.Name,
        });
      });
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
        <div
          style={{
            display: "inline-block !important",
            position: "relative !important",
            width: "100%",
            height: "40px",
            marginBottom: "30px",
            justifyContent: "flex-start",
          }}
        >
          <Stack direction="row" spacing={2}>
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
                  style={{ backgroundColor: "white", minWidth: "400px" }}
                />
                <FormHelperText>
                  Select a Employee name to review Timesheet.{" "}
                </FormHelperText>
              </div>
            ) : (
              ""
            )}

            <div>
              <Select
                value={selectStateFilter}
                onChange={handleChangeSelect}
                displayEmpty
                size="small"
                inputProps={{ "aria-label": "Without label" }}
                style={{ backgroundColor: "white", minWidth: "100px" }}
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
            </div>
            <Button
              variant="contained"
              endIcon={<SearchIcon />}
              style={{ height: "40px" }}
              color="secondary"
              onClick={handleClick}
            >
              GO
            </Button>
          </Stack>
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box className={classes.box}>
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
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
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
                <Stack
                  direction="row"
                  spacing={1}
                  className={classes.ButtonAdd}
                >
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
      </Box>
    </LocalizationProvider>
  );
};

export default CardCheckIn_CheckOut_View;
