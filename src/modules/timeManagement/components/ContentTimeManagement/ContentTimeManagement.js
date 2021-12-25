import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../../common/Typography/Typography'
import styles from './styles'

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import CardHoliday from '../TabHoliday/CardHolidays';
import CardWorkingTime from '../TabWorkingTime/CardWorkingTime';
import CardDayOff from '../TabDayOff/CardDayOff';
const useStyles = makeStyles(styles)

const ContentTimeManagement = () => {
    const classes = useStyles()

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box className={classes.box}>
            <Typography variant='h3' color='pink' fontWeight='medium'>
                Time Management
            </Typography>
            <Box sx={{ width: '100%', typography: 'body1', marginTop: '10px' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} className={classes.tablist}>
                            <Tab label="Holiday" value="1" className={classes.tabitem} />
                            <Tab label="Day Off" value="2" className={classes.tabitem} />
                            <Tab label="Working Time" value="3" className={classes.tabitem} />
                        </TabList>
                    </Box>
                    <TabPanel value="1" className={classes.tabpanel}>
                        <CardHoliday />
                    </TabPanel>
                    <TabPanel value="2" className={classes.tabpanel}>
                        <CardDayOff/>
                    </TabPanel>
                    <TabPanel value="3" className={classes.tabpanel}>
                        <CardWorkingTime />
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    )
}

export default ContentTimeManagement
