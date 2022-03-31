export default (theme) => ({
  box: {
    padding: "40px 40px 0 40px ",
    [theme.breakpoints.down("xs")]: {
      padding: "20px 20px  0 20px ",
    },
  },
  margintop: {
    marginTop: "10px",
  },
  tabitem: {
    marginRight: "30px !important",
    padding: "0 !important",
    minWidth: "150px !important",
    textTransform: "none !important",
    fontWeight: "bold !important",
    fontSize: "18px !important",
    "&:hover": {
      color: "#C91F92 !important",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#C91F92 !important",
    },
  },
  tablist: {
    "& .MuiTabs-indicator": {
      backgroundColor: "#C91F92 !important",
    },
  },
  padding: {
    padding: "24px",
  },
  tabpanel: {
    [theme.breakpoints.down("xs")]: {
      padding: " 16px 0 0 0 !important",
    },
  },
  headerTitle: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "30px ",
    },
  },
});
