import React, { useEffect, useState } from "react";
import Button from "../../../common/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getMeetingInformationByCreator } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import DataGrid from "../../../common/DataGrid";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
const useStyles = makeStyles(() => ({
  cardcontant: {
    padding: 0,
    "&:last-child": {
      paddingBottom: "0 !important",
    },
    "&.css-ypiqx9-MuiDialogContent-root": {
      padding: "20px 24px 0px 24px",
    },
  },
  ButtonSubmit: {
    background: "#FF5959",
    color: "#FFFFFF",
    "&:hover": {
      background: "#FF5959",
      opacity:"0.8",
    },
  },
  dialogAction: {
    marginTop: "10px",
    padding: " 0px 16px 16px 0px !important",
  },
}));

export default function ForceUpdateDialog(props) {
  const { open, handleClose, user } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { addState } = useSelector((state) => state.meetReducer);
  const [roomMessage, setRoomMessage] = React.useState("");
  const [roomIcon, setRoomIcon] = React.useState("");
  const [empMessage, setEmpMessage] = React.useState("");
  const [empIcon, setEmpIcon] = React.useState("");

  const [pageSize, setPageSize] = React.useState(5);
  const Header = [
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      sortable: false,
    },
    {
      field: "Time",
      headerName: "Meeting Time",
      flex: 1,
      sortable: false,
    },
  ];

  let Info = [];

  useEffect(() => {
    if (
      Object.keys(addState).length === 0 &&
      Object.getPrototypeOf(addState) === Object.prototype
    ) {
      setRoomMessage(<DoneIcon />);
      setEmpMessage(<DoneIcon />);
    } else {
      console.log("da : " + addState.Emp_message !== "");
      setEmpMessage(addState.Emp_message);
      setRoomMessage(addState.Room_message);
      if (addState.Room_message !== "") {
        setRoomIcon(<ClearIcon />);
      }
      if (addState.Emp_message !== "") {
        setEmpIcon(<ClearIcon />);
      }
      if (addState.Emp_message === "") {
        setEmpIcon(<DoneIcon />);
      }
      if (addState.Room_message === "") {
        setRoomIcon(<DoneIcon />);
      }
    }
  }, [addState]);
  const setDataGrid = () => {
    try {
      let i = 0;
      if (Object.keys(addState).length !== 0) {
        Object.keys(addState.Emp.data).map(function (key, index) {
          addState.Emp.data[key].map((item, index2) => {
            console.log(item);
            Info.push({
              id: i,
              Name: item.Name,
              Time:
                moment(item.Start_at, "h:mm:ss A").format("HH:mm") +
                " - " +
                moment(item.End_at, "h:mm:ss A").format("HH:mm"),
            });
          });
          i++;
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  setDataGrid();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        disableEnforceFocus
        fullWidth
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"ATTENTION !!!"}</DialogTitle>
        <DialogContent className={classes.cardcontant}>
          <DialogContentText
            id="alert-dialog-description"
            style={{ marginBottom: "20px", fontSize: "15px" }}
          >
            {addState.roomMessage !== "" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ marginRight: "5px" }}>Room :</span>
                {roomMessage}
                {roomIcon}
              </div>
            ) : (
              ""
            )}

            {addState.Emp_message !== "" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ marginRight: "5px" }}>Employee :</span>
                {empMessage}
                {empIcon}
              </div>
            ) : (
              ""
            )}
          </DialogContentText>
          {addState ? (
            addState.Emp_message !== "" ? (
              <DataGrid
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20, 50]}
                pagination
                disableSelectionOnClick
                headers={Header ? Header : ""}
                rows={Info ? Info : ""}
              />
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          <Button onClick={handleClose}>Back</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
