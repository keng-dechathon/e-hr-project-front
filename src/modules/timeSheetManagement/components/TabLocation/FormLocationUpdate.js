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
import { addLocation } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import Snackbar from "../../../layout/components/Snackbar";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";
import { getLocation, updateLocation } from "../../actions";
import { Box } from "@mui/system";

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

const FormLocationUpdate = (props) => {
  const classes = useStyles();
  const { handleClose, id, option } = props;

  const dispatch = useDispatch();
  const { locationInformation } = useSelector(
    (state) => state.timeSheetMngReducer
  );
  useEffect(() => {
    dispatch(getLocation());
  }, []);

  const item =
    Object.keys(locationInformation).length !== 0 && option != "add"
      ? locationInformation.data.filter((value) => value.Location_id === id)
      : "";

  const [name, setName] = useState(
    item.length !== 0
      ? item[0].Location_Name
        ? item[0].Location_Name
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
        Location_Name: name,
        Description: noted,
        Location_id: String(id),
      })
    );
  }, [name, noted]);

  const onSubmit = async () => {
    console.log(option);
    if (option === "update") {
      await updateLocation(user);
    } else if (option === "add") {
      await addLocation(user);
    }
    dispatch(getLocation());
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
            onChange={(e) => {
              setName(e.target.value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} style={{width:"100%"}}>
          <InputLabel>Noted</InputLabel>
          <TextField
            id="noted"
            name="noted"
            defaultValue={noted}
            onChange={(e) => {
              setNoted(e.target.value);
            }}
            required
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

export default FormLocationUpdate;
