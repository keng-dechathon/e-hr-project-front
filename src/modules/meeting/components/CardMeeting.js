import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'


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

    const [open, setOpen] = useState(false)
    const [ID, setID] = useState('')
    const [deleteID, setDeleteID] = useState('')
    const meetRoom = []
    useEffect(() => {
        dispatch(getMeetingRoomInformation())
        // dispatch(getMeetingInformationById('','','1'))
    }, [])

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
    console.log(meetingRoomInformation);
    const setMeetRoom = () => {
        if (Object.keys(meetingRoomInformation).length !== 0) {
            meetingRoomInformation.data.map((item, index) => {
                console.log(item);
                meetRoom.push({
                    id: item.Room_Id,
                    text: item.Room_Name,
                    url: item.Description,
                })
            })
        }
    }
    setMeetRoom()

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    justifyItems: 'center',
                    alignItems: 'center',

                }}
            >
                {
                    meetRoom.length !== 0 ? <SchedulerMeeting meetRoom={meetRoom} /> : ''
                }
            </Box>


        </>
    )
}

export default CardMeeting
