import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { getEmployeeInformtion } from "../../../employeeInfomation/actions";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import AutocompleteEmpty from "@mui/material/Autocomplete";

import {
  getMeetingRoomInformation,
  getMeetingInformationByMultiId,
  getMeetingInformationByRoomId,
} from "../../actions";
import { Grid } from "@mui/material";
import moment from "moment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import AutoComplete from "../../../common/AutoCompleteMeeting/AutoCompleteMeeting";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import ScedulerMeetingFunc from "./ScedulerMeetingFunc";
import LinearProgress from "@mui/material/LinearProgress";
import FaceIcon from "@mui/icons-material/Face";
import { TextField } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  helpText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "9px !important",
    },
  },

  gridItem: {
    paddingLeft: "10px !important",
  },
  lastGridItem: {
    paddingLeft: "10px !important",
    [theme.breakpoints.down("957px")]: {
      paddingTop: "10px !important",
    },
  },
}));

const CardMeeting = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    meetingRoomInformation,
    meetingInformationByMultiId,
    meetingInformationByRoomId,
  } = useSelector((state) => state.meetReducer);
  const { accountInformation } = useSelector((state) => state.accountReducer);
  const { empInformation } = useSelector((state) => state.employeeReducer);
  const uid = accountInformation.Emp_id ? accountInformation.Emp_id : "";
  const [selectState, setSelectState] = React.useState([]);
  const [selectStateFilter, setSelectStateFilter] = React.useState(1);
  const [resetStatus, setResetStatus] = React.useState(false);
  const meetRoom = [],
    members = [],
    memberOption = [];
  let allMeet = [];

  useEffect(() => {
    // dispatch(getMeetingInformationByRoomId())
    dispatch(getEmployeeInformtion());
    dispatch(getMeetingRoomInformation());
    dispatch(getMeetingInformationByMultiId("", "", [String(uid)]));
  }, [uid]);

  const filterOption = [
    { id: 1, text: "By Employee" },
    { id: 2, text: "By Room" },
  ];

  useEffect(() => {
    setAllMeet();
  }, [meetingInformationByMultiId.data]);

  const setMeetRoom = () => {
    if (Object.keys(meetingRoomInformation).length !== 0) {
      meetingRoomInformation.data.map((item, index) => {
        meetRoom.push({
          id: item.Room_Id,
          text: item.Room_Name,
          url: item.Description,
        });
      });
    }
  };

  const setAllMeet = () => {
    let i = 0,
      info = {};

    if (selectStateFilter === 1) info = meetingInformationByMultiId;
    else if (selectStateFilter === 2) info = meetingInformationByRoomId;

    if (Object.keys(info).length !== 0) {
      Object.keys(info.data).map(function (key, index) {
        info.data[key].map((item, index2) => {
          let day = moment(item.Date).format("DD");
          let month = moment(item.Date).format("MM") - 1;
          let year = moment(item.Date).format("YYYY");
          let hourStart = moment(item.Start_at, ["h:mm A"]).format("HH");
          let minStart = moment(item.Start_at, ["h:mm A"]).format("mm");
          let hourEnd = moment(item.End_at, ["h:mm A"]).format("HH");
          let minEnd = moment(item.End_at, ["h:mm A"]).format("mm");
          let location =
            Object.keys(meetingRoomInformation).length !== 0
              ? meetingRoomInformation.data.filter(
                  (room) => room.Room_Id === item.Room_Id
                )[0].Room_Name
              : "null";

          let members = [parseInt(key)]
            .concat(item.Members.map((n) => parseInt(n)))
            .filter(function (item, pos, self) {
              return self.indexOf(item) == pos;
            });

          allMeet[i] = {
            id: i,
            roomId: item.Room_Id,
            title: item.Subject,
            startDate: new Date(year, month, day, hourStart, minStart),
            endDate: new Date(year, month, day, hourEnd, minEnd),
            location: location,
            members: members,
            creator: item.Creator,
          };

          i += 1;
        });
      });
    }
  };

  const setMember = () => {
    if (Object.keys(empInformation).length !== 0) {
      empInformation.data.map((item, index) => {
        members.push({
          id: parseInt(item.Emp_id),
          text: item.Name,
        });
        memberOption[index] = {};
        memberOption[index].id = item.Emp_id;
        memberOption[index].text = item.Name;
      });
    }
  };

  const handleClick = () => {
    allMeet = [];
    if (selectState.length === 0 && uid && selectStateFilter === 1) {
      dispatch(getMeetingInformationByMultiId("", "", [String(uid)]));
      setResetStatus(true);
    } else {
      if (selectStateFilter === 1)
        dispatch(getMeetingInformationByMultiId("", "", selectState));
      else if (selectStateFilter === 2)
        dispatch(getMeetingInformationByRoomId("", "", selectState));
    }

    setAllMeet();
  };

  const handleClickReset = () => {
    allMeet = [];
    dispatch(getMeetingInformationByMultiId("", "", [String(uid)]));
    setSelectStateFilter(1);
    setResetStatus(true);
    setAllMeet();
  };

  const handleChangeSelect = (event) => {
    setSelectStateFilter(event.target.value);
    setSelectState([]);
  };

  setMember();
  setMeetRoom();
  setAllMeet();

  return (
    <>
      <Box>
        <Grid
          container
          spacing={0}
          className={classes.gridContainer}
          style={{ width: "100%" }}
        >
          <Grid item xs={7} sm={5} md={5}>
            {memberOption.length !== 0 ? (
              <div>
                <AutoComplete
                  size="small"
                  option={
                    selectStateFilter === 1
                      ? memberOption
                      : selectStateFilter === 2
                      ? meetRoom
                      : ""
                  }
                  selectState={selectState}
                  setSelectState={setSelectState}
                  style={{ backgroundColor: "white" }}
                  limit={selectStateFilter === 1 ? 9999 : 1}
                  resetStatus={resetStatus}
                  setResetStatus={setResetStatus}
                  selectStateFilter={selectStateFilter}
                  uid={uid}
                />
                <FormHelperText className={classes.helpText}>
                  Select a room or Employee name to review meetings.{" "}
                </FormHelperText>
              </div>
            ) : (
              <div>
                <AutocompleteEmpty
                  size="small"
                  id="checkboxes-tags-demo"
                  disableCloseOnSelect
                  style={{ backgroundColor: "white" }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            )}
          </Grid>
          <Grid item xs={3} sm={2} md={2} className={classes.gridItem}>
            <div>
              <Select
                value={selectStateFilter}
                onChange={handleChangeSelect}
                displayEmpty
                size="small"
                inputProps={{ "aria-label": "Without label" }}
                style={{ width: "100%", backgroundColor: "white" }}
              >
                {filterOption.map((item) => {
                  return (
                    <MenuItem value={item.id} key={item.id}>
                      {item.text}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText className={classes.helpText}>
                Select a option.{" "}
              </FormHelperText>
            </div>
          </Grid>
          <Grid item xs={1} sm={2} md={1} className={classes.gridItem}>
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
          <Grid item xs={12} sm={3} md={2} className={classes.lastGridItem}>
            <Button
              variant="outlined"
              endIcon={<FaceIcon />}
              style={{ height: "40px", width: "100%" }}
              color="secondary"
              onClick={handleClickReset}
            >
              Your Meeting
            </Button>
          </Grid>
        </Grid>
        <div style={{ marginTop: "15px" }}>
          {meetRoom.length !== 0 && members.length !== 0 && uid !== "" ? (
            <ScedulerMeetingFunc
              meetRoom={meetRoom}
              myMeeting={allMeet}
              members={members}
              uid={uid}
              filter={selectStateFilter}
            />
          ) : selectStateFilter === 1 ? (
            <LinearProgress color="secondary" />
          ) : (
            ""
          )}
        </div>
      </Box>
    </>
  );
};

export default CardMeeting;
