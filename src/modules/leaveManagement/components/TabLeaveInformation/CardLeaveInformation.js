import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import DataGrid from "../../../common/DataGrid";

import SearchIcon from "@mui/icons-material/Search";
import { Grid } from "@mui/material";

import { Button } from "@mui/material";
import { getLeaveManagementInformation } from "../../actions";
import { headers } from "./headers";
import { getLeaveAmount } from "../../../../utils/miscellaneous";
import moment from "moment";
import { Select } from "@mui/material";
import { getTeamByHostInformation } from "../../../timeSheetViewer/actions";
import { Stack } from "@mui/material";
import AutoComplete from "../../../common/AutoComplete";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText } from "@mui/material";
import { getMemberInformation } from "../../../team/actions";
import { getLeaveInformationByID } from "../../../leaveRequest/actions";
import { getEmployeeInformtion } from "../../../employeeInfomation/actions";
const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: "25px",
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

const CardLeaveInformation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { leaveManagementInformation } = useSelector(
    (state) => state.leaveManagementReducer
  );
  const { teamByHostInformation } = useSelector(
    (state) => state.timeSheetViewerReducer
  );
  const { memberInformation } = useSelector((state) => state.teamReducer);
  const { leaveInformationByID } = useSelector((state) => state.leaveReducer);
  const { accountInformation } = useSelector((state) => state.accountReducer);
  const { empInformation } = useSelector((state) => state.employeeReducer);
  useEffect(() => {
    dispatch(getLeaveManagementInformation());
    dispatch(getTeamByHostInformation());
    dispatch(getEmployeeInformtion());

  }, []);
  const [isManage, setIsManage] = useState(false);

  const [selectState, setSelectState] = React.useState({});
  const [selectStateFilter, setSelectStateFilter] = React.useState("");
  const [filterOption, setFilterOption] = React.useState([]);
  const [resetTextField, setResetTextField] = React.useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchInfo, setSearchInfo] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [sortModel, setSortModel] = useState([
    {
      field: "ID",
      sort: "desc",
    },
  ]);
  console.log(selectState);
  let Header = headers;
  let Info = [];
  let members = [];

  const handleChangeSelect = (event) => {
    setSelectStateFilter(event.target.value);
    setSelectState([]);
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
    if (selectStateFilter && selectStateFilter !== "") {
      dispatch(getMemberInformation("", "", String(selectStateFilter)));
      setSelectState({});
      setResetTextField(true);
      dispatch(getLeaveInformationByID("", "", String(selectState.id)));
    }
  }, [selectStateFilter]);

  const handleClick = () => {
    if (Object.keys(selectState).length !== 0) {
      dispatch(getLeaveInformationByID("", "", String(selectState.id)));
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

  setMember();

  const setDataGrid = () => {
    if (Object.keys(leaveInformationByID).length !== 0) {
      leaveInformationByID.Leave_request.data.map((item, index) => {
        let timeDiff = moment.duration(moment(item.End).diff(item.Begin));
        let hours = Math.floor(timeDiff.asSeconds() / 3600);
        let min = Math.floor((timeDiff.asSeconds() - hours * 3600) / 60);
        Info.push(item);
        console.log(timeDiff);
        Info[index].id = item.id;
        // Info[index].Amount = getLeaveAmount(hours, min);
      });
      Info.reverse();
    }
  };
  setDataGrid();
  return (
    <>
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
                  placeholder="Employee name."
                  style={{ backgroundColor: "white", width: "100%" }}
                />
                <FormHelperText className={classes.helpText}>
                  Select a Employee name to review Leave.{" "}
                </FormHelperText>
              </div>
            ) : (
              ""
            )}
          </Grid>
          {isManage ? (
            <Grid item xs={3} sm={4} md={2}>
              <div>
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
              </div>
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
              search
            </Button>
          </Grid>
          <Grid item xs={12} style={{ width: "100%" }}>
            <DataGrid
              sortingOrder={["desc", "asc"]}
              sortModel={sortModel}
              onSortModelChange={(model) =>
                Info.length !== 0 ? setSortModel(model) : ""
              }
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20, 50]}
              pagination
              disableSelectionOnClick
              className={classes.datagrid}
              headers={Header ? Header : ""}
              rows={searchText ? searchInfo : Info ? Info : ""}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CardLeaveInformation;
