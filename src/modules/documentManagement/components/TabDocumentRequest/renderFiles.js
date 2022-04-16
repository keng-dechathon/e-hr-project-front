import * as React from "react";

import IconButton from "@mui/material/IconButton";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { Grid } from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import FileLists from "./FileLists";
import { Button } from "@mui/material";
const FilesList = React.memo(function FilesList(props) {
  const { params } = props;

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const dowloadFile = (value) => {
    const linkSource = value.data;
    const dowloadLink = document.createElement("a");
    const fileName = value.name;
    dowloadLink.href = linkSource;
    dowloadLink.download = fileName;
    dowloadLink.click();
  };
  return (
    <>
      <ModalUpdate open={open} handleClose={handleClose} title="Fils List">
        <FileLists files={params.value} dowloadFile={dowloadFile} />
        <div
          style={{ width: "100%", display: "flex", justifyContent: "right",marginTop:"10px" }}
        >
          <Button onClick={handleClose}>Close</Button>
        </div>
      </ModalUpdate>
      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ marginRight: "10px" }}>{params.value.length} files</div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            paddingRight: "10px",
          }}
        >
          {params.value.length !== 0 ? (
            <IconButton
              color="primary"
              size="small"
              component="span"
              onClick={handleOpen}
            >
              <FolderOpenIcon fontSize="small" />
            </IconButton>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
});
export default function renderFiles(params) {
  return <FilesList params={params} />;
}
