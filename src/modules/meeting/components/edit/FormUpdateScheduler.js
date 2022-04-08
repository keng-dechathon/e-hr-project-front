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
import ForceUpdateDialog from "./ForceUpdateDialog";
import { clearAddState } from "../../actions";
import { forceAddMeeting } from "../../actions";
import { editMeeting } from "../../actions";
import { updateSubmitting } from "../../actions";
const useStyles = makeStyles(() => ({
  ButtonSubmit: {
    background: "#04AA6D",
    color: "#FFFFFF",
    "&:hover": {
      background: "#ffa000",
    },
  },
  ButtonSubmitForce: {
    background: "#FF5959",
    color: "#FFFFFF",
    "&:hover": {
      background: "#FF7272",
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
  const { handleClose, data, option, meetRoom, members } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  console.log(data);
  const membersFormat = [];
  const { addState } = useSelector((state) => state.meetReducer);
  const [openForceUpdate, setOpenForceUpdate] = useState(false);
  const [attentioned, setAttentioned] = useState(false);
  const [status, setStatus] = useState(false);
  const [selectStateMeetRoom, setSelectStateMeetRoom] = React.useState(
    data.length !== 0
      ? meetRoom.filter((item) => item.id === data.roomId)[0]
      : ""
  );
  const [selectStateMembers, setSelectStateMembers] = React.useState(
    data.length !== 0
      ? data.members.map((id) => {
          return members.filter((item) => id === item.id)[0];
        })
      : []
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
    setTimeout(() => {
      setUser({
        members: selectStateMembers.map((item) => String(item.id)),
        Date: moment(start).format("YYYY-MM-DD"),
        Start_at: moment(start).format("HH:mm:ss"),
        End_at: moment(end).format("HH:mm:ss"),
        Room_Id: String(selectStateMeetRoom.id),
        Subject: title,
        Description: note,
        Meeting_id: String(data.id),
      });
    });
  }, [selectStateMembers, start, end, selectStateMeetRoom, title, note]);


  useEffect(() => {
    if (
      Object.keys(addState).length === 0 &&
      Object.getPrototypeOf(addState) === Object.prototype
    ) {
      setOpenForceUpdate(false);
    } else {
      setOpenForceUpdate(true);
    }
    if (status === true) handleClose();
  }, [addState, status]);

  const onSubmit = async () => {
    if (!attentioned) {
      if (option === "update") {
        await editMeeting(user, setStatus);
      } else if (option === "add") {
        await addMeeting(user, setStatus);
      }
    } else {
      if (option === "update") {
        await editMeeting(user, setStatus);
      } else if (option === "add") {
        await forceAddMeeting(user, setStatus);
      }
    }
    dispatch(getMeetingInformationByCreator());
  };
  const handleCloseForceUpdate = () => {
    setAttentioned(true);
    setOpenForceUpdate(false);
    clearAddState();
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

  const { handleSubmit, submitting } = useForm({
    onSubmit: onSubmit,
  });
  useEffect(() => {
    dispatch(updateSubmitting(submitting))
  }, [submitting]);
  setMembersFormat();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ForceUpdateDialog
        open={openForceUpdate}
        handleClose={handleCloseForceUpdate}
        user={user}
      />
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
              inputFormat="dd/MM/yyyy HH:mm "
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
              inputFormat="dd/MM/yyyy HH:mm"
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
                defaultValue={selectStateMeetRoom}
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
                defaultValue={selectStateMembers}
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
          <Button onClick={!submitting ? handleClose : ""}>Cancel</Button>
          <Button
            loading={submitting}
            variant={"contained"}
            className={
              attentioned && option !== "update"
                ? classes.ButtonSubmitForce
                : classes.ButtonSubmit
            }
            type="submit"
            autoFocus
          >
            {attentioned && option !== "update" ? "Force Update!" : "Update"}
          </Button>
        </DialogActions>
      </form>
    </LocalizationProvider>
  );
};

export default FormUpdateScheduler;
