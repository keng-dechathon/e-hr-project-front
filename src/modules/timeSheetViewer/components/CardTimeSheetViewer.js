import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import DataGrid from "../../common/DataGridTimeSheet";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import CardTimeSheet from "./CardTimeSheet";
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
import { getTimeSheetById } from "../actions";
import { getMemberInformation } from "../../team/actions";
import { getDateFormat } from "../../../utils/miscellaneous";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { getTeamByHostInformation } from "../actions";
import { Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText } from "@mui/material";
import AutoComplete from "../../common/AutoComplete";
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
  dateButton: {},
}));

const CardTimeSheetViewer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { teamByHostInformation } = useSelector(
    (state) => state.timeSheetViewerReducer
  );
  const { memberInformation } = useSelector((state) => state.teamReducer);

  useEffect(() => {
    dispatch(getTeamByHostInformation());
  }, []);

  const [selectState, setSelectState] = React.useState({});
  const [selectStateFilter, setSelectStateFilter] = React.useState("");
  const [filterOption, setFilterOption] = React.useState([]);
  const [resetTextField, setResetTextField] = React.useState(false);
  const members = [];

  useEffect(() => {
    if (Object.keys(teamByHostInformation).length !== 0) {
      setFilterOption(teamByHostInformation.data);
      if (selectStateFilter === "") {
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
        getTimeSheetById(
          "",
          "",
          String(selectState.id),
          getDateFormat(new Date())
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
        getTimeSheetById(
          "",
          "",
          String(selectState.id),
          getDateFormat(new Date())
        )
      );
    }
  };
  console.log(selectState);
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
            {Object.keys(memberInformation).length !== 0 ? (
              <div>
                <AutoComplete
                  size="small"
                  option={members}
                  selectState={selectState}
                  setSelectState={setSelectState}
                  setResetTextField={setResetTextField}
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
                style={{ backgroundColor: "white" }}
              >
                {filterOption.map((item) => {
                  return (
                    <MenuItem value={item.Team_id} key={item.Team_id}>
                      {item.Teamname}
                    </MenuItem>
                  );
                })}
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

        <CardTimeSheet
          id={
            Object.keys(selectState).length !== 0 ? String(selectState.id) : ""
          }
        />
      </Box>
    </LocalizationProvider>
  );
};

export default CardTimeSheetViewer;
