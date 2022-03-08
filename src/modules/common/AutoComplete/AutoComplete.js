import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { makeStyles } from "@material-ui/core";
import styles from "./styles";

import Paper from "@material-ui/core/Paper";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles(styles);

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutoComplete = ({
  className,
  option, //{text,id}
  selectState,
  required,
  setSelectState,
  limit = 9999,
  disabled = false,
  multiple = true,
  label,
  defaultValue=[],
  resetTextField = false,
  setResetTextField,
  ...props
}) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(defaultValue ? defaultValue : null);
console.log(option);
  useEffect(() => {
    if (resetTextField) {
      setValue(null);
      setResetTextField(false)
    }
  }, [resetTextField]);
  const handleChange = (event, values) => {
    try {
      if(values){
         setValue(values);
      setSelectState(values);
      }else{
        setValue(values);
        setSelectState({});
      }
     
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {multiple === true ? (
        <Autocomplete
          multiple={multiple}
          id="checkboxes-tags-demo"
          options={option}
          value={value}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={handleChange}
          disableCloseOnSelect={multiple === true ? true : false}
          disabled={disabled}
          required={required}
          getOptionLabel={(option) => option.text}
          renderOption={(props, option, { selected }) => (
            <li {...props} key={option.id}>
              <Checkbox
                icon={icon}
                key={option.id}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.text}
            </li>
          )}
          style={{ width: "1000px" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              required={multiple ? value.length === 0 : !value} // check array
            />
          )}
          {...props}
        />
      ) : (
        <Autocomplete
          options={option}
          value={value}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          getOptionLabel={(option) => option.text}
          renderOption={(props, option, { selected }) => (
            <li {...props} key={option.id}>
              {option.text}
            </li>
          )}
          style={{ width: "1000px" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              required={multiple ? value.length === 0 : !value} // check array
            />
          )}
          {...props}
        />
      )}
    </>
  );
};

export default AutoComplete;
