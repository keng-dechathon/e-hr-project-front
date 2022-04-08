import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
const useStyles = makeStyles((theme) => ({
  box: {
    width: "100%",
    borderRadius: "5px",
    backgroundColor: "#f55e3038",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    margin: "0 0 10px 0",
    height: "45px",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: "509px",
    },
  },
  fileicon: {
    marginRight: "10px",
  },
  deleteIconBox: {
    position: "absolute",
    right: "10px",
  },
  Button: {
    "&:hover": {
      backgroundColor: "transparent !important",
    },
  },
  wordbreak: {
    textOverflow: "ellipsis !important",
    wordBreak: "break-all !important",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "80%",
  },
}));
const FileItem = ({ file, removeFile, dowloadFile }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.box}>
        {" "}
        <InsertDriveFileIcon className={classes.fileicon} />
        <div className={classes.wordbreak}>{file.name}</div>
        {removeFile && (
          <div className={classes.deleteIconBox}>
            <IconButton
              aria-label="delete"
              className={classes.Button}
              onClick={() => removeFile(file.id)}
            >
              <CloseIcon />
            </IconButton>
          </div>
        )}
        {dowloadFile && (
          <div className={classes.deleteIconBox}>
            <IconButton
              aria-label="dowload"
              className={classes.Button}
              onClick={() => dowloadFile(file)}
            >
              <FileDownloadIcon />
            </IconButton>
          </div>
        )}
      </div>
    </>
  );
};

export default FileItem;
