import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-final-form-hooks";
import Button from "../../common/Button";
import { makeStyles } from "@material-ui/core/styles";

import { TextField } from "@mui/material";
import { pushSnackbarAction } from "../../layout/actions";
import DialogActions from "@mui/material/DialogActions";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import makeAnimated from "react-select/animated";
import Snackbar from "../../layout/components/Snackbar";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";
import { getAccountInformation } from "../../identity/actions";
import { getEmployeeInformtion } from "../../employeeInfomation/actions";
import { getTeamsInformation } from "../actions";
import { updateTeam } from "../actions";
import { Divider } from "@mui/material";
import CardMembers from "./CardMembers";
const useStyles = makeStyles(() => ({
  ButtonSubmit: {
    background: "#04AA6D",
    color: "#FFFFFF",
    "&:hover": {
      background: "#04AA6D",
      opacity:"0.8",
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
  form: {
    minWidth: "600px",
  },
}));

const customStyles = {
  control: (base) => ({
    ...base,
    "min-height": "56px",
  }),
};

const FormUpdateTeam = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const { handleClose, nowID } = props;
  const { empInformation } = useSelector((state) => state.employeeReducer);

  useEffect(() => {
    dispatch(getEmployeeInformtion());
    dispatch(getAccountInformation());
  }, []);

  const [selectedHost, setSelectedHost] = useState({
    value: "",
    label: nowID.Team_host,
  });

  const [teamName, setTeamName] = useState(nowID ? nowID.Teamname : "");

  const options = [],
    listEmp = [];

  const onSubmit = async () => {
    await updateTeam(nowID.Team_id, teamName, selectedHost.value);
    dispatch(getTeamsInformation());
    handleClose();
  };

  const createOptions = () => {
    if (Object.keys(empInformation).length !== 0) {
      empInformation.data.map((value, index) => {
        options[index] = {};
        options[index].value = value.Emp_id;
        options[index].label = value.Name;
        listEmp[index] = {};
        listEmp[index].value = value.Emp_id;
        listEmp[index].label = value.Name;
      });
    }
  };

  const { form, handleSubmit, submitting } = useForm({
    onSubmit: onSubmit,
  });
  createOptions();
  return (
    <form
      onSubmit={handleSubmit}
      // className={classes.form}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <InputLabel>Team name*</InputLabel>
          <TextField
            id={"teamname"}
            fullWidth
            defaultValue={teamName}
            name={"teamname"}
            onChange={(e) => {
              setTeamName(e.target.value);
            }}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <InputLabel>Team host *</InputLabel>
          <Select
            components={animatedComponents}
            defaultValue={selectedHost}
            onChange={(e) => {
              setSelectedHost(e);
            }}
            options={options}
            styles={customStyles}
            isClearable={false}
          />
        </Grid>
        <Grid item xs={12} style={{marginTop:"18px"}}>
          <Divider />
          <CardMembers teamID={nowID.Team_id} host={nowID.Team_host} />
        </Grid>
      </Grid>{" "}
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
      <Snackbar />
    </form>
  );
};

export default FormUpdateTeam;
