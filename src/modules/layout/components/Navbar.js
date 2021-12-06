import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles'
import logo from '../../../assets/logo.png'
import { getAccountInformation } from '../../identity/actions'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getinfo } from '../../identity/actions';
import Skeleton from '@mui/material/Skeleton';
const useStyles = makeStyles(() => ({
    logo: {
        width: '72px',
        height: '40px',
    },
    appbar: {
        minHeight: '64px',
    },
    logout: {
        color: '#FF0000',
        height: '40px',
    },
    name: {
        padding: '6px 6px',
        fontSize: '14px !important',
    }
}));

function Navbar() {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { accountInformation } = useSelector(state => state.accountReducer)

    useEffect(() => {
        dispatch(getAccountInformation())
    }, [])

    // console.log(accountInformation);

    return (
        <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            className={classes.appbar}
            color='inherit'
        >
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <img src={logo} alt="Logo" className={classes.logo} />

                </Typography>
                {/* <Button color="inherit" className={classes.logout} onClick={async() => {await getinfo()}}>check</Button>           */}
                <Typography className={classes.name}>
                    {accountInformation.Firstname ? accountInformation.Firstname.toUpperCase() : <Skeleton width={100} height={40} animation="wave" />}
                </Typography>
                <Typography className={classes.name}>
                    {accountInformation.Lastname ? accountInformation.Lastname.toUpperCase() : <Skeleton width={100} height={40} animation="wave" />}
                </Typography>
                <Typography className={classes.name}>
                    Role :
                </Typography>
                <Typography className={classes.name} style={{ paddingRight: '40px' }}>
                    {accountInformation.Role ? accountInformation.Role.toUpperCase() : <Skeleton width={100} height={40} animation="wave" />}
                </Typography>
                <Button color="inherit" className={classes.logout} onClick={() => { navigate('/sign-out'); }}>Sign Out</Button>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar