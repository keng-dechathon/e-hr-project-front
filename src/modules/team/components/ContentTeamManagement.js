import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../common/Typography/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CardTeam from './CardTeam';
const useStyles = makeStyles(() => ({
    emptyNews: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Topic: {
        marginBottom: '10px',
    },
    box: {
        padding: '40px 40px 0 40px '
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

const ContentTeamManagement = () => {
    const classes = useStyles()

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box className={classes.box}>
            <Typography variant='h3' color='pink' fontWeight='medium'>
                Teams Management
            </Typography>
            <Box sx={{ width: '100%', typography: 'body1', marginTop: '10px' }}>
                <CardTeam />

            </Box>
        </Box >
    )
}

export default ContentTeamManagement
