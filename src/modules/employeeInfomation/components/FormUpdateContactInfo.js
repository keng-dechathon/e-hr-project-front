import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-final-form-hooks";
import { useSelector, useDispatch } from "react-redux";

import InputLabel from "@mui/material/InputLabel";
import Grid from "@material-ui/core/Grid";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

import Snackbar from "../../layout/components/Snackbar";
import Button from "../../common/Button";
import styles from "./stylesForm";
import { getEmployeeInformtionByID, getEmployeeInformtion } from "../actions";

import { isPhoneNumber, isEmail, isThai } from "../../../utils/validate";
import { pushSnackbarAction } from "../../layout/actions";
import { updateProfileById } from "../actions";
const useStyles = makeStyles(styles);

const FormUpdateContactInfo = (props) => {
  const classes = useStyles();
  const { handleClose, id } = props;

  const dispatch = useDispatch();
  const { empInformationByID } = useSelector((state) => state.employeeReducer);

  const [email, setEmail] = useState(
    empInformationByID.Email && empInformationByID.Email !== "null"
      ? empInformationByID.Email
      : ""
  );
  const [phone, setPhone] = useState(
    empInformationByID.Phone && empInformationByID.Phone !== "null"
      ? empInformationByID.Phone
      : ""
  );
  const [address, setAddress] = useState(
    empInformationByID.Address && empInformationByID.Address !== "null"
      ? empInformationByID.Address
      : ""
  );

  const [user, setUser] = useState("");

  useEffect(() => {
    setTimeout(() =>
      setUser({ Id: id, Email: email, Phone: phone, Address: address })
    );
  }, [email, phone, address]);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };

  const onSubmit = async () => {
    if (!isPhoneNumber(phone)) {
      pushSnackbarAction("error", "Invalid phone number format.");
    } else {
      await updateProfileById(user);
      dispatch(getEmployeeInformtionByID("", "", id));
      dispatch(getEmployeeInformtion());
      handleClose();
    }
    // window.location.reload();
  };

  const { handleSubmit, submitting } = useForm({
    onSubmit: onSubmit,
  });

  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <InputLabel>Email Address</InputLabel>
            <TextField
              id="email"
              name="email"
              defaultValue={email}
              onChange={handleChangeEmail}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item sm={6}>
            <InputLabel>Phone Number</InputLabel>
            <TextField
              id="phone"
              name="phone"
              defaultValue={phone}
              onChange={handleChangePhone}
              fullWidth
            />
          </Grid>
          <Grid item sm={12}>
            <InputLabel>Address</InputLabel>
            <TextField
              id="address"
              name="address"
              defaultValue={address}
              onChange={handleChangeAddress}
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
      </form>
      <Snackbar />
    </>
  );
};

export default FormUpdateContactInfo;
