import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-final-form-hooks";
import Button from "../../common/Button";
import { makeStyles } from "@material-ui/core/styles";
import { addMember } from "../actions";
import TextField from "../../common/TextFieldOutlined";
import { pushSnackbarAction } from "../../layout/actions";
import { getMemberInformation } from "../actions";
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
import { addTeam } from "../actions";
import AutoComplete from "../../common/AutoComplete";

const useStyles = makeStyles(() => ({
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
  form: {
    minWidth: "600px",
  },
}));

const customStyles = {
  control: (base) => ({
    ...base,
    "min-height": "56px",
    "min-width": "500px",
  }),
  menuPortal: (base) => {
    const { zIndex, ...rest } = base; // remove zIndex from base by destructuring
    return { ...rest, zIndex: 9999 };
  },
};

const FormAddMember = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const { handleClose, Info, teamID, host } = props;

  const { empInformation } = useSelector((state) => state.employeeReducer);
  const { memberInformation } = useSelector((state) => state.teamReducer);

  useEffect(() => {
    dispatch(getEmployeeInformtion());
    dispatch(getMemberInformation("", "", teamID));
  }, []);

  const [selectedOptions, setSelectedOptions] = useState();
  const listEmp = [];

  const onSubmit = async () => {
    await addMember(
      teamID,
      selectedOptions.map((item) => String(item.id))
    );
    dispatch(getMemberInformation("", "", teamID));
    dispatch(getTeamsInformation());
    handleClose();
  };

  const createOptions = () => {
    if (Object.keys(empInformation).length !== 0) {
      const res1 = empInformation.data.filter(
        (v1) => !Info.find((v2) => v1.Emp_id === v2.id)
      );
      res1.map((value, index) => {
        if (value.Role === "Manager" || value.Role === "Staff") {
          listEmp.push({
            id: parseInt(value.Emp_id),
            text: value.Name,
          });
        }
      });
    }
  };

  const { handleSubmit, submitting } = useForm({
    onSubmit: onSubmit,
  });
  createOptions();
  console.log(typeof listEmp);
  console.log(listEmp.filter((option) => option.label !== host));
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AutoComplete
            option={listEmp}
            defaultValue={[]}
            selectState={selectedOptions}
            setSelectState={setSelectedOptions}
            style={{ backgroundColor: "white", minWidth: "400px" }}
            label="Members"
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
      <Snackbar />
    </form>
  );
};

export default FormAddMember;
