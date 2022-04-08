import { borderRadius } from "@mui/system";

export default () => ({
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textfield: {
    "& input": {
      minHeight: "20px",
    },
    width: "100%",
  },

  massage: {
    marginBottom: "10px",
  },
});
