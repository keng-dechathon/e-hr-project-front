import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@mui/material";

import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import CardTimeSheet from "./CardTimeSheet";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";

import { Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { getTimeSheetById } from "../actions";
import { getMemberInformation } from "../../team/actions";
import { getDateFormat } from "../../../utils/miscellaneous";

import { getTeamByHostInformation } from "../actions";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText } from "@mui/material";
import { Divider } from "@material-ui/core";
import AutoComplete from "../../common/AutoComplete";
const useStyles = makeStyles((theme) => ({
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
  helpText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "9px !important",
    },
  },
  divider0: {
    [theme.breakpoints.up("xs")]: {
      display: "none ",
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex ",
    },
  },
  gridNone: {
    [theme.breakpoints.up(900)]: {
      
      display:"none",
    },   
  },
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
  const [isLoading, setIsLoading] = useState(false);

  const members = [];

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
      setIsLoading(true);
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
        <Grid container spacing={2}>
          <Grid item xs={7} sm={6}  md={5}>
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
                  Select a Employee name to review Timesheet.{" "}
                </FormHelperText>
              </div>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={3} sm={4}  md={2}>
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
          <Grid item xs={2} sm={2} md={1}>
            <Button
              variant="contained"
              endIcon={<SearchIcon />}
              style={{ height: "40px", width: "100%" }}
              color="secondary"
              onClick={handleClick}
            >
              GO
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.gridNone}>
            <Divider className={classes.divider0} />
          </Grid>
          <Grid item xs={12} style={{ paddingTop: "13px" }}>
            <CardTimeSheet
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              id={
                Object.keys(selectState).length !== 0
                  ? String(selectState.id)
                  : ""
              }
            />
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default CardTimeSheetViewer;
