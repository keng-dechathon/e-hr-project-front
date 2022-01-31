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
import ScedulerMeetingFunc from './ScedulerMeetingFunc'
import PersonIcon from '@mui/icons-material/Person';
import FaceIcon from '@mui/icons-material/Face';
const useStyles = makeStyles(() => ({

}));

const CardMeeting = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { meetingRoomInformation, meetingInformationById, meetingInformationByMultiId, meetingInformationByRoomId } = useSelector(state => state.meetReducer)
    const { accountInformation } = useSelector(state => state.accountReducer)
    const { empInformation } = useSelector(state => state.employeeReducer)
    const uid = accountInformation.Emp_id ? accountInformation.Emp_id : ''
    const [selectState, setSelectState] = React.useState([]);
    const [selectStateFilter, setSelectStateFilter] = React.useState(1);
    const [resetStatus, setResetStatus] = React.useState(false);
    const meetRoom = [], myMeeting = [], members = [], memberOption = []
    let allMeet = []


    useEffect(() => {
        // dispatch(getMeetingInformationByRoomId())
        dispatch(getEmployeeInformtion())
        dispatch(getMeetingRoomInformation())
        dispatch(getMeetingInformationById('', '', String(uid)))
        dispatch(getMeetingInformationByMultiId('', '', [String(uid)]))
    }, [uid])

    const filterOption = [{ id: 1, text: 'By Employee' }, { id: 2, text: 'By Room' }]

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

                let members = [parseInt(uid)].concat(item.Members.map(n => parseInt(n))).filter(function (item, pos, self) {
                    return self.indexOf(item) == pos;
                })
                myMeeting.push({
                    id: item.Meet_Id,
                    roomId: item.Room_Id,
                    title: item.Subject,
                    startDate: new Date(year, month, day, hourStart, minStart),
                    endDate: new Date(year, month, day, hourEnd, minEnd),
                    location: location,
                    members: members,
                    creator: item.Creator,
                    uid: uid,
                })
            })
        }
    }
    const setAllMeet = () => {
        let i = 0, info = {}

        if (selectStateFilter === 1) info = meetingInformationByMultiId
        else if (selectStateFilter === 2) info = meetingInformationByRoomId

        if (Object.keys(info).length !== 0) {
            Object.keys(info.data).map(function (key, index) {
                info.data[key].map((item, index2) => {
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
                        id: i,
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

    const handleClick = () => {
        allMeet = []
        if (selectState.length === 0 && uid && selectStateFilter === 1) {
            dispatch(getMeetingInformationByMultiId('', '', [String(uid)]))
            setResetStatus(true)
        }
        else {
            if (selectStateFilter === 1) dispatch(getMeetingInformationByMultiId('', '', selectState))
            else if (selectStateFilter === 2) dispatch(getMeetingInformationByRoomId('', '', selectState))
        }

        setAllMeet()
    }
    const handleClickReset = () => {
        allMeet = []
        dispatch(getMeetingInformationByMultiId('', '', [String(uid)]))
        setSelectStateFilter(1)
        setResetStatus(true)
        setAllMeet()
    }

    const handleChangeSelect = (event) => {
        setSelectStateFilter(event.target.value)
        setSelectState([])
    }

    setMember()
    setMyMeet()
    setMeetRoom()
    setAllMeet()
console.log(selectState)
    return (
        <>
            <Box

            >
                <InputLabel >
                    Select or Search
                </InputLabel>
                <Stack direction="row" spacing={2}>

                    {
                        memberOption.length !== 0 ?
                            <div>
                                <AutoComplete
                                    size='small'
                                    option={selectStateFilter === 1 ? memberOption : selectStateFilter === 2 ? meetRoom : ''}
                                    selectState={selectState}
                                    setSelectState={setSelectState}
                                    style={{ backgroundColor: 'white' }}
                                    limit={selectStateFilter === 1 ? 9999 : 1}
                                    resetStatus={resetStatus}
                                    setResetStatus={setResetStatus}
                                    selectStateFilter={selectStateFilter}
                                />
                                <FormHelperText>Select a room or Employee name to review meetings. </FormHelperText>
                            </div> : ''
                    }
                    <div>
                        <Select
                            value={selectStateFilter}
                            onChange={handleChangeSelect}
                            displayEmpty
                            size='small'
                            inputProps={{ 'aria-label': 'Without label' }}
                            style={{ width: '140px', backgroundColor: 'white' }}
                        >
                            {
                                filterOption.map((item) => {
                                    return <MenuItem value={item.id}>{item.text}</MenuItem>
                                })
                            }
                        </Select>
                        <FormHelperText></FormHelperText>
                    </div>
                    <Button variant="contained" endIcon={<SearchIcon />} style={{ height: '40px' }} color="secondary" onClick={handleClick}>
                        GO
                    </Button>
                    <Button variant="outlined" endIcon={<FaceIcon />} style={{ height: '40px' }} color="secondary" onClick={handleClickReset}>
                        Show Your Meeting
                    </Button>
                </Stack>

                <div style={{ marginTop: '10px' }} />
                {/* {

                    allMeet.length !== 0 && meetRoom.length !== 0 && myMeeting.length !== 0 && members.length !== 0 && uid !== '' ?
                        <ScedulerMeetingFunc meetRoom={meetRoom} myMeeting={allMeet} members={members} uid={uid} filter={selectStateFilter} /> :
                        <ScedulerMeetingFunc meetRoom={meetRoom} myMeeting={myMeeting} members={members} uid={uid} filter={selectStateFilter} />
                } */}
                {
                    allMeet.length !== 0 && meetRoom.length !== 0 && members.length !== 0 && uid !== '' &&
                    <ScedulerMeetingFunc meetRoom={meetRoom} myMeeting={allMeet} members={members} uid={uid} filter={selectStateFilter} />
                }
            </Box>


        </>
    )
}

export default CardMeeting
