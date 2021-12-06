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

        // width: `calc(100% - ${drawerWidth}px)`,
        // height: `calc(100vh - ${navHeight}px)`,
        marginTop: navHeight,
    },
    box: {
        width:'100%',
        height:'100%',
        // background: 'linear-gradient(180deg, #EF6079 0%, rgba(239, 96, 121, 0.642708) 0.01%, rgba(239, 96, 121, 0.39) 0.02%, rgba(239, 96, 121, 0.11) 99.99%, rgba(239, 96, 121, 0) 100%)',
    }
}));

function MainLayout({ title, children }) {
    const classes = useStyles()
    const navigate = useNavigate();
    return (
        <>
            <MainHead title={title ? title : 'Home'} />
            <Box sx={{ display: 'flex' }} className={classes.box}>
                <CssBaseline />
                <Navbar />
                <Sidebar />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3 }}
                    className={classes.paper}
                >
                    <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                        Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                        nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                        leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                        feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                        consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                        sapien faucibus et molestie ac.
                    </Typography>
                    <Typography paragraph>
                        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                        eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                        neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                        tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                        sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                        tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                        gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                        et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                        tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                        eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                        posuere sollicitudin aliquam ultrices sagittis orci a.
                    </Typography>
                    {children ? children : ''}
                </Box>

            </Box>
            <Snackbar />
        </>

    );
}
export default MainLayout