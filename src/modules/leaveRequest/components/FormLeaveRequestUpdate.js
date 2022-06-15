import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-final-form-hooks";
import Button from "../../common/Button";
import { makeStyles } from "@material-ui/core/styles";
import { DialogActions } from "@mui/material";
import AutocompleteEmpty from "@mui/material/Autocomplete";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import Snackbar from "../../layout/components/Snackbar";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@mui/system";
import { MenuItem } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { getLeaveRequestInformation } from "../actions";
import Select from "@mui/material/Select";
import { sendLeaveRequest } from "../actions";
import { getLeaveTypeInformation } from "../../leaveType/actions";
import DateTimePicker from "@mui/lab/DateTimePicker";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import FormHelperText from "@mui/material/FormHelperText";
import AutoComplete from "../../common/AutoComplete";
import { getEmployeeInformtion } from "../../employeeInfomation/actions";
import { getTeamsInformationById } from "../../team/actions";
import { pushSnackbarAction } from "../../layout/actions";

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
}));

const FormLeaveRequestUpdate = (props) => {
  const classes = useStyles();
  const { handleClose, id, option } = props;
  const dispatch = useDispatch();

  const { leaveRequestInformation } = useSelector(
    (state) => state.leaveReducer
  );
  const { leaveTypeInformation } = useSelector(
    (state) => state.leaveTypeReducer
  );

  const { teamInformationById } = useSelector((state) => state.teamReducer);
  const { accountInformation } = useSelector((state) => state.accountReducer);
  const { empInformation } = useSelector((state) => state.employeeReducer);

  useEffect(() => {
    dispatch(getLeaveTypeInformation());
    dispatch(getEmployeeInformtion());
    dispatch(
      getTeamsInformationById("", "", String(accountInformation.Emp_id))
    );
  }, []);

  const [type, setType] = useState("");
  const [user, setUser] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [detail, setDetail] = useState("");
  const [emergency, setEmergency] = useState(false);
  const [depend, setDepend] = useState({});

  let dependList = [];

  useEffect(() => {
    setTimeout(() =>
      setUser({
        Type_ID: String(type),
        Emp_id: String(accountInformation.Emp_id),
        Depend: String(depend.id),
        Begin: moment(start).format("YYYY-MM-DD HH:mm:ss"),
        End: moment(end).format("YYYY-MM-DD HH:mm:ss"),
        Detail: detail,
        Emergency: String(emergency),
      })
    );
  }, [type, start, end, detail, emergency, depend]);

  const setDependList = () => {
    if (
      Object.keys(teamInformationById).length !== 0 &&
      Object.keys(empInformation).length !== 0
    ) {
      if (
        accountInformation.Role === "Management" ||
        accountInformation.Role === "Manager" ||
        accountInformation.Role === "Hr"
      ) {
        dependList = [];
        let approver = empInformation.data.filter(
          (user) => user.Role === "Approver"
        );
        approver.map((item, index) => {
          console.log(item);
          dependList.push({
            id: parseInt(item.Emp_id),
            text: empInformation.data.filter(
              (user) => String(user.Emp_id) === String(item.Emp_id)
            )[0].Name,
          });
        });
      } else {
        dependList = [];
        if (Object.keys(teamInformationById.data).length !== 0) {
          teamInformationById.data.map((item, index) => {
            dependList.push({
              id: parseInt(item.Team_host),
              text: empInformation.data.filter(
                (user) => String(user.Emp_id) === String(item.Team_host)
              )[0].Name,
            });
          });
        } else {
          let approver = empInformation.data.filter(
            (user) => user.Role === "Approver"
          );
          approver.map((item, index) => {
            console.log(item);
            dependList.push({
              id: parseInt(item.Emp_id),
              text: empInformation.data.filter(
                (user) => String(user.Emp_id) === String(item.Emp_id)
              )[0].Name,
            });
          });
        }
      }
    }
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const handleChecked = (event) => {
    setEmergency(event.target.checked);
  };
  const onSubmit = async () => {
    let timeDiff = moment.duration(moment(end).diff(start));
    // let hours = Math.floor(timeDiff.asSeconds() / 3600);
    // let min = Math.floor((timeDiff.asSeconds() - hours * 3600) / 60);
    // let isPast =
    //   moment(start).isBefore(moment()) || moment(end).isBefore(moment());
    if (timeDiff._milliseconds < 0) {
      pushSnackbarAction(
        "warning",
        "The end time cannot be selected before the start time."
      );
    } else {
      await sendLeaveRequest(user);
      dispatch(getLeaveRequestInformation());
      handleClose();
    }
  };

  const { handleSubmit, submitting } = useForm({
    onSubmit: onSubmit,
  });
  setDependList();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Leave Type *
              </InputLabel>
              <Select
                id="type"
                name="type"
                label="Leave Type *"
                value={type}
                required
                onChange={handleChangeType}
                fullWidth
              >
                {Object.keys(leaveTypeInformation).length !== 0 &&
                  leaveTypeInformation.data.map(({ id, Type_name }) => {
                    return <MenuItem value={id}>{Type_name}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} style={{ display: "flex" }}>
            <DateTimePicker
              value={start}
              ampm={false}
              inputFormat="dd/MM/yyyy HH:mm "
              onChange={(e) => {
                setStart(new Date(moment(e).format()));
              }}
              renderInput={(params) => (
                <TextField fullWidth {...params} label="Start" required />
              )}
            />
            <Box sx={{ mx: 2 }} className={classes.center}>
              {" "}
              to{" "}
            </Box>
            <DateTimePicker
              value={end}
              ampm={false}
              inputFormat="dd/MM/yyyy HH:mm"
              onChange={(e) => {
                setEnd(new Date(moment(e).format()));
              }}
              renderInput={(params) => (
                <TextField fullWidth {...params} label="End" required />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Detail"
              id="Detail"
              name="Detail"
              multiline
              required
              rows={4}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            {Object.keys(teamInformationById).length !== 0 &&
            Object.keys(empInformation).length !== 0 ? (
              <div>
                <AutoComplete
                  option={dependList}
                  selectState={depend}
                  setSelectState={setDepend}
                  multiple={false}
                  defaultValue={false}
                  label={
                    "Send to " +
                    (accountInformation.Role === "Management" ||
                    accountInformation.Role === "Manager" ||
                    accountInformation.Role === "Hr" ||
                    Object.keys(teamInformationById.data).length === 0
                      ? "Approver"
                      : "Supervisor")
                  }
                  style={{ backgroundColor: "white", minWidth: "400px" }}
                />
              </div>
            ) : (
              <AutocompleteEmpty
                id="checkboxes-tags-demo"
                disableCloseOnSelect
                style={{ backgroundColor: "white" }}
                renderInput={(params) => (
                  <TextField
                    required
                    label={
                      "Send to " +
                      (accountInformation.Role === "Management" ||
                      accountInformation.Role === "Manager" ||
                      accountInformation.Role === "Hr" ||
                      Object.keys(teamInformationById.data).length === 0
                        ? "Approver"
                        : "Supervisor")
                    }
                    {...params}
                  />
                )}
              />
            )}
          </Grid>
          <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  size="small"
                  onChange={handleChecked}
                  checked={emergency}
                />
              }
              label="Emergency"
            />
            <FormHelperText>( Emergency Leave ? Check it. )</FormHelperText>
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
            Create
          </Button>
        </DialogActions>
        <Snackbar />
      </form>
    </LocalizationProvider>
  );
};

export default FormLeaveRequestUpdate;
