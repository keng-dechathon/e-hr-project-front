import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-final-form-hooks";
import Button from "../../../common/Button";
import { makeStyles } from "@material-ui/core/styles";
import { DialogActions } from "@mui/material";

import { getAllDocumentType } from "../../actions";
import { updateDocumentType } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import Snackbar from "../../../layout/components/Snackbar";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";
import { addDocumentType } from "../../actions";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
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
  typeBox: {
    width: "450px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

const FormLeaveTypeUpdate = (props) => {
  const classes = useStyles();
  const { handleClose, id, option } = props;

  const dispatch = useDispatch();

  const { documentType } = useSelector(
    (state) => state.documentManagementReducer
  );

  const item =
    Object.keys(documentType).length !== 0 && option != "add"
      ? documentType.data.filter((value) => value.id === id)
      : "";
  const [name, setName] = useState(
    item.length !== 0 ? (item[0].Type_name ? item[0].Type_name : "") : ""
  );
  const [user, setUser] = useState("");

  useEffect(() => {
    setTimeout(() =>
      setUser({
        id: String(id),
        name: String(name),
      })
    );
  }, [name, id]);

  const onSubmit = async () => {
    if (option === "update") {
      await updateDocumentType(user);
    } else if (option === "add") {
      await addDocumentType(String(name));
    }
    dispatch(getAllDocumentType());
    handleClose();
  };

  const { handleSubmit, submitting } = useForm({
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.typeBox}>
          <TextField
            id="name"
            label="Type name"
            name="name"
            required
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
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
          {option === "add" ? "ADD +" : "UPDATE"}
        </Button>
      </DialogActions>
      <Snackbar />
    </form>
  );
};

export default FormLeaveTypeUpdate;
