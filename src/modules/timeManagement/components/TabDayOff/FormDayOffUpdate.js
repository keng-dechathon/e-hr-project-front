import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-final-form-hooks";
import Button from "../../../common/Button";
import { makeStyles } from "@material-ui/core/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DialogActions from "@mui/material/DialogActions";
import { getDayOffInformation } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import Snackbar from "../../../layout/components/Snackbar";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";
import { updateDayOff } from "../../actions";

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

const FormDayOffUpdate = (props) => {
  const classes = useStyles();
  const { handleClose, id} = props;

  const dispatch = useDispatch();
  const { dayOffInformation } = useSelector((state) => state.timeReducer);

  const item =
    Object.keys(dayOffInformation).length !== 0 
      ? dayOffInformation.data.filter((value) => value.Emp_id === id)
      : "";
  const [name, setName] = useState(
    item.length !== 0 ? (item[0].Name ? item[0].Name : "") : ""
  );

  const [timeoff, setTimeoff] = useState(
    item.length !== 0 ? (item[0].Hour ? item[0].Hour: "") : ""
  );
  const [user, setUser] = useState("");

  useEffect(() => {
    setTimeout(() =>
      setUser({
        Emp_id: id,
        Hours: parseInt(timeoff).toString(),
      })
    );
  }, [id,timeoff]);

  const onSubmit = async () => {
    await updateDayOff(user);
    dispatch(getDayOffInformation());
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
                setName(e);
              }}
              fullWidth
              disabled={true}
            />
          </Grid>
           <Grid item xs={12}>
            <InputLabel>Hours</InputLabel>
            <TextField
              id="timeoff"
              name="timeoff"
              required
              defaultValue={timeoff}
              onChange={(e) => {
                setTimeoff(e.target.value);
              }}
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
    </LocalizationProvider>
  );
};

export default FormDayOffUpdate;
