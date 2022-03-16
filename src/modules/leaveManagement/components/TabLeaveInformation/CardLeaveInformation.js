import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import DataGrid from "../../../common/DataGrid";

import SearchIcon from "@mui/icons-material/Search";

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
const useStyles = makeStyles(() => ({
  ButtonAdd: {
    display: "flex",
  },
  box: {
    marginTop: "20px",
    paddingTop:"10px",
  },
  cardcontant: {
    padding: 0,
    "&:last-child": {
      paddingBottom: "0 !important",
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

  useEffect(() => {
    dispatch(getLeaveManagementInformation());
    dispatch(getTeamByHostInformation());
  }, []);

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
  const members = [];

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
    if (selectStateFilter && selectStateFilter !== "") {
      dispatch(getMemberInformation("", "", String(selectStateFilter)));
      setSelectState({});
      setResetTextField(true);
      dispatch(getLeaveInformationByID("", "", String(selectState.id)));
    }
  }, [selectStateFilter]);

  const handleClick = () => {
    if (Object.keys(selectState).length !== 0) {
      dispatch(getLeaveInformationByID("", "",  String(selectState.id)));
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
        <Box
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
        </Box>
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
      </Box>
    </>
  );
};

export default CardLeaveInformation;
