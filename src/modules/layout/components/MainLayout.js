import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import MainHead from './MainHead';
import Snackbar from './Snackbar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { drawerWidth, navHeight } from './Attribute';

const useStyles = makeStyles(() => ({
    paper: {
        minWidth: `calc(100% - ${drawerWidth})`,
        minHeight: `calc(100vh - ${navHeight})`,
        marginTop: navHeight,
        // background: '#FFFAFA',//#FFF5EE,'#FFE4E1'      

    },
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol !important"',     
      ].join(','),
}));

function MainLayout({ title, children }) {
    const classes = useStyles()
    const navigate = useNavigate();
    return (
        <>
            <MainHead title={title ? title : 'Home'} />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Navbar />
                <Sidebar/>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3 }}
                    className={classes.paper}
                >
                    {children ? children : ''}
                </Box>

            </Box>
            <Snackbar />
        </>

    );
}
export default MainLayout