import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-final-form-hooks";
import Button from "../../../common/Button";
import { makeStyles } from "@material-ui/core/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import TimePicker from "@mui/lab/TimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import DialogActions from "@mui/material/DialogActions";
import { addMeetingRoom } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import Snackbar from "../../../layout/components/Snackbar";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";
import {  updateMeetingRoom } from "../../actions";
import { Box } from "@mui/system";
import { getMeetingRoomInformation } from "../../actions";

const useStyles = makeStyles(() => ({
  ButtonSubmit: {
    background: "#04AA6D",
    color: "#FFFFFF",
    "&:hover": {
      background: "#04AA6D",
      opacity:"0.8",
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
const FormRoomManagement = (props) => {
  const classes = useStyles();
  const { handleClose, id, option } = props;

  const dispatch = useDispatch();
  const {
    meetingRoomInformation
  } = useSelector((state) => state.meetReducer);


  const item =
    Object.keys(meetingRoomInformation).length !== 0 && option != "add"
      ? meetingRoomInformation.data.filter((value) => value.Room_Id === id)
      : "";

  const [name, setName] = useState(
    item.length !== 0
      ? item[0].Room_Name
        ? item[0].Room_Name
        : ""
      : ""
  );

  const [noted, setNoted] = useState(
    item.length !== 0 ? (item[0].Description ? item[0].Description : "") : ""
  );

  const [user, setUser] = useState("");

  useEffect(() => {
    setTimeout(() =>
      setUser({
        Room_Name: name,
        description: noted,
        Room_Id: String(id),
      })
    );
  }, [name, noted]);

  const onSubmit = async () => {
    if (option === "update") {
      await updateMeetingRoom(user);
    } else if (option === "add") {
      await addMeetingRoom(user);
    }
    dispatch(getMeetingRoomInformation());
    handleClose();
  };

  const { handleSubmit, submitting } = useForm({
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputLabel>Name *</InputLabel>
          <TextField
            id="name"
            name="name"
            required={true}
            defaultValue={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} style={{width:"100%"}}>
          <InputLabel>URL</InputLabel>
          <TextField
            id="noted"
            name="noted"
            defaultValue={noted}
            onChange={(e) => {
              setNoted(e.target.value);
            }}
            required={true}
            fullWidth
            multiline
            rows={3}
            rowsMax={4}
          />
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
          {option === "add" ? "ADD + " : "Update"}
        </Button>
      </DialogActions>
      <Snackbar />
    </form>
  );
};

export default FormRoomManagement;
