import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { getEmployeeInformtion } from '../../../employeeInfomation/actions';
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box';

import { getMeetingRoomInformation, getMeetingInformationById, getMeetingInformationByMultiId, getMeetingInformationByRoomId } from '../../actions';

import moment from 'moment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import AutoComplete from '../../../common/AutoComplete/AutoComplete';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import FaceIcon from '@mui/icons-material/Face';
import SchedulerMeeting from './SchedulerMeeting';
const useStyles = makeStyles(() => ({

}));

const CardMeetingEdit = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { meetingRoomInformation, meetingInformationByMultiId } = useSelector(state => state.meetReducer)
    const { accountInformation } = useSelector(state => state.accountReducer)
    const { empInformation } = useSelector(state => state.employeeReducer)
    const uid = accountInformation.Emp_id ? accountInformation.Emp_id : ''

    const meetRoom = [], members = [], memberOption = []
    let allMeet = []


    useEffect(() => {
        // dispatch(getMeetingInformationByRoomId())
        dispatch(getEmployeeInformtion())
        dispatch(getMeetingRoomInformation())
        dispatch(getMeetingInformationByMultiId('', '', [String(uid)]))
    }, [uid])

    useEffect(() => {
        setAllMeet()
    }, [meetingInformationByMultiId.data])

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

    const setAllMeet = () => {
        let i = 0

        if (Object.keys(meetingInformationByMultiId).length !== 0) {
            Object.keys(meetingInformationByMultiId.data).map(function (key, index) {
                meetingInformationByMultiId.data[key].map((item, index2) => {
                    let day = moment(item.Date).format('DD')
                    let month = moment(item.Date).format('MM') - 1
                    let year = moment(item.Date).format('YYYY')
                    let hourStart = moment(item.Start_at, ["h:mm A"]).format("HH")
                    let minStart = moment(item.Start_at, ["h:mm A"]).format("mm")
                    let hourEnd = moment(item.End_at, ["h:mm A"]).format("HH")
                    let minEnd = moment(item.End_at, ["h:mm A"]).format("mm")
                    let location = Object.keys(meetingRoomInformation).length !== 0 ? meetingRoomInformation.data.filter(room => room.Room_Id === item.Room_Id)[0].Room_Name : 'null'

                    let members = [parseInt(key)].concat(item.Members.map(n => parseInt(n))).filter(function (item, pos, self) {
                        return self.indexOf(item) == pos;
                    })
                    allMeet[i] = {
                        id: item.Meet_Id,
                        roomId: item.Room_Id,
                        title: item.Subject,
                        startDate: new Date(year, month, day, hourStart, minStart),
                        endDate: new Date(year, month, day, hourEnd, minEnd),
                        location: location,
                        members: members,
                        creator: item.Creator
                    }

                    i += 1
                })
            });
        }
    }

    const setMember = () => {
        if (Object.keys(empInformation).length !== 0) {
            empInformation.data.map((item, index) => {
                members.push({
                    id: parseInt(item.Emp_id),
                    text: item.Name,
                })
                memberOption[index] = {}
                memberOption[index].id = item.Emp_id
                memberOption[index].text = item.Name
            })
        }
    }
    setMember()
    setMeetRoom()
    setAllMeet()

    console.log(allMeet)

    return (
        <>
            <Box

            >
                <div style={{ marginTop: '10px' }} />
                {
                    allMeet.length !== 0 && meetRoom.length !== 0 && members.length !== 0 && uid !== '' ?
                        <SchedulerMeeting meetRoom={meetRoom} myMeeting={allMeet} members={members} uid={uid} />
                        :
                        <LinearProgress color="secondary" />
                }
            </Box>


        </>
    )
}

export default CardMeetingEdit
