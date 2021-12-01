import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import EmailIcon from '@material-ui/icons/Email'
import { makeStyles } from '@material-ui/core/styles'
import logo from '../../../assets/logo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import { encodeB64,decodeB64 } from '../../../utils/crypto';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    logo: {
        width: '72px',
        height: '40px',
    },
    appbar: {
        minHeight: '64px',
    },
    logout: {
        height:'40px',
    }
}));

function Navbar() {
    const classes = useStyles()
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }} >            
            <AppBar position="static" className={classes.appbar} color='inherit'>               
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <img src={logo} alt="Logo" className={classes.logo} />
                    </Typography>
                    <Button color="inherit" className={classes.logout} onClick={() => {navigate('/sign-out');}}>Sign Out</Button>                    
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <LogoutIcon />
                    </IconButton> */}
                    
                </Toolbar>
            </AppBar>
        </Box>

    );
}
export default Navbar