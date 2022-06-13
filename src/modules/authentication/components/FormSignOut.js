import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import {
  getCookieFromBrowser,
  setCookie,
  clearCookie,
} from "../../../utils/cookie";

import classNames from "classnames";

import CircularProgress from "../../common/CircularProgress";
import logo from "../../../assets/logo.png";

const useStyles = makeStyles(() => ({
  content: {
    minHeight: "100vh",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    width: "72px",
    height: "40px",
    marginBottom: "30px",
  },
}));

const FormSignOut = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const clearSection = async () => {
      await clearCookie("a");
      await clearCookie("uid");
      await clearCookie("Role");
      await navigate("/sign-in");
    };
    clearSection();
  }, []);

  return (
    <div className={classes.content}>
      <img src={logo} alt="Logo" className={classes.logo} />
      <CircularProgress />
    </div>
  );
};

export default FormSignOut;
