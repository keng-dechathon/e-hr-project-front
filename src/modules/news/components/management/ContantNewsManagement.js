import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { getAllNewsInformation } from '../../actions'
import { useSelector, useDispatch } from 'react-redux'

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CardNewsList from './CardNewsList';
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



const ContantNewsManagement = () => {
    const classes = useStyles()


    const dispatch = useDispatch()
    const [value, setValue] = React.useState('1');
    let items = []
    const { allNewsInformation } = useSelector(state => state.newsReducer)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {

        dispatch(getAllNewsInformation())
    }, [])

    const createNewsItem = () => {
        if (Object.keys(allNewsInformation).length !== 0) {
            allNewsInformation.data.map((value, index) => {
                items.push(value)
            })
        }

    }

    createNewsItem()

    return (
        <>
            <Box className={classes.box}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} className={classes.tablist}>
                            <Tab label="News Management" value="1" className={classes.tabitem} />
                        </TabList>
                    </Box>
                    <TabPanel value="1" className={classes.tabpanel}>
                        <CardNewsList items={items} />
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    )
}

export default ContantNewsManagement
