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

  avatar: {
    height: "200px",
    width: "200px",
  },

  btnfile: {
    position: "absolute !important",
    border: `4px solid #FAF8F6`,
    background: "rgb(0, 0, 0) !important",
    background: "rgba(0, 0, 0, 0.3) !important" /* Black see-through */,
    color: "#f1f1f1 !important",
    transition: ".5s ease !important",
    opacity: "0 !important",
    color: "white !important",
    width: "150px !important",
    height: "150px !important",
    // borderBottomLeftRadius: '50px',  /* 100px of height + 10px of border */
    // borderBottomRightRadius: '50px', /* 100px of height + 10px of border */
    textAlign: "center !important",
    // "&:hover": {
    //     opacity: '1 !important'
    // },
  },
  imgBox: {
    boxSizing: "border-box",
    // position: 'relative',
    marginBottom: "10px",
    "&:hover": {
      opacity: "1 !important",
    },
  },
  flex: {
    display: "flex",
    flexDirection: "column",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    border: `4px solid #FAF8F6`,
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px !important",
    width: "150px !important",
    height: "150px !important",
    // box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    // box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    // boxShadow: '15px 10px 25px 0px  #3fa1a9',
  },
  fileinput: {
    display: "none",
  },
  smallAvatar: {
    width: "35px",
    height: "35px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px !important",
    background:
      "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
    // '&:hover': {
    //     background: 'radial-gradient(circle, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',

    // },
  },

  badge: {
    [`&:hover`]: {
      "& $smallAvatar": {
        background:
          "radial-gradient(circle, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
      },
      "& $btnfile": {
        opacity: "1 !important",
      },
    },
  },
  requirelabel:{
    color: "red !important"
  },
});
