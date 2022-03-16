import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../common/Typography/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CardLeaveTypeInformation from './CardLeaveTypeInformation';
import { Divider } from '@mui/material';
const useStyles = makeStyles(() => ({
    Topic: {
        marginBottom: '10px',
    },
    box: {
        padding: '40px '
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

const ContentLeaveType = () => {
    const classes = useStyles()

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box className={classes.box}>
            <Typography variant='h3' color='pink' fontWeight='medium'>
                Leave Type
            </Typography>
            <Box sx={{ width: '100%', typography: 'body1', marginTop: '15px' }}>
                <Divider/>
                <CardLeaveTypeInformation />
            </Box>
        </Box>
    )
}

export default ContentLeaveType
