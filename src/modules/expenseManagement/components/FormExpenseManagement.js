import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-final-form-hooks";
import Button from "../../common/Button";
// import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { DialogActions } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import Snackbar from "../../layout/components/Snackbar";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getAllExpenseRequest } from "../actions";
import { responseExpenseManagement } from "../actions";
const Input = styled("input")({
  display: "none",
});

const useStyles = makeStyles((theme) => ({
  ButtonSubmit: {
    background: "#04AA6D !important",
    color: "#FFFFFF !important",
    "&:hover": {
      opacity: "0.8",
    },
  },
  ButtonDecline: {
    background: "#ff6961 !important",
    color: "#FFFFFF !important",
    "&:hover": {
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
  textField: {
    width: "500px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  fileinput: {
    display: "none",
  },
  uploadFile: {
    backgroundColor: "#CCCCC4",
    width: "100%",
    padding: "15px 10px",
    border: "1px dashed black ",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  Info: {
    color: "f55e30",
    marginTop: "15px",
    fontSize: "12px",
  },
  mainInfo: {
    marginTop: "15px",
    color: "f55e30",
    fontSize: "15px",
  },
}));

const FormExpenseManagement = (props) => {
  const classes = useStyles();
  const { handleClose, id, option } = props;

  const dispatch = useDispatch();

  const [remark, setRemark] = useState("");

  const [user, setUser] = useState("");

  useEffect(() => {
    setTimeout(() =>
      setUser({
        id: String(id),
        remark: String(remark),
        option: option === "approve" ? String(true) : String(false),
      })
    );
  }, [remark, option, id]);

  const onSubmit = async () => {
    await responseExpenseManagement(user);

    dispatch(getAllExpenseRequest());
    setRemark("");
    handleClose();
  };

  const { handleSubmit, submitting } = useForm({
    onSubmit: onSubmit,
  });
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.textField}>
          <InputLabel>Remark</InputLabel>
          <TextField
            id="remark"
            name="remark"
            multiline
            rows={4}
            defaultValue={remark}
            onChange={(e) => setRemark(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      <DialogActions className={classes.dialogAction}>
        <Button
          onClick={() => {
            setRemark("");
            handleClose();
          }}
        >
          Cancel
        </Button>
        <Button
          loading={submitting}
          variant={"contained"}
          className={
            option === "approve" ? classes.ButtonSubmit : classes.ButtonDecline
          }
          type="submit"
          autoFocus
        >
          {option === "approve" && "Approve"}
          {option === "decline" && "Decline"}
        </Button>
      </DialogActions>
      <Snackbar />
    </form>
  );
};

export default FormExpenseManagement;
