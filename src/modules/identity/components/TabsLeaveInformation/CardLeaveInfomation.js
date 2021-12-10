import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../../common/Typography/Typography'
import styles from './styles'
import Table from '../../../common/Table';
import { getLeaveInformation } from '../../../leave/actions';
import { useSelector, useDispatch } from 'react-redux'
import DataGrid from '../../../common/DataGrid';
const useStyles = makeStyles(styles)

const CardLeaveInfomation = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { leaveInformation } = useSelector(state => state.leaveReducer)

    let leaveDataFormat = [{}]//table data format
    let leaveDataHeader = []


    let myLeaveDataFormat = [] //table data format
    let myLeaveDataHeader = []

    useEffect(() => {
        dispatch(getLeaveInformation())

    }, [])


    const setLeaveInfoTableData = () => {
        if (Object.keys(leaveInformation).length !== 0) {
            leaveInformation.Leave_infomation.data.forEach((value, index) => {
                leaveDataHeader.push(value.Type_name)
                leaveDataFormat[0][value.Type_name] = value.Leaved               
            })
        }

    }



    const setMyLeaveTableData = () => {
        if (Object.keys(leaveInformation).length !== 0) {

            // console.log(leaveInformation.Leave_request);
            leaveInformation.Leave_request.data.map((value, index1) => {

                myLeaveDataHeader = Object.getOwnPropertyNames(value)
                myLeaveDataFormat.push({})
                Object.keys(value).map(function (key, index2) {
                    // console.log(index1);
                    // console.log(index1+" : "+key+" : "+value[key]);
                    myLeaveDataFormat[index1][key] = value[key]
                });

            })
            // console.log(myLeaveDataFormat);
        }
    }

    const setMyLeaveDataGrid = () => {
        if (Object.keys(leaveInformation).length !== 0) {
            leaveInformation.Leave_request.data.map((value, index1) => {

                myLeaveDataFormat.push(value)               
                Object.keys(value).map(function (key, index2) {
                    if (index1 == 0) myLeaveDataHeader.push({ field: key, headername: key, flex: 1 })
                    // console.log(index1);
                    // console.log(index1+" : "+key+" : "+value[key]);                   
                });

            })
            console.log(myLeaveDataFormat);
        }
        console.log(myLeaveDataHeader);
    }
    setLeaveInfoTableData()
    // setMyLeaveTableData()
    setMyLeaveDataGrid()

    return (
        <>
            <Typography variant="h6" fontWeight='bold' className={classes.topic}>Leave Information</Typography>
            <Table headers={leaveDataHeader} data={leaveDataFormat} disablePagination loading={Object.keys(leaveInformation).length !== 0 ? false : true} className={classes.table} align='center'/>
            <Typography variant="h6" fontWeight='bold' className={classes.topic}>My Leave</Typography>
            <DataGrid headers={myLeaveDataHeader?myLeaveDataHeader:''}  rows={myLeaveDataFormat?myLeaveDataFormat:''}/>
        </>
    )
}

export default CardLeaveInfomation
