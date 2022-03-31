import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-final-form-hooks";
import { useSelector, useDispatch } from "react-redux";

import InputLabel from "@mui/material/InputLabel";
import Grid from "@material-ui/core/Grid";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Snackbar from "../../layout/components/Snackbar";
import Button from "../../common/Button";
import styles from "./stylesForm";
import { getEmployeeInformtionByID, getEmployeeInformtion } from "../actions";

import { updateProfileById } from "../actions";
const useStyles = makeStyles(styles);

const FormChangeEmail = (props) => {
  const classes = useStyles();
  const { handleClose, id } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const breakPoint = useMediaQuery(theme.breakpoints.down(700));

  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    setTimeout(() => setUser({ Id: id, Username: email }));
  }, [email]);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = async () => {
    await updateProfileById(user);
    dispatch(getEmployeeInformtionByID("", "", id));
    dispatch(getEmployeeInformtion());
    handleClose();

    // window.location.reload();
  };

  const { handleSubmit, submitting } = useForm({
    onSubmit: onSubmit,
  });

  return (
    <>
      <form
        className={classes.root}
        onSubmit={handleSubmit}
        style={{ minWidth: "400px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel>New Email</InputLabel>
            <TextField
              size={breakPoint?"small":"medium"}
              id="email"
              name="email"
              required
              defaultValue={email}
              onChange={handleChangeEmail}
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
      </form>
      <Snackbar />
    </>
  );
};

export default FormChangeEmail;
