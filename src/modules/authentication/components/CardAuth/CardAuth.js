import React from "react";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Card from "@mui/material/Card";
import logo from "../../../../assets/logo.png";
const useStyles = makeStyles(styles);

const CardAuth = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <div className={classNames(classes.center, classes.root)}>
       
          <Card className={classes.card} style={{ borderRadius: "15px",maxWidth:"1000px" }}>
            <Grid
              item
              xs={4}
              sm={5}
              className={classNames(classes.center, classes.logoField)}
            >
              <img src={logo} alt="Logo" className={classes.logo} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={7}
              className={classNames(classes.center, classes.form)}
            >
              {children}
            </Grid>
          </Card>
        
      </div>
    </Grid>
  );
};

export default CardAuth;
