import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../common/Typography/Typography';
import Box from '@mui/material/Box';
import CardMeeting from './view/CardMeetingView';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CardMeetingEdit from './edit/CardMeetingEdit';
const useStyles = makeStyles((theme) => ({
    Topic: {
        marginBottom: '10px',
    },
    box: {
        padding: '20px',
    },
    tabitem: {
        // marginRight: '10px !important',
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
        '& .css-13xfq8m-MuiTabPanel-root': {
            padding: ' 24px 0 0 0 !important'

        },
    },
    headerTitle: {
        [theme.breakpoints.down("xs")]: {
          fontSize: "30px ",
        },
      },
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
                <Typography variant='h3' color='pink' fontWeight='medium' className={classes.headerTitle}>
                    Meeting Room Booking
                </Typography>

                {/* <Box className={classes.box2}>
                <CardMeeting />
            </Box> */}
                <Box sx={{ width: '100%', typography: 'body1', marginTop: '10px' }} className={classes.box2}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} className={classes.tablist}>
                                <Tab label="View" value="1" className={classes.tabitem} />
                                <Tab label="Edit" value="2" className={classes.tabitem} />
                            </TabList>
                        </Box>
                        <TabPanel value="1" style={{ padding: '0px !important' }}>
                            <CardMeeting />
                        </TabPanel>
                        <TabPanel value="2">
                            <CardMeetingEdit />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </>
    )
}

export default ContentMeeting
