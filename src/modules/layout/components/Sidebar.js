import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@material-ui/core/styles'
import { useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { getAccountInformation } from '../../identity/actions'
import { useSelector, useDispatch } from 'react-redux'
import Skeleton from '@mui/material/Skeleton';
import { Link } from 'react-router-dom'
import { drawerWidth, navHeight } from './Attribute';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';

const useStyles = makeStyles(() => ({
    drawer: {
        marginTop: navHeight,
        width: drawerWidth,
        flexShrink: '0',
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },

    },
    listTopic: {
        margin: '0px 0px 5px 15px',
        color: '#C91F92',
        fontWeight: 'bold',
        borderWidth: '0px !important'
    },
    box: {
        background: '#FFFFFF',
        overflowX: 'hidden !important',
        [`&::-webkit-scrollbar`]: {
            display: 'none',
        },
        [`&:hover::-webkit-scrollbar`]: {
            width: '10px !important',
            display: 'block',
        },
        [`&:hover::-webkit-scrollbar-thumb:hover`]: {
            background: '#ff3968 !important'
        },

        [`&:hover::-webkit-scrollbar-thumb`]: {
            background: 'transparent',
            borderRadius: '10px',
            backgroundColor: '#ffd1dc',
        },
        borderWidth: '0px !important',


    },
    listItem: {
        [`& .css-cveggr-MuiListItemIcon-root`]: {
            minWidth: '30px',
            marginRight: '12px !important',
        },
        [`& .css-10hburv-MuiTypography-root`]: {
            fontWeight: '600px !important',
            fontSize: '14px !important',

        },
        borderRadius: '100px 0px 0px  100px!important',
        marginLeft: '10px !important',

    },
    margintop: {
        marginTop: '12px',
    },
    menuOnClick: {
        backgroundColor: '#C91F92',
        borderRadius: '100px 0px 0px 100px',

    },
    list:{
        paddingTop:'0 !important',
    }

}));


const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
      },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
function Sidebar(props) {
    const classes = useStyles()
    const theme = useTheme();
    const navigate = useNavigate();
    // console.log(SidebarData);
    const dispatch = useDispatch()
    const { handleDrawerClose, open } = props




    const { accountInformation } = useSelector(state => state.accountReducer)

    useEffect(() => {
        dispatch(getAccountInformation())
    }, [])

    let Role = accountInformation.Role


    return (
        <>
            <CssBaseline />
            <Drawer
                variant="permanent"
                className={classes.drawer}
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                {/* <Toolbar /> */}
                <Divider />
                <Box sx={{ overflow: 'auto' }} className={classes.box}>
                    <div className={classes.margintop} />
                    {SidebarData.map((item, index) => {
                        return (
                            <List key={index} className={classes.list}>
                                {open ?
                                    <div className={classes.listTopic}>
                                        {item.title}
                                    </div> : item.title !== 'Main' && <Divider />
                                }
                                {
                                    item.subNav.map((subItem, index1) => {
                                        if (Role) {
                                            return (
                                                subItem.role.map((role) => {
                                                    if (role == Role) {
                                                        var regex = new RegExp("^" + subItem.path + "$")
                                                        var regex2 = new RegExp(subItem.path + "/")
                                                        // console.log(window.location.pathname);
                                                        // console.log("AD : " + subItem.title);
                                                        return (
                                                            <Link to={subItem.path}>
                                                                <ListItem
                                                                    button
                                                                    key={subItem.path}
                                                                    className={open && classes.listItem}
                                                                    style={regex.test(window.location.pathname) || regex2.test(window.location.pathname) ? {
                                                                        backgroundColor: '#C91F92',
                                                                        width: '100% !important',
                                                                        borderRadius: open && '100px 0px 0px 100px',
                                                                    } : {}}
                                                                >
                                                                    <ListItemIcon
                                                                        style={regex.test(window.location.pathname) || regex2.test(window.location.pathname) ? { color: '#FFFFFF' } : {}}

                                                                    >
                                                                        {subItem.icon}
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={subItem.title} style={regex.test(window.location.pathname) || regex2.test(window.location.pathname) ? { color: '#FFFFFF' } : {}} />
                                                                </ListItem>
                                                            </Link>

                                                        );
                                                    }
                                                })
                                            )
                                        } else {
                                            return (
                                                <ListItem button key={subItem.path} className={classes.listItem}>
                                                    <Skeleton width={'100%'} height={40} animation="wave" />
                                                </ListItem>
                                            );
                                        }

                                    })
                                }
                            </List>
                        )
                    })}
                </Box>
            </Drawer>
        </>

    );
}
export default Sidebar