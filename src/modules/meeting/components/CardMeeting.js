import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { getEmployeeInformtion } from '../../employeeInfomation/actions';
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import DataGrid from '../../common/DataGrid';
import EditIcon from '@mui/icons-material/Edit';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { getMeetingRoomInformation, getMeetingInformationById } from '../actions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModalUpdate from '../../common/ModalUpdate'
import { QuickSearchToolbar, escapeRegExp } from '../../common/QuickSearchToolbar/QuickSearchToolbar'
import { Button } from '@mui/material'
import moment from 'moment';
import { navHeight } from '../../layout/components/Attribute';
import SchedulerMeeting from './SchedulerMeeting'



const useStyles = makeStyles(() => ({
    ButtonAdd: {
        display: 'flex'
    },
    box: {
        marginTop: '20px',
    },
    cardcontant: {
        padding: 0,
        "&:last-child": {
            paddingBottom: '0 !important'
        }
    },
}));



const CardMeeting = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { meetingRoomInformation, meetingInformationById } = useSelector(state => state.meetReducer)
    const { accountInformation } = useSelector(state => state.accountReducer)
    const { empInformation } = useSelector(state => state.employeeReducer)
    const [open, setOpen] = useState(false)
    const [ID, setID] = useState('')
    const [deleteID, setDeleteID] = useState('')
    const meetRoom = []
    const myMeeting = []
    const members = []
    const uid = accountInformation.Emp_id ? accountInformation.Emp_id : ''

    useEffect(() => {
        dispatch(getEmployeeInformtion())
        dispatch(getMeetingRoomInformation())
        dispatch(getMeetingInformationById('', '', String(uid)))
    }, [uid])



    useEffect(() => {
        // if (deleteID !== '') {
        //     const onDelete = async (id) => {
        //         await deleteLeaveType([id])
        //         dispatch(getLeaveTypeInformation())
        //     }
        //     onDelete(deleteID)
        //     setDeleteID('')
        // }
    }, [deleteID])

    const handleClose = () => { setOpen(false) }

    const onClickUpdate = React.useCallback(
        (id) => () => {
            setOpen(true)
            setID(id)
        },
        [],
    );

    const onClickDelete = React.useCallback(
        (id) => () => {
            setDeleteID(id)
        },
        [],
    );

    const onClickAdd = () => {
        setOpen(true)
    }
    const setMeetRoom = () => {
        if (Object.keys(meetingRoomInformation).length !== 0) {
            meetingRoomInformation.data.map((item, index) => {
                meetRoom.push({
                    id: item.Room_Id,
                    text: item.Room_Name,
                    url: item.Description,
                })
            })
        }
    }

    const setMyMeet = () => {
        if (Object.keys(meetingInformationById).length !== 0) {
            meetingInformationById.data.map((item, index) => {

                let day = moment(item.Date).format('DD')
                let month = moment(item.Date).format('MM') - 1
                let year = moment(item.Date).format('YYYY')
                let hourStart = moment(item.Start_at, ["h:mm A"]).format("HH")
                let minStart = moment(item.Start_at, ["h:mm A"]).format("mm")
                let hourEnd = moment(item.End_at, ["h:mm A"]).format("HH")
                let minEnd = moment(item.End_at, ["h:mm A"]).format("mm")
                let location = Object.keys(meetingRoomInformation).length !== 0 ? meetingRoomInformation.data.filter(room => room.Room_Id === item.Room_Id)[0].Room_Name : 'null'

                myMeeting.push({
                    id: item.Meet_Id,
                    roomId: item.Room_Id,
                    title: item.Subject,
                    startDate: new Date(year, month, day, hourStart, minStart),
                    endDate: new Date(year, month, day, hourEnd, minEnd),
                    location: location,
                    members: item.Members.map(n => parseInt(n)),
                })
            })
        }
    }

    const setMember = () => {
        if (Object.keys(empInformation).length !== 0) {
            empInformation.data.map((item, index) => {
                members.push({
                    id: parseInt(item.Emp_id),
                    text: item.Name,
                })
            })
        }
    }
    setMember()
    setMyMeet()
    setMeetRoom()


    return (
        <>
            <Box

            >
                {
                    meetRoom.length !== 0 && myMeeting.length !== 0 && members.length !== 0 && uid !== '' ? <SchedulerMeeting meetRoom={meetRoom} myMeeting={myMeeting} members={members} uid={uid} /> : ''
                }
            </Box>


        </>
    )
}

export default CardMeeting
