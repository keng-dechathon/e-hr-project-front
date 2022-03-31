import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { getEmployeeInformtion } from "../../../employeeInfomation/actions";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";

import {
  getMeetingRoomInformation,
  getMeetingInformationByCreator,
} from "../../actions";
import moment from "moment";
import LinearProgress from "@mui/material/LinearProgress";
import SchedulerMeeting from "./SchedulerMeeting";
const useStyles = makeStyles(() => ({}));

const CardMeetingEdit = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { meetingRoomInformation, meetingInformationByCreator } = useSelector(
    (state) => state.meetReducer
  );
  const { accountInformation } = useSelector((state) => state.accountReducer);
  const { empInformation } = useSelector((state) => state.employeeReducer);
  const uid = accountInformation.Emp_id ? accountInformation.Emp_id : "";

  const meetRoom = [],
    members = [];
  let allMeet = [];

  useEffect(() => {
    // dispatch(getMeetingInformationByRoomId())
    dispatch(getEmployeeInformtion());
    dispatch(getMeetingRoomInformation());
    dispatch(getMeetingInformationByCreator());
  }, []);

  useEffect(() => {
    setAllMeet();
  }, [meetingInformationByCreator.data]);

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
    let i = 0;
    if (Object.keys(meetingInformationByCreator).length !== 0) {
      Object.keys(meetingInformationByCreator.data).map(function (key) {
        meetingInformationByCreator.data[key].map((item) => {
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

          let members = item.Members.map((n) => parseInt(n));
          allMeet[i] = {
            id: item.Meet_Id,
            roomId: item.Room_Id,
            title: item.Subject,
            startDate: new Date(year, month, day, hourStart, minStart),
            endDate: new Date(year, month, day, hourEnd, minEnd),
            location: location,
            members: members,
            creator: item.Creator,
            Description: item.Description,
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
      });
    }
  };
  setMember();
  setMeetRoom();
  setAllMeet();
  return (
    <>
      <Box>
        <div style={{ marginTop: "10px" }} />
        {meetRoom.length !== 0 && members.length !== 0 && uid !== "" ? (
          <SchedulerMeeting
            meetRoom={meetRoom}
            myMeeting={allMeet}
            members={members}
            uid={uid}
          />
        ) : (
          <LinearProgress color="secondary" />
        )}
      </Box>
    </>
  );
};

export default CardMeetingEdit;
