import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-final-form-hooks";
import Button from "../../common/Button";
import { makeStyles } from "@material-ui/core/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import TimePicker from "@mui/lab/TimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import DialogActions from "@mui/material/DialogActions";
import { addPosition } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import Snackbar from "../../layout/components/Snackbar";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";
import { updatePosition } from "../actions";
import { Box } from "@mui/system";
import { getAllPositionInformtion } from "../actions";

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
const FormPositionManagement = (props) => {
  const classes = useStyles();
  const { handleClose, id, option } = props;

  const dispatch = useDispatch();
  const { AllPositionInformation } = useSelector(
    (state) => state.positionReducer
  );

  const item =
    Object.keys(AllPositionInformation).length !== 0 && option != "add"
      ? AllPositionInformation.data.filter((value) => value.ID === id)
      : "";

  const [name, setName] = useState(
    item.length !== 0 ? (item[0].Position_Name ? item[0].Position_Name : "") : ""
  );

  const [user, setUser] = useState("");

  useEffect(() => {
    setTimeout(() =>
      setUser({
        Position_Name: name,
        Position_ID: String(id),
      })
    );
  }, [name]);

  const onSubmit = async () => {
    if (option === "update") {
      await updatePosition(user);
    } else if (option === "add") {
      await addPosition(user);
    }
    dispatch(getAllPositionInformtion());
    handleClose();
  };

  const { handleSubmit, submitting } = useForm({
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ minWidth: "300px" }}>
          <InputLabel>Position Name</InputLabel>
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

export default FormPositionManagement;
