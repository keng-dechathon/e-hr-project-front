export default (theme) => ({
  contained: {
    backgroundColor: "#2F80ED",
  },
  button: {
    borderRadius: "5px",
    textTransform: "none !important",
    fontSize: "16px !important",
    fontWeight: "400 !important",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  field: {
    "& .css-152mnda-MuiInputBase-input-MuiOutlinedInput-input": {
      [theme.breakpoints.down("xs")]: {
        padding: "0px",
      },
    },
    "&.css-2ehmn7-MuiInputBase-root-MuiOutlinedInput-root": {
      height: "34.5px",
    },
    "& .css-152mnda-MuiInputBase-input-MuiOutlinedInput-input": {
      padding: "10px",
      [theme.breakpoints.down("xs")]: {
        padding: "10px",
      },
    },
  },
});
