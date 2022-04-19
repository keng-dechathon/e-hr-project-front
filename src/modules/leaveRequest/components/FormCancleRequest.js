import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-final-form-hooks";
import Button from "../../common/Button";
import { makeStyles } from "@material-ui/core/styles";
import { DialogActions } from "@mui/material";
import Divider from "@mui/material/Divider";
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
import Select from "@mui/material/Select";
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
import { cancleLeaveRequest,getLeaveRequestInformation } from "../actions";

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

const FormCancleRequest = (props) => {
  const classes = useStyles();
  const { handleClose, columnData } = props;
  const dispatch = useDispatch();
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
  const [start, setStart] = useState(
    Object.keys(columnData).length !== 0
      ? moment(columnData.row.Begin).format()
      : new Date()
  );
  const [end, setEnd] = useState(
    Object.keys(columnData).length !== 0
      ? moment(columnData.row.End).format()
      : new Date()
  );
  const [detail, setDetail] = useState(
    Object.keys(columnData).length !== 0 ? columnData.row.Detail : ""
  );
  const [emergency, setEmergency] = useState(
    Object.keys(columnData).length !== 0 ? columnData.row.Emergency : false
  );
  const [depend, setDepend] = useState({});
  const [comment, setComment] = useState(
    Object.keys(columnData).length !== 0 ? columnData.row.Comment : ""
  );
  let dependList = [];

  useEffect(() => {
    setType(
      columnData && Object.keys(leaveTypeInformation).length !== 0
        ? leaveTypeInformation.data.filter(
            (temp) => temp.Type_name === columnData.row.Type_name
          )[0].id
        : ""
    );
  }, [leaveTypeInformation]);

  const setDependList = () => {
    if (
      Object.keys(teamInformationById).length !== 0 &&
      Object.keys(empInformation).length !== 0
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
    }
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const onSubmit = async () => {
    await cancleLeaveRequest(String(columnData.id), String(depend.id));
    dispatch(getLeaveRequestInformation());
    handleClose();
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
            {Object.keys(leaveTypeInformation).length !== 0 ? (
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
                  disabled
                  onChange={handleChangeType}
                  fullWidth
                >
                  {Object.keys(leaveTypeInformation).length !== 0 &&
                    leaveTypeInformation.data.map(({ id, Type_name }) => {
                      return <MenuItem value={id}>{Type_name}</MenuItem>;
                    })}
                </Select>
              </FormControl>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} style={{ display: "flex" }}>
            <DateTimePicker
              value={start}
              disabled
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
              disabled
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
              disabled
              label="Detail"
              id="Detail"
              name="Detail"
              multiline
              rows={3}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderBottomWidth: 1 }} />
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
                  required
                  defaultValue={false}
                  label={"Select Approver"}
                  style={{
                    backgroundColor: "white",
                    minWidth: "400px",
                  }}
                />
              </div>
            ) : (
              ""
            )}
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
            Send Cancellation
          </Button>
        </DialogActions>
        <Snackbar />
      </form>
    </LocalizationProvider>
  );
};

export default FormCancleRequest;
