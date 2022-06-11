import React, { useEffect } from "react";
// import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../../assets/logo.png";
import { getAccountInformation } from "../../identity/actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { navHeight } from "./Attribute";
import { Divider } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerWidth } from "./Attribute";
import CssBaseline from "@mui/material/CssBaseline";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: "72px",
    height: "40px",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  appbar: {
    minHeight: navHeight,
  },
  emptyitem: {
    [theme.breakpoints.down("xs")]: {
      width: "6px",
    },
  },
  appbarOpen: {
    minHeight: navHeight,
    [theme.breakpoints.down("xs")]: {
      display: "none !important",
    },
  },
  logout: {
    color: "rgb(161, 51, 51) !important",
    height: "40px",
    marginLeft: "20px !important",

    // [theme.breakpoints.down('xs')]: {
    //     fontSize: '10px !important',
    // },
  },
  name: {
    padding: "6px 6px",
    fontSize: "14px !important",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      display: "none !important",
    },
  },
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: 1251,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth})`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Navbar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { open, handleDrawerOpen } = props;
  const { accountInformation } = useSelector((state) => state.accountReducer);

  useEffect(() => {
    dispatch(getAccountInformation());
  }, []);

  // console.log(accountInformation);

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={open ? classes.appbarOpen : classes.appbar}
        color="inherit"
        open={open}
      >
        <Toolbar style={{ minHeight: navHeight }}>
          <div className={classes.emptyitem} />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={classes.IconButtonOnHover}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={logo} alt="Logo" className={classes.logo} />
          </Typography>
          {/* <Button color="inherit" className={classes.logout} onClick={async() => {await getinfo()}}>check</Button>           */}
          <Typography className={classes.name} fontWeight="bold">
            {accountInformation.Firstname ? (
              accountInformation.Firstname.toUpperCase()
            ) : (
              <Skeleton width={100} height={40} animation="wave" />
            )}
          </Typography>
          <Typography className={classes.name} fontWeight="bold" >
            {accountInformation.Lastname ? (
              accountInformation.Lastname.toUpperCase()
            ) : (
              <Skeleton width={100} height={40} animation="wave" />
            )}
          </Typography>
          <Typography className={classes.name} style={{ paddingRight: "30px",paddingLeft:"0px" }}>
            {accountInformation.Role ? (
              `( ${accountInformation.Role} )`
            ) : (
              <Skeleton width={100} height={40} animation="wave" />
            )}
          </Typography>
          <Divider orientation="vertical" flexItem variant="middle" />
          <Button
            color="inherit"
            className={classes.logout}
            onClick={() => {
              navigate("/sign-out");
            }}
          >
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Navbar;
