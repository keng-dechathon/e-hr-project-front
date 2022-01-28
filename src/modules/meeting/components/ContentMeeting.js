import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../common/Typography/Typography';
import Box from '@mui/material/Box';
import CardMeeting from './CardMeeting';

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
    },
    box2: {
      
    }
}));

const ContentMeeting = () => {
    const classes = useStyles()

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Box className={classes.box}>
                <Typography variant='h3' color='pink' fontWeight='medium'>
                    Meeting Room Booking
                </Typography>
            </Box>
            <Box className={classes.box2}>
                <CardMeeting />
            </Box>


        </>
    )
}

export default ContentMeeting
