import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-final-form-hooks";
import { useSelector, useDispatch } from "react-redux";

import { pushSnackbarAction } from "../../layout/actions";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@material-ui/core/Grid";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import { isEmail } from "../../../utils/validate";
import Snackbar from "../../layout/components/Snackbar";
import Button from "../../common/Button";
import styles from "./stylesForm";
import { getEmployeeInformtion } from "../actions";

import { getDateFormat } from "../../../utils/miscellaneous";
import { getAllPositionInformtion } from "../../position/actions";
import { getAllCompanyInformtion } from "../../company/actions";
import { getAllRoleInformtion } from "../../userRole/actions";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Typography from "../../common/Typography/Typography";
import { addEmployee } from "../actions";
const useStyles = makeStyles(styles);

const FormAddEmployee = (props) => {
  const classes = useStyles();
  const { handleClose } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPositionInformtion());
    dispatch(getAllCompanyInformtion());
    dispatch(getAllRoleInformtion());
  }, []);

  const { AllPositionInformation } = useSelector(
    (state) => state.positionReducer
  );
  const { AllCompanyInformation } = useSelector(
    (state) => state.companyReducer
  );
  const { AllRoleInformation } = useSelector((state) => state.roleReducer);

  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState(new Date());
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [position, setPosition] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");

  const [user, setUser] = useState("");

  useEffect(() => {
    setTimeout(() =>
      setUser({
        Comp_ID: company,
        Position_ID: position,
        Lastname: lastname,
        Title: title,
        Gender: gender,
        Firstname: firstname,
        Role: role,
        BirthDate: getDateFormat(date),
        Email: email,
      })
    );
  }, [
    company,
    position,
    lastname,
    title,
    gender,
    firstname,
    role,
    date,
    email,
  ]);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const handleChangeFirstname = (event) => {
    setFirstname(event.target.value);
  };
  const handleChangeLastname = (event) => {
    setLastname(event.target.value);
  };
  const handleChangePosition = (event) => {
    setPosition(event.target.value);
  };
  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };
  const handleChangeCompany = (event) => {
    setCompany(event.target.value);
  };

  const onSubmit = async () => {
    if (isEmail(email)) {
      await addEmployee(user);
      dispatch(getEmployeeInformtion());
      handleClose();
    } else {
      pushSnackbarAction("warning", "your inpus is not email format.");
    }
  };
  const { handleSubmit, submitting } = useForm({
    onSubmit: onSubmit,
  });

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form className={classes.root} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid container item sx={12} spacing={2}>
              <Grid item xs={3} sm={2}>
                <InputLabel>Title *</InputLabel>
                <Select
                  id="title"
                  name="title"
                  value={title}
                  required
                  onChange={handleChangeTitle}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="Mr.">Mr.</MenuItem>
                  <MenuItem value="Mrs.">Mrs.</MenuItem>
                </Select>
              </Grid>
              <Grid item xs>
                <InputLabel>First name *</InputLabel>
                <TextField
                  id="firstname"
                  name="firstname"
                  required
                  defaultValue={firstname}
                  onChange={handleChangeFirstname}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs>
                <InputLabel>Last name *</InputLabel>
                <TextField
                  id="lastname"
                  name="lastname"
                  required
                  defaultValue={lastname}
                  onChange={handleChangeLastname}
                  fullWidth
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Gender *</InputLabel>
              <Select
                id="gender"
                name="gender"
                required
                value={gender}
                onChange={handleChangeGender}
                fullWidth
                size="small"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>BirthDate *</InputLabel>
              <DesktopDatePicker
                inputFormat="dd/MM/yyyy"
                value={date}
                onChange={handleChangeDate}
                renderInput={(params) => (
                  <TextField size="small" required fullWidth {...params} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Email Address *</InputLabel>
              <TextField
                id="email"
                name="email"
                required
                defaultValue={email}
                onChange={handleChangeEmail}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Company *</InputLabel>
              <Select
                id="company"
                name="company"
                value={company}
                required
                onChange={handleChangeCompany}
                fullWidth
                size="small"
              >
                {Object.keys(AllCompanyInformation).length !== 0 &&
                  AllCompanyInformation.data.map(({ ID, Company_Name }) => {
                    return <MenuItem value={ID}>{Company_Name}</MenuItem>;
                  })}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>User Role *</InputLabel>
              <Select
                id="role"
                name="role"
                value={role}
                required
                onChange={handleChangeRole}
                fullWidth
                size="small"
              >
                {Object.keys(AllRoleInformation).length !== 0 &&
                  AllRoleInformation.data.map(({ ID, Role_Name }) => {
                    return <MenuItem value={ID}>{Role_Name}</MenuItem>;
                  })}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Position *</InputLabel>
              <Select
                id="position"
                name="position"
                value={position}
                required
                onChange={handleChangePosition}
                fullWidth
                size="small"
              >
                {Object.keys(AllPositionInformation).length !== 0 &&
                  AllPositionInformation.data.map(({ ID, Position_Name }) => {
                    return <MenuItem value={ID}>{Position_Name}</MenuItem>;
                  })}
              </Select>
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
              + ADD
            </Button>
          </DialogActions>
        </form>
      </LocalizationProvider>
      <Snackbar />
    </>
  );
};

export default FormAddEmployee;
