import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { makeStyles } from "@material-ui/core";
import styles from "./styles";
import { getMeetingInformationByMultiId } from "../../meeting/actions";
import { useSelector, useDispatch } from "react-redux";

import Paper from "@material-ui/core/Paper";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles(styles);

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutoCompleteMeeting = ({
  className,
  option, //{text,id}
  selectState,
  setSelectState,
  limit = 9999,
  disabled = false,
  multiple = true,
  resetStatus,
  setResetStatus,
  selectStateFilter,
  uid,
  ...props
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const [disableInput, setDisableInput] = useState<boolean>(
  //   value.length >= limit
  // );
  const [limitReached, setLimitReached] = useState(false);

  const [value, setValue] = React.useState([option[0]]);

  const handleChange = (event, values) => {
    let temp = values.map((item) => {
      return String(item.id);
    });
    setValue(values);
    setLimitReached(values.length >= limit);
    setSelectState(temp);
  };

  useEffect(() => {
    if (resetStatus) {
      let me = option.filter((temp) => String(temp.id) === String(uid));
      setValue(me);
      setResetStatus(false);
      dispatch(getMeetingInformationByMultiId("", "", [String(uid)]));
    }
    if (selectStateFilter === 2) {
      setValue([]);
    }
    if (selectStateFilter === 1) {
      let me = option.filter((temp) => String(temp.id) === String(uid));

      setValue(me);
      setResetStatus(false);
      dispatch(getMeetingInformationByMultiId("", "", [String(uid)]));
    }
  }, [resetStatus, selectStateFilter]);
  return (
    <Autocomplete
      multiple={multiple}
      id="checkboxes-tags-demo"
      value={value}
      options={option}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={handleChange}
      disableCloseOnSelect
      disabled={disabled}
      getOptionLabel={(option) => option.text}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option.id}>
          <Checkbox
            key={option.id}
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.text}
        </li>
      )}
      style={{ width: "1000px" }}
      renderInput={(params) => <TextField {...params} />}
      {...props}
    />
  );
};

export default AutoCompleteMeeting;
