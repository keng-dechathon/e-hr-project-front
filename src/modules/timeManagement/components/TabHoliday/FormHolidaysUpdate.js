import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-final-form-hooks";
import Button from "../../../common/Button";
import { makeStyles } from "@material-ui/core/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import { addHoliday } from "../../actions";
import { updateHoliday } from "../../actions";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import DialogActions from "@mui/material/DialogActions";
import { getHolidaysInformation } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import Snackbar from "../../../layout/components/Snackbar";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";

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

const FormHolidaysUpdate = (props) => {
  const classes = useStyles();
  const { handleClose, id, option } = props;

  const dispatch = useDispatch();
  const { holidaysInformation } = useSelector((state) => state.timeReducer);

  useEffect(() => {
    dispatch(getHolidaysInformation());
  }, []);

  const item =
    Object.keys(holidaysInformation).length !== 0 && option != "add"
      ? holidaysInformation.data.filter((value) => value.ID === id)
      : "";
  const [holidayID, setHolidayID] = useState(
    item.length !== 0 ? (item[0].ID ? item[0].ID : "") : ""
  );
  const [name, setName] = useState(
    item.length !== 0 ? (item[0].Holiday_Name ? item[0].Holiday_Name : "") : ""
  );
  const [start, setStart] = useState(
    item.length !== 0
      ? item[0].Start
        ? new Date(moment(item[0].Start).format())
        : moment().format()
      : moment().format()
  );
  const [end, setEnd] = useState(
    item.length !== 0
      ? item[0].End
        ? new Date(moment(item[0].End).format())
        : moment().format()
      : moment().format()
  );
  const [user, setUser] = useState("");

  useEffect(() => {
    setTimeout(() =>
      setUser({
        ID: holidayID,
        Holiday_Name: name,
        begin_date: moment(start).format("yyyy-MM-DD"),
        end_date: moment(end).format("yyyy-MM-DD"),
      })
    );
  }, [holidayID, name, start, end]);

  const onSubmit = async () => {
    if (option === "update") await updateHoliday(user);
    else if (option === "add") await addHoliday(user);
    dispatch(getHolidaysInformation());
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
            />
          </Grid>

          <Grid item xs={6} style={{ width: "100%" }}>
            <InputLabel>Start Date *</InputLabel>
            <DesktopDatePicker
              inputFormat="dd/MM/yyyy"
              value={start}
              onChange={(e) => {
                setStart(new Date(moment(e).format()));
              }}
              renderInput={(params) => (
                <TextField required {...params} style={{ width: "100%" }} />
              )}
            />
          </Grid>
          {/* <Box sx={{ mx: 3 }} className={classes.center} > to </Box> */}
          <Grid item xs={6} style={{ width: "100%" }}>
            <InputLabel>End Date *</InputLabel>
            <DesktopDatePicker
              inputFormat="dd/MM/yyyy"
              value={end}
              onChange={(e) => {
                setEnd(new Date(moment(e).format()));
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

export default FormHolidaysUpdate;
