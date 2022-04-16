import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-final-form-hooks";
import Button from "../../common/Button";
// import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { DialogActions } from "@mui/material";
import { sendDocumentRequest } from "../actions";
import { getMyDocumentRequest } from "../actions";
import { getAllDocumentType } from "../../documentManagement/actions";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import Snackbar from "../../layout/components/Snackbar";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import { MenuItem } from "@mui/material";
import Select from "@mui/material/Select";

import { updateDocumentRequest } from "../actions";
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

const FormDocumentRequest = (props) => {
  const classes = useStyles();
  const { handleClose, id, option } = props;

  const dispatch = useDispatch();
  const { myDocumentInformation } = useSelector(
    (state) => state.documentRequestReducer
  );
  const { documentType } = useSelector((state) => state.documentManagementReducer);

  const item =
    Object.keys(myDocumentInformation).length !== 0 && option != "add"
      ? myDocumentInformation.data.filter(
          (value) => String(value.Req_id) === String(id)
        )[0]
      : {};
  const [detail, setDetail] = useState(
    option === "update" ? (item.length !== 0 ? item.Detail : "") : ""
  );
  const [type, setType] = useState(item.length !== 0 ? item.Type_ID : "");

  const [user, setUser] = useState("");

  useEffect(() => {
    setTimeout(() =>
      setUser({
        detail: String(detail),
        type: String(type),
        id: String(id),
      })
    );
  }, [detail, type, id]);

  const onSubmit = async () => {
    if (option === "update") {
      await updateDocumentRequest(user);
    } else if (option === "add") {
      await sendDocumentRequest(user);
    }
    dispatch(getMyDocumentRequest());
    setType([]);
    setDetail("");
    handleClose();
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const { handleSubmit, submitting } = useForm({
    onSubmit: onSubmit,
  });
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Leave Type *</InputLabel>
            <Select
              id="type"
              name="type"
              label="Request Type *"
              value={type}
              required
              onChange={handleChangeType}
              fullWidth
            >
              {Object.keys(documentType).length !== 0 &&
                documentType.data.map(({ Type_Id, Type_name }) => {
                  return <MenuItem value={Type_Id}>{Type_name}</MenuItem>;
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} className={classes.textField}>
          <TextField
            id="detail"
            name="detail"
            label="Request Detail"
            required
            multiline
            rows={4}
            defaultValue={detail}
            onChange={(e) => setDetail(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      <DialogActions className={classes.dialogAction}>
        <Button
          onClick={() => {
            setType([]);
            handleClose();
          }}
        >
          Cancel
        </Button>
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
  );
};

export default FormDocumentRequest;
