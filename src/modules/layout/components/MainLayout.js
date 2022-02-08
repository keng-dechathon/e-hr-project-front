import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MainHead from './MainHead';
import Snackbar from './Snackbar';
import { drawerWidth, navHeight } from './Attribute';
import { padding } from '@mui/system';

const useStyles = makeStyles(() => ({
    paper: {
        minWidth: `calc(100% - ${drawerWidth})`,
        minHeight: `calc(100vh - ${navHeight})`,
        marginTop: navHeight,

        background: '#FFFAFA ',//#FFF5EE,'#FFE4E1'  #FFFAFA    

    },
}));

function MainLayout({ title, children }) {
    const classes = useStyles()

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <MainHead title={title ? title : 'Home'} />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Navbar handleDrawerClose={handleDrawerClose} open={open} handleDrawerOpen={handleDrawerOpen} />
                <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
                <Box
                    component="main"
                    sx={{ flexGrow: 1 }}
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