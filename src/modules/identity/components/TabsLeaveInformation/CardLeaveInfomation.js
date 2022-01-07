import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../../common/Typography/Typography'
import styles from './styles'
import { getLeaveInformation } from '../../../leave/actions';
import { useSelector, useDispatch } from 'react-redux'
import DataGrid from '../../../common/DataGrid';
const useStyles = makeStyles(styles)

const CardLeaveInfomation = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { leaveInformation } = useSelector(state => state.leaveReducer)

    let leaveDataFormat = [{id:'0'}]
    let leaveDataHeader = []


    let myLeaveDataFormat = []
    let myLeaveDataHeader = []

    useEffect(() => {
        dispatch(getLeaveInformation())

    }, [])


    // const setLeaveInfoTableData = () => {
    //     if (Object.keys(leaveInformation).length !== 0) {
    //         leaveInformation.Leave_infomation.data.forEach((value, index) => {
    //             console.log(   leaveInformation.Leave_infomation.data);
    //             leaveDataHeader.push(value.Type_name)
    //             leaveDataFormat[0][value.Type_name] = value.Leaved
    //         })
    //     }

    // }
    const setLeaveInfoDataGrid = () => {
        if (Object.keys(leaveInformation).length !== 0) {

            leaveInformation.Leave_infomation.data.forEach((value, index) => {
                let name = value.Type_name        
                leaveDataHeader.push({ field: name, headerName: name, flex: 1 })
                leaveDataFormat[0][name] = value.Leaved

            })
      
        }
    

    }
    const setMyLeaveDataGrid = () => {
        if (Object.keys(leaveInformation).length !== 0) {
            leaveInformation.Leave_request.data.map((value, index1) => {
              
                myLeaveDataFormat.push(value)
                Object.keys(value).map(function (key, index2) {
                    if (index1 == 0) myLeaveDataHeader.push({ field: key, headerName: key, flex: 1 })
                });
            })
            myLeaveDataHeader.sort((a, b) => (a.field > b.field) ? 1 : ((b.field > a.field) ? -1 : 0))
            myLeaveDataHeader.sort((a, b) => (a.field == 'id') ? -1 : 1)
        }
  console.log(myLeaveDataFormat);

    }
    // setLeaveInfoTableData()
    setLeaveInfoDataGrid()
    setMyLeaveDataGrid()

    return (
        <>
            <Typography variant="h6" fontWeight='bold' className={classes.topic}>Leave Information (Day,Hour)</Typography>
            <DataGrid headers={leaveDataHeader ? leaveDataHeader : ''} rows={leaveDataFormat ? leaveDataFormat : ''} disablePagination={true}/>
            <Typography variant="h6" fontWeight='bold' className={classes.topic}>My Leave</Typography>
            <DataGrid headers={myLeaveDataHeader ? myLeaveDataHeader : ''} rows={myLeaveDataFormat ? myLeaveDataFormat : ''} />
        </>
    )
}

export default CardLeaveInfomation
