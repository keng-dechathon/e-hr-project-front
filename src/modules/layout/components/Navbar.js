import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles'
import logo from '../../../assets/logo.png'
import { getAccountInformation } from '../../identity/actions'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { navHeight } from './Attribute';
import { Divider } from '@mui/material';



const useStyles = makeStyles((theme) => ({
    logo: {
        width: '72px',
        height: '40px',
    },
    appbar: {
        minHeight: navHeight,
    },
    logout: {
        color: 'rgb(161, 51, 51) !important',
        height: '40px',
        marginLeft: '20px !important',
      
        // [theme.breakpoints.down('xs')]: {
        //     fontSize: '10px !important',             
        // },
    },
    name: {
        padding: '6px 6px',
        fontSize: '14px !important',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },

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
                <Typography className={classes.name} style={{ paddingRight: '30px' }}>
                    {accountInformation.Role ? accountInformation.Role.toUpperCase() : <Skeleton width={100} height={40} animation="wave" />}
                </Typography>
                <Divider orientation="vertical" flexItem variant="middle" />
                <Button color="inherit" className={classes.logout} onClick={() => { navigate('/sign-out'); }}>
                    Sign Out
                </Button>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar