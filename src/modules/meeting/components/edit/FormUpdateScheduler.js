import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-final-form-hooks";
import Button from "../../../common/Button";
import { makeStyles } from "@material-ui/core/styles";
import { DialogActions } from "@mui/material";
import { addMeeting } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Box } from "@mui/system";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import moment from "moment";
import AutoComplete from "../../../common/AutoComplete";
import { getMeetingInformationByCreator } from "../../actions";

const useStyles = makeStyles(() => ({
  ButtonSubmit: {
    background: "#04AA6D",
    color: "#FFFFFF",
    "&:hover": {
      background: "#ffa000",
    },
  },
  dialogAction: {
    marginTop: "10px",
    paddingRight: "0 !important",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
}));

const FormUpdateScheduler = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { handleClose, data, option, meetRoom, members } = props;
console.log(data);
  const membersFormat = [];
  const [selectStateMeetRoom, setSelectStateMeetRoom] = React.useState(
    data.length !== 0 ? data.roomId : ""
  );
  const [selectStateMembers, setSelectStateMembers] = React.useState(
    data.length !== 0 ? data.members : []
  );
  const [title, setTitle] = useState(
    data.length !== 0 ? (data.title ? data.title : "") : ""
  );
  const [note, setNote] = useState(
    data.length !== 0 ? (data.Description ? data.Description : "") : ""
  );
  const [start, setStart] = useState(
    data.length !== 0
      ? data.startDate
        ? data.startDate
        : new Date()
      : new Date()
  );
  const [end, setEnd] = useState(
    data.length !== 0 ? (data.endDate ? data.endDate : new Date()) : new Date()
  );
  const [user, setUser] = useState("");
  useEffect(() => {
    setTimeout(() =>
      setUser({
        members: selectStateMembers.map(id=>String(id)),
        Date: moment(start).format("YYYY-MM-DD"),
        Start_at: moment(start).format("HH:mm:ss"),
        End_at: moment(end).format("HH:mm:ss"),
        Room_Id: String(selectStateMeetRoom) ,
        Subject: title,
        Description: note,
      })
    );
  }, [selectStateMembers, start, end, selectStateMeetRoom, title, note]);

  const onSubmit = async () => {
    if (option === "update") {
    } else if (option === "add") {
      await addMeeting(user);
    }
    dispatch(getMeetingInformationByCreator());

    handleClose();
  };

  const setMembersFormat = () => {
    if (
      selectStateMembers.length !== 0 &&
      members.length !== 0 &&
      option === "update"
    ) {
      selectStateMembers.map((id) => {
        membersFormat.push(members.filter((item) => id === item.id)[0]);
      });
    }
  };
console.log(membersFormat);
  const { handleSubmit, submitting } = useForm({
    onSubmit: onSubmit,
  });
  setMembersFormat();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              id="title"
              name="title"
              required
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} style={{ display: "flex" }}>
            <DateTimePicker
              value={start}
              inputFormat="dd/MM/yyyy hh:mm a"
              onChange={(e) => {
                setStart(new Date(moment(e).format()));
              }}
              disabled={option === "update" ? true : false}
              renderInput={(params) => (
                <TextField fullWidth {...params} label="Start" required />
              )}
            />
            <Box sx={{ mx: 2 }} className={classes.center}>
              {" "}
              to{" "}
            </Box>
            <DateTimePicker
              value={end}
              disabled={option === "update" ? true : false}
              inputFormat="dd/MM/yyyy hh:mm a"
              onChange={(e) => {
                setEnd(new Date(moment(e).format()));
              }}
              renderInput={(params) => (
                <TextField fullWidth {...params} label="End" required />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="More Information"
              id="note"
              name="note"
              multiline
              rows={4}
              defaultValue={note}
              onChange={(e) => setNote(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            {meetRoom.length !== 0 ? (
              <AutoComplete
                option={meetRoom}
                selectState={selectStateMeetRoom}
                required
                defaultValue={
                  meetRoom.filter((item) => item.id === selectStateMeetRoom)[0]
                }
                setSelectState={setSelectStateMeetRoom}
                multiple={false}
                style={{ backgroundColor: "white" }}
                label="Room"
              />
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12}>
            {members.length !== 0 && membersFormat ? (
              <AutoComplete
                option={members}
                selectState={selectStateMembers}
                defaultValue={membersFormat}
                setSelectState={setSelectStateMembers}
                style={{ backgroundColor: "white" }}
                label="Members"
                required
              />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <DialogActions className={classes.dialogAction}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            loading={submitting}
            variant={"contained"}
            className={classes.ButtonSubmit}
            type="submit"
            autoFocus
          >
            Update
          </Button>
        </DialogActions>
      </form>
    </LocalizationProvider>
  );
};

export default FormUpdateScheduler;
