import React from 'react'
import Grid from '@material-ui/core/Grid'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import Card from '@mui/material/Card';
import logo from '../../../../assets/logo.png'
const useStyles = makeStyles(styles)

const CardAuth = ({ children }) => {
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
          <Card className={classes.card} style={{borderRadius: '15px'}}>
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
                {children}
            </Grid>
          </Card>
        </Grid>
      </div>
    </Grid >
  );
}

export default CardAuth