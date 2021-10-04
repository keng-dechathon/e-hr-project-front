import React, { useState, useEffect, Children } from 'react'
import Grid from '@material-ui/core/Grid'
import EmailIcon from '@material-ui/icons/Email'
import { useForm } from 'react-final-form-hooks'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import FormSignin from '../FormSignin';
import logo from '../../../../assets/logo.png'
const useStyles = makeStyles(styles)

const CardSignin = ({ Children }) => {
  const classes = useStyles()

  return (
    <Grid
      container
    >
      <div className={classNames(classes.center, classes.root)}>
        <Grid
          item
          xs={12}
          sm={12}
          md={9}
          lg={8}
        >
          <Card className={classes.card}>
            <Grid
              item
              xs={4}
              sm={5}
              className={classNames(classes.center, classes.logoField)}
            >
                <img src={logo} alt="Logo" className={classes.logo}/>
            </Grid>
            <Grid
              item
              xs={8}
              sm={7}
              className={classNames(classes.center, classes.form)}
              
            >              
                <FormSignin/>               
            </Grid>
          </Card>
        </Grid>
      </div>
    </Grid >
  );
}

export default CardSignin