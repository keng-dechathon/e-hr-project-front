import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-final-form-hooks";
import Button from "../../../common/Button";
import { makeStyles } from "@material-ui/core/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import { addHoliday } from "../../actions";
import TimePicker from "@mui/lab/TimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import DialogActions from "@mui/material/DialogActions";
import { getWorkingTimeInformation } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import Snackbar from "../../../layout/components/Snackbar";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";
import { updateWorkingTime } from "../../actions";
import { Box } from "@mui/system";

const useStyles = makeStyles(() => ({
  ButtonSubmit: {
    background: "#04AA6D",
    color: "#FFFFFF",
    "&:hover": {
      background: "#04AA6D",
      opacity: "0.8",
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

const FormWorkingTimeUpdate = (props) => {
  const classes = useStyles();
  const { handleClose, id, option } = props;

  const dispatch = useDispatch();
  const { workingTimeInformation } = useSelector((state) => state.timeReducer);

  useEffect(() => {
    dispatch(getWorkingTimeInformation());
  }, []);

  const item =
    Object.keys(workingTimeInformation).length !== 0 && option != "add"
      ? workingTimeInformation.data.filter((value) => value.Day_Name === id)
      : "";
  const [name, setName] = useState(
    item.length !== 0 ? (item[0].Day_Name ? item[0].Day_Name : "") : ""
  );
  const [start, setStart] = useState(
    item.length !== 0
      ? item[0].start_work
        ? new Date(
            `2014-08-18T${moment(item[0].start_work, "h:mm:ss A").format(
              "HH:mm:ss"
            )}`
          )
        : ""
      : ""
  );
  const [end, setEnd] = useState(
    item.length !== 0
      ? item[0].off_work
        ? new Date(
            `2014-08-18T${moment(item[0].off_work, "h:mm:ss A").format(
              "HH:mm:ss"
            )}`
          )
        : ""
      : ""
  );
  const [user, setUser] = useState("");

  useEffect(() => {
    setTimeout(() =>
      setUser({
        Day_Name: name,
        start_work: moment(start).format("HH:mm:ss"),
        off_work: moment(end).format("HH:mm:ss"),
      })
    );
    // console.log(new Date(`2014-08-18T${moment(start,"h:mm:ss A").format('HH:mm:ss')}`));
  }, [name, start, end]);

  const onSubmit = async () => {
    if (option === "update") await updateWorkingTime(user);
    else if (option === "add") await addHoliday(user);
    dispatch(getWorkingTimeInformation());
    handleClose();
  };

  const { handleSubmit, submitting } = useForm({
    onSubmit: onSubmit,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel>Name *</InputLabel>
            <TextField
              id="name"
              name="name"
              required
              defaultValue={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              fullWidth
              disabled={true}
            />
          </Grid>
          <Grid item xs={6} style={{ width: "100%" }}>
            <InputLabel>Start Date *</InputLabel>
            <TimePicker
              value={start}
              ampm={false}

              onChange={(e) => {
                setStart(e);
              }}
              renderInput={(params) => (
                <TextField required {...params} style={{ width: "100%" }} />
              )}
            />
          </Grid>
          <Grid item xs={6} style={{ width: "100%" }}>
            <InputLabel>End Date *</InputLabel>
            <TimePicker
              value={end}
              ampm={false}
              onChange={(e) => {
                setEnd(e);
              }}
              renderInput={(params) => (
                <TextField required {...params} style={{ width: "100%" }} />
              )}
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
            Update
          </Button>
        </DialogActions>
        <Snackbar />
      </form>
    </LocalizationProvider>
  );
};

export default FormWorkingTimeUpdate;
