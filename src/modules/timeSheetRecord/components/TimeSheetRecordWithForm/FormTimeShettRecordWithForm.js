import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-final-form-hooks";
import Button from "../../../common/Button";
import { makeStyles } from "@material-ui/core/styles";
import { DialogActions } from "@mui/material";
import { isNumber } from "../../../../utils/validate";
import { updateTimeSheet } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import Snackbar from "../../../layout/components/Snackbar";
import { Grid } from "@mui/material";
import { addTimeSheetWithForm } from "../../actions";
import moment from "moment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { pushSnackbarAction } from "../../../layout/actions";
import { getTimeSheetInformationByDate } from "../../actions";
import { getDateFormat } from "../../../../utils/miscellaneous";
import TimePicker from "@mui/lab/TimePicker";
import Box from "@mui/material/Box";

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

const FormTimeShettRecordWithForm = (props) => {
  const classes = useStyles();
  const { handleClose, id, option, day } = props;

  const dispatch = useDispatch();
  const { timesheetByDate } = useSelector((state) => state.timesheetReducer);
  const { locationInformation, chargeCodeInformation } = useSelector(
    (state) => state.timeSheetMngReducer
  );

  const item =
    Object.keys(timesheetByDate).length !== 0 && option != "add"
      ? timesheetByDate.data.filter((value) => value.Sheet_id === id)
      : "";

  const [date, setDate] = useState(
    item.length !== 0
      ? item[0].Date
        ? moment(item[0].Date).format("DD/MM/YYYY")
        : moment(day).format("DD/MM/YYYY")
      : moment(day).format("DD/MM/YYYY")
  );
  const [start, setStart] = useState(
    item.length !== 0
      ? item[0].Start_at
        ? new Date(moment(item[0].Start_at, "h:mm:ss A").format())
        : new Date()
      : new Date()
  );
  const [end, setEnd] = useState(
    item.length !== 0
      ? item[0].End_at
        ? new Date(moment(item[0].End_at, "h:mm:ss A").format())
        : new Date()
      : new Date()
  );
  const [duration, setDuration] = useState("00.00");
  const [location, setLocation] = useState(
    item.length !== 0 ? item[0].Location_id : ""
  );
  const [chargeCode, setChargeCode] = useState(
    item.length !== 0 ? item[0].Charge_code_id : ""
  );
  const [detail, setDetail] = useState(
    item.length !== 0 ? (item[0].Detail ? item[0].Detail : "") : ""
  );
  const [remark, setRemark] = useState(
    item.length !== 0 ? (item[0].Remark ? item[0].Remark : "") : ""
  );
  // console.log(chargeCode);
  const [user, setUser] = useState("");

  useEffect(() => {
    setTimeout(() =>
      setUser({
        Sheet_id: String(id),
        Date: moment(date, "DD/MM/YYYY").format("YYYY-MM-DD"),
        Start: moment(start).format("HH:mm:ss"),
        End: moment(end).format("HH:mm:ss"),
        Location_id: String(location),
        Charge_Code_Id: String(chargeCode),
        Detail: detail,
        Remark: remark,
      })
    );
  }, [date, start, end, location, chargeCode, detail, remark]);

  useEffect(() => {
    setDuration(getDuration(start, end));
  }, [start, end]);

  const getDuration = (Start, End) => {
    let Duration = moment.duration(
      moment(End, "h:mm:ss A").diff(moment(Start, "h:mm:ss A"))
    );
    return moment.utc(Duration.as("milliseconds")).format("HH:mm");
  };

  const onSubmit = async () => {
    if (option === "update") {
      await updateTimeSheet(user);
    } else if (option === "add") {
      await addTimeSheetWithForm(user);
    }
    dispatch(getTimeSheetInformationByDate("", "", getDateFormat(day)));
    handleClose();
  };

  const { handleSubmit, submitting } = useForm({
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="date"
            name="date"
            // size="small"
            label="Date"
            disabled
            defaultValue={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TimePicker
            name="time"
            value={start}
            ampm={false}
            // size="small"
            label="Start"
            fullWidth
            inputFormat="HH:mm"
            onChange={(e) => setStart(e)}
            renderInput={(params) => (
              <TextField
                // size="small"
                fullWidth
                required
                disabled={true}
                // InputProps={{ disableUnderline: true }}
                {...params}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <TimePicker
            name="time"
            value={end}
            ampm={false}
            // size="small"
            label="End"
            fullWidth
            inputFormat="HH:mm"
            onChange={(e) => setEnd(e)}
            renderInput={(params) => (
              <TextField
                // size="small"
                fullWidth
                required
                disabled={true}
                // InputProps={{ disableUnderline: true }}
                {...params}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="duration"
            name="duration"
            // size="small"
            label="Duration"
            disabled
            value={duration}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              select
              value={location}
              label="Location"
              style={{ justifyContent: "center" }}
              onChange={(e) => setLocation(e.target.value)}
              // size="small"
              fullWidth
            >
              {Object.keys(locationInformation).length !== 0 ? (
                locationInformation.data.map((item) => {
                  return (
                    <MenuItem value={item.Location_id} key={item.Location_id}>
                      {item.Location_Name}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              )}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              select
              label="ChargeCode"
              value={chargeCode}
              onChange={(e) => setChargeCode(e.target.value)}
              // size="small"
              fullWidth
            >
              {Object.keys(chargeCodeInformation).length !== 0 ? (
                chargeCodeInformation.data.map((item) => {
                  return (
                    <MenuItem
                      value={item.ChargeCode_id}
                      key={item.ChargeCode_id}
                    >
                      {item.ChargeCode_Name}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              )}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              id="detail"
              name="detail"
              // size="small"
              label="Task Detail"
              multiline
              defaultValue={detail}
              required
              rows={3}
              onChange={(e) => setDetail(e.target.value)}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              id="remark"
              name="remark"
              // size="small"
              defaultValue={remark}
              label="Progress"
              required
              multiline
              rows={3}
              onChange={(e) => setRemark(e.target.value)}
              fullWidth
            />
          </FormControl>
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
          {option === "add" ? "+ ADD" : "Update"}
        </Button>
      </DialogActions>
      <Snackbar />
    </form>
  );
};

export default FormTimeShettRecordWithForm;
