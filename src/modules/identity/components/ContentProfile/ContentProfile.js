import React from 'react'
import TypographyCustom from '../../../common/Typography/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../../common/Typography/Typography'
import styles from './styles'
import classNames from 'classnames'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CardPersonalInfo from '../CardInformation/CardPersonalInfo'
import CardWorkInfo from '../CardInformation/CardWorkInfo'
import CardContactInfo from '../CardInformation/CardContactInfo'
import CardChangePassword from '../CardAuthentication/CardChangePassword'
import CardChangeEmail from '../CardAuthentication/CardChangeEmail'

import { isEmail,isPhone } from '../../../../utils/validate'

const useStyles = makeStyles(styles)

const ContentProfile = () => {
    const classes = useStyles()

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };   
    return (
        <>
            <div className={classes.margintop} />
            <TypographyCustom variant='h3' color='pink' fontWeight='medium'>
                Account Profile
            </TypographyCustom>
            <Box sx={{ width: '100%', typography: 'body1', marginTop: '10px' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} className={classes.tablist}>
                            <Tab label="Profile" value="1" className={classes.tabitem} />
                            <Tab label="Leave Information" value="2" className={classes.tabitem} />
                            <Tab label="Authentication" value="3" className={classes.tabitem} />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <CardPersonalInfo />
                        <CardWorkInfo />
                        <CardContactInfo />
                    </TabPanel>
                    <TabPanel value="2">

                    </TabPanel>
                    <TabPanel value="3">
                        <Typography variant="h5" fontWeight='bold' className={classes.maintext}>Sign In Method</Typography>
                        <CardChangeEmail />
                        <CardChangePassword />
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    )
}

export default ContentProfile
