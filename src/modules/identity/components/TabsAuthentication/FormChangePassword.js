import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useForm, useField } from "react-final-form-hooks";
import classNames from "classnames";
// import TextFieldOutlined from '../../../common/TextFieldOutlined'
import Button from "../../../common/Button";
import PasswordInputOutlined from "../../../common/PasswordInputOutlined";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./stylesForm";
import { resetPassword } from "../../../authentication/action";
import { pushSnackbarAction } from "../../../layout/actions";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "../../../layout/components/Snackbar";
import { validateBothSame } from "../../../../utils/validate";
import { isCharactersPasswordMinimum } from "../../../../utils/validate";

const useStyles = makeStyles(styles);

const FormChangePassword = (props) => {
  const classes = useStyles();
  const { handleClose } = props;

  const onSubmit = async (values) => {
    if (validateBothSame(values.newPassword, values.confirmPassword)) {
      if (isCharactersPasswordMinimum(values.newPassword)) {
        if ((await resetPassword(values)).status !== "fail") {
          handleClose();
        }
      } else {
        pushSnackbarAction(
          "warning",
          "Password is required to have a minimum of 8 characters and must have at least 1 number and one letter. "
        );
      }

      // await resetPassword(values)
      // handleClose()
    } else {
      pushSnackbarAction("warning", "New password not same");
    }
    // window.location.reload();
  };

  const { form, handleSubmit, submitting, values } = useForm({
    onSubmit: onSubmit,
  });

  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classNames(classes.massage)}>
              <div>fill the form to change your password.</div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <PasswordInputOutlined
              className={classes.textfield}
              id={"oldPassword"}
              placeholder={"Enter New Password."}
              name={"oldPassword"}
              form={form}
              label="Old Password"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordInputOutlined
              className={classes.textfield}
              id={"newPassword"}
              placeholder={"Enter New Password."}
              name={"newPassword"}
              form={form}
              label="New Password"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordInputOutlined
              className={classes.textfield}
              id={"confirmPassword"}
              placeholder={"Re-Enter New Password."}
              name={"confirmPassword"}
              form={form}
              label="Confirm Password"
              required
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

export default FormChangePassword;
