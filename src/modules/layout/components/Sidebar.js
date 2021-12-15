import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
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
import { borderRadius } from '@mui/lab/node_modules/@mui/system';

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


}));

function Sidebar() {
    const classes = useStyles()
    const navigate = useNavigate();
    // console.log(SidebarData);
    const dispatch = useDispatch()



    const { accountInformation } = useSelector(state => state.accountReducer)

    useEffect(() => {
        dispatch(getAccountInformation())
    }, [])

    let Role = accountInformation.Role

    return (
        <>
            <Drawer
                variant="permanent"
                className={classes.drawer}

            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }} className={classes.box}>
                    <div className={classes.margintop} />
                    {SidebarData.map((item, index) => {
                        return (
                            <List key={index} className={classes.list}>
                                <div className={classes.listTopic}>
                                    {item.title}
                                </div>
                                {
                                    item.subNav.map((subItem, index1) => {
                                        if (Role) {
                                            return (
                                                subItem.role.map((role) => {
                                                    if (role == Role) {
                                                        var regex = new RegExp(subItem.path)
                                                        console.log(window.location.pathname);
                                                        // console.log("AD : " + subItem.title);
                                                        return (
                                                            <Link to={subItem.path}>
                                                                <ListItem
                                                                    button
                                                                    key={subItem.path}
                                                                    className={classes.listItem}
                                                                    style={regex.test(window.location.pathname) ? {
                                                                        backgroundColor: '#C91F92',
                                                                        width: '100% !important',
                                                                        borderRadius: '100px 0px 0px 100px',
                                                                    } : {}}
                                                                >
                                                                    <ListItemIcon
                                                                        style={regex.test(window.location.pathname) ? { color: '#FFFFFF' } : {}}

                                                                    >
                                                                        {subItem.icon}
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={subItem.title} style={regex.test(window.location.pathname) ? { color: '#FFFFFF' } : {}} />
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