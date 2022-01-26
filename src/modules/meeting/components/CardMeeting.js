import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'


import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import DataGrid from '../../common/DataGrid';
import EditIcon from '@mui/icons-material/Edit';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { getMeetingInformation } from '../actions';
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

    const { meetingInformation } = useSelector(state => state.meetReducer)

    const [option, setOption] = useState('')
    const [open, setOpen] = useState(false)
    const [ID, setID] = useState('')
    const [searchText, setSearchText] = useState('')
    const [searchInfo, setSearchInfo] = useState([])
    const [pageSize, setPageSize] = useState(5);
    const [deleteID, setDeleteID] = useState('')

    const [sortModel, setSortModel] = useState([
        {
            field: 'ID',
            sort: 'desc',
        },
    ]);

    const headerArray = { Type_name: 'Name', Num_per_year: 'Number of days can leave ', Num_can_add: 'Number of days can add' }

    let Header = React.useMemo(() => [])
    let Info = []

    useEffect(() => {
        dispatch(getMeetingInformation())
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
            setOption('update')
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
        setOption('add')
    }
console.log(meetingInformation);

    return (
        <>
            <ModalUpdate open={open} handleClose={handleClose} title="Leave Type Update" >
            </ModalUpdate>


            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    justifyItems: 'center',
                    alignItems: 'center',

                }}
            >
                <SchedulerMeeting />
            </Box>


        </>
    )
}

export default CardMeeting
