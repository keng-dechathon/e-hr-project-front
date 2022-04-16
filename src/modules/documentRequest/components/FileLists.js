import React, { useState, useEffect, useRef } from "react";
import FileItem from "./FileItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: "509px",
    },
  },
}));
const FileLists = ({ files, removeFile, dowloadFile }) => {
  const classes = useStyles();

  return (
    <>
      <div>
        {files
          ? files.map((f) => (
              <FileItem
                key={f.id}
                file={f}
                removeFile={removeFile}
                dowloadFile={dowloadFile}
              />
            ))
          : ""}
      </div>
    </>
  );
};

export default FileLists;
