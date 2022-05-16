import React, { useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import styles from "./styles";
import { makeStyles } from "@material-ui/core";
import "./styles.css";

const useStyles = makeStyles(styles);

export function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export function QuickSearchToolbar(props) {
  const classes = useStyles();

  return (
    <Box
      sx={{
        pb: 0,
        justifyContent: "space-between",
        display: "flex",
        alignItems: "flex-start !important",
        width: "100%",
      }}
    >
      <TextField
        variant="outlined"
        label="Search"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        className={`${classes.field} .css-152mnda-MuiInputBase-input-MuiOutlinedInput-input .css-2ehmn7-MuiInputBase-root-MuiOutlinedInput-root`}
        sx={{
          width: {
            xs: 1,
            sm: "100%",
          },
          minWidth: {
            width: {
              xs: 1,
              sm: "350px",
            },
          },
          backgroundColor: "white",
        }}
        {...props}
      />
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
