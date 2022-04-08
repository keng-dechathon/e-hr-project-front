import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-final-form-hooks";
import Button from "../../common/Button";
import { makeStyles } from "@material-ui/core/styles";
import { DialogActions } from "@mui/material";

import { getLeaveTypeInformation } from "../actions";
import { updateLeaveType } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import Snackbar from "../../layout/components/Snackbar";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";
import { addLeaveType } from "../actions";
import { Box } from "@mui/system";

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

const FormLeaveTypeUpdate = (props) => {
  const classes = useStyles();
  const { handleClose, id, option } = props;

  const dispatch = useDispatch();
  const { leaveTypeInformation } = useSelector(
    (state) => state.leaveTypeReducer
  );

  const item =
    Object.keys(leaveTypeInformation).length !== 0 && option != "add"
      ? leaveTypeInformation.data.filter((value) => value.id === id)
      : "";
  const [name, setName] = useState(
    item.length !== 0 ? (item[0].Type_name ? item[0].Type_name : "") : ""
  );
  const [dayLeave, setDayLeave] = useState(
    item.length !== 0 ? (item[0].Num_per_year ? item[0].Num_per_year : "") : ""
  );
  const [dayAdd, setDayAdd] = useState(
    item.length !== 0 ? (item[0].Num_can_add ? item[0].Num_can_add : "") : ""
  );
  const [user, setUser] = useState("");

  useEffect(() => {
    setTimeout(() =>
      setUser({
        Type_ID: String(id),
        Type_name: String(name),
        Num_per_year: String(dayLeave),
        Num_can_add: String(dayAdd),
      })
    );
  }, [name, dayLeave, dayAdd]);

  const onSubmit = async () => {
    if (option === "update") {
      await updateLeaveType(user);
    } else if (option === "add") {
      await addLeaveType(user);
    }
    dispatch(getLeaveTypeInformation());
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
            required
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel>Number of days can leave </InputLabel>
          <TextField
            id="dayLeave"
            name="dayLeave"
            required
            defaultValue={dayLeave}
            onChange={(e) => setDayLeave(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel>Number of days can leave </InputLabel>
          <TextField
            id="dayAdd"
            name="dayAdd"
            required
            defaultValue={dayAdd}
            onChange={(e) => setDayAdd(e.target.value)}
            fullWidth
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
  );
};

export default FormLeaveTypeUpdate;
