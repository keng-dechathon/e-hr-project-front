import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../common/Typography/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CardMeeting from './CardMeeting';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
const useStyles = makeStyles(() => ({
    Topic: {
        marginBottom: '10px',
    },
    box: {
        padding: '20px',
    },
    tabitem: {
        marginRight: '30px !important',
        padding: '0 !important',
        minWidth: '150px !important',
        textTransform: 'none !important',
        fontWeight: 'bold !important',
        fontSize: '18px !important',
        '&:hover': {
            color: '#C91F92 !important',
            opacity: 1,
        },
        '&.Mui-selected': {
            color: '#C91F92 !important',
        },

    },
    tablist: {
        '& .MuiTabs-indicator': {
            backgroundColor: '#C91F92 !important',

        },

    },
    tabpanel: {
        padding: ' 16px 0 !important',
    }
}));

const ContentMeeting = () => {
    const classes = useStyles()

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const currentDate = '2018-11-01';
    const schedulerData = [
        { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
        { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
    ];
    return (
        <>
            <Box className={classes.box}>


                <Typography variant='h3' color='pink' fontWeight='medium'>
                    Meeting Room Booking
                </Typography>
            </Box>
            <CardMeeting />
        </>
    )
}

export default ContentMeeting
