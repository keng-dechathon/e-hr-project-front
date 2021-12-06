import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import MainHead from './MainHead';
import Snackbar from './Snackbar';
const useStyles = makeStyles(() => ({

}));

function MainLayout() {
    const classes = useStyles()
    const navigate = useNavigate();
    return (
        <>
            <MainHead title="Home" />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Navbar />
                <Sidebar />
                <Snackbar/>
            </Box>
        </>

    );
}
export default MainLayout