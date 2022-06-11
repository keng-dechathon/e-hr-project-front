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
import { addCompany } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import Snackbar from "../../layout/components/Snackbar";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";
import {  updateCompany } from "../actions";
import { Box } from "@mui/system";
import { getAllCompanyInformtion } from "../actions";

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
const FormCompanyManagement = (props) => {
  const classes = useStyles();
  const { handleClose, id, option } = props;

  const dispatch = useDispatch();
  const {
    AllCompanyInformation
  } = useSelector((state) => state.companyReducer);


  const item =
    Object.keys(AllCompanyInformation).length !== 0 && option != "add"
      ? AllCompanyInformation.data.filter((value) => value.ID === id)
      : "";
console.log(item);
  const [name, setName] = useState(
    item.length !== 0
      ? item[0].Company_Name
        ? item[0].Company_Name
        : ""
      : ""
  );

  const [user, setUser] = useState("");

  useEffect(() => {
    setTimeout(() =>
      setUser({
        Company_Name: name,
        Comp_ID: String(id),
      })
    );
  }, [name]);

  const onSubmit = async () => {
    if (option === "update") {
      await updateCompany(user);
    } else if (option === "add") {
      await addCompany(user);
    }
    dispatch(getAllCompanyInformtion());
    handleClose();
  };

  const { handleSubmit, submitting } = useForm({
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{minWidth:"300px"}}>
          <InputLabel>Company Name</InputLabel>
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

export default FormCompanyManagement;
