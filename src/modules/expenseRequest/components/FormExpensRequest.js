import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-final-form-hooks";
import Button from "../../common/Button";
// import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { DialogActions } from "@mui/material";
import { sendExpenseRequest } from "../actions";
import { getMyExpenseRequest } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import Snackbar from "../../layout/components/Snackbar";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import { convertFileToBase64 } from "../../../utils/miscellaneous";
import UploadIcon from "@mui/icons-material/Upload";
import FileLists from "./FileLists";
import { updateExpenseRequest } from "../actions";
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

const FormExpensRequest = (props) => {
  const classes = useStyles();
  const { handleClose, id, option } = props;

  const dispatch = useDispatch();
  const { myExpenseInformation } = useSelector(
    (state) => state.expenseRequestReducer
  );

  const item =
    Object.keys(myExpenseInformation).length !== 0 && option != "add"
      ? myExpenseInformation.data.filter(
          (value) => String(value.Req_id) === String(id)
        )[0]
      : {};
  const [detail, setDetail] = useState(
    option === "update" ? (item.length !== 0 ? item.Detail : "") : ""
  );
  const [files, setFiles] = useState(
    option === "update" ? (item.length !== 0 ? item.File : []) : []
  );

  const [user, setUser] = useState("");

  useEffect(() => {
    setTimeout(() =>
      setUser({
        detail: String(detail),
        files: files,
        id: String(id),
      })
    );
  }, [detail, files, id]);

  const onSubmit = async () => {
    if (option === "update") {
      await updateExpenseRequest(user);
    } else if (option === "add") {
      await sendExpenseRequest(user);
    }
    dispatch(getMyExpenseRequest());
    setFiles([]);
    setDetail("");
    handleClose();
  };

  const removeFile = (fileid) => {
    setFiles(files.filter((file) => String(file.id) !== String(fileid)));
  };

  const onChangeFile = async (event) => {
    Array.from(event.target.files).forEach(async (file, index) => {
      if (!file) return;
      file.isUploading = true;
      const filebase64 = await convertFileToBase64(file);
      let tempFile = {
        name: file.name,
        data: filebase64,
        id: String(file.name + Math.random()),
      };
      setFiles((prevState) => [...prevState, tempFile]);
    });
  };
  const dowloadFile = (value) => {
    const linkSource = value.data;
    const dowloadLink = document.createElement("a");
    const fileName = value.name;
    dowloadLink.href = linkSource;
    dowloadLink.download = fileName;
    dowloadLink.click();
  };
  const { handleSubmit, submitting } = useForm({
    onSubmit: onSubmit,
  });
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.textField}>
          <InputLabel>Request Detail *</InputLabel>
          <TextField
            id="detail"
            name="detail"
            required
            multiline
            rows={4}
            defaultValue={detail}
            onChange={(e) => setDetail(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Upload file*</InputLabel>
          <div className={classes.uploadFile}>
            <label htmlFor="contained-button-file">
              <Input
                id="contained-button-file"
                multiple
                type="file"
                onChange={onChangeFile}
              />
              <Button
                variant="contained"
                component="span"
                startIcon={<UploadIcon />}
                style={{ backgroundColor: "#f15120", color: "#ffffff" }}
              >
                Upload
              </Button>
            </label>
            <p className={classes.mainInfo}>
              {" "}
              Click to Upload {"(File size up to 800 MB per file.)"}
            </p>
            {/* <p className={classes.mainInfo}> PDF , PNG ,JPG</p> */}
          </div>
        </Grid>
        <Grid item xs={12}>
          <FileLists
            files={files}
            removeFile={removeFile}
            dowloadFile={dowloadFile}
          />
        </Grid>
      </Grid>
      <DialogActions className={classes.dialogAction}>
        <Button
          onClick={() => {
            setFiles([]);
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

export default FormExpensRequest;
