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
import { addChargeCode } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import Snackbar from "../../../layout/components/Snackbar";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";
import { getChargeCode, updateChargeCode } from "../../actions";
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

const FormChargeCodeUpdate = (props) => {
  const classes = useStyles();
  const { handleClose, id, option } = props;

  const dispatch = useDispatch();
  const { chargeCodeInformation } = useSelector(
    (state) => state.timeSheetMngReducer
  );

  useEffect(() => {
    dispatch(getChargeCode());
  }, []);

  const item =
    Object.keys(chargeCodeInformation).length !== 0 && option != "add"
      ? chargeCodeInformation.data.filter((value) => value.ChargeCode_id === id)
      : "";

  const [name, setName] = useState(
    item.length !== 0
      ? item[0].ChargeCode_Name
        ? item[0].ChargeCode_Name
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
        ChargeCode_Name: name,
        Description: noted,
        ChargeCode_id: String(id),
      })
    );
  }, [name, noted]);

  let i = 0;
  const onSubmit = async () => {
    console.log(option);
    if (option === "update") {
      await updateChargeCode(user);
    } else if (option === "add") {
      await addChargeCode(user);
    }
    dispatch(getChargeCode());
    handleClose();
    i++;
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
          <Grid item sm={12}>
            <InputLabel>Noted</InputLabel>
            <TextField
              id="noted"
              name="noted"
              defaultValue={noted}
              onChange={(e) => {
                setNoted(e.target.value);
              }}
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
            Update
          </Button>
        </DialogActions>
        <Snackbar />
      </form>
    </LocalizationProvider>
  );
};

export default FormChargeCodeUpdate;
