import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import FormHolidaysUpdate from './FormHolidaysUpdate'
import { getHolidaysInformation } from '../../actions'
import { useSelector, useDispatch } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import DataGrid from '../../../common/DataGrid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { deleteHoliday } from '../../actions';
import { QuickSearchToolbar, escapeRegExp } from '../../../common/QuickSearchToolbar/QuickSearchToolbar'
import { Button } from '@mui/material'
import ModalUpdate from '../../../common/ModalUpdate'


const useStyles = makeStyles(() => ({
    ButtonAdd: {
        display: 'flex'
    }
}));



const CardHoliday = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { holidaysInformation } = useSelector(state => state.timeReducer)

    const [nowID, setNowID] = useState('')
    const [open, setopen] = useState(false)
    const [deleteID, setDeleteID] = useState('')
    const [searchText, setSearchText] = useState('')
    const [searchInfo, setSearchInfo] = useState([])
    const [option, setOption] = useState('')
    const [pageSize, setPageSize] = useState(5);
    const [sortModel, setSortModel] = useState([
        {
            field: 'ID',
            sort: 'desc',
        },
    ]);
    const headerArray = { ID: 'ID', Start: 'Begin', Holiday_Name: 'Name', End: 'End' }

    let holidayHeader = React.useMemo(() => [])
    let holidayInfo = []

    useEffect(() => {
        dispatch(getHolidaysInformation())
    }, [])

    useEffect(() => {
        if (deleteID !== '') {
            const onDelete = async (id) => {
                await deleteHoliday([id])
                dispatch(getHolidaysInformation())
            }
            onDelete(deleteID)
            setDeleteID('')
        }
    }, [deleteID])

    const onClickDelete = React.useCallback(
        (id) => () => {

            setDeleteID(id)
        },
        [],
    );
    const onClickUpdate = React.useCallback(
        (id) => () => {
            setopen(true)
            setOption('update')
            setNowID(id)
        },
        [],
    );
    const onClickAdd = () => {
        setopen(true)
        setOption('add')
    }

    const handleClose = () => { setopen(false) }

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        if (holidayInfo.length !== 0) {
            const filteredRows = holidayInfo.filter((row) => {
                return Object.keys(row).some((field) => {
                    console.log(row[field].toString());
                    return searchRegex.test(row[field].toString());
                });
            });
            setSearchInfo(filteredRows)
        }
    };

    const setHolidaysDataGrid = () => {
        if (Object.keys(holidaysInformation).length !== 0) {
            holidaysInformation.data.map((item, index) => {
                if (index === 0) {
                    Object.keys(item).map((name, value) => {
                        if (name === 'ID' && headerArray[name]) {
                            holidayHeader[0] = {
                                type: "number",
                                field: name,
                                headerName: headerArray[name],
                                width: '80',
                                align: 'left',
                                headerAlign: 'left',
                            }
                        }
                        else if (name === 'Start' && headerArray[name]) {
                            holidayHeader[2] = {
                                field: name,
                                headerName: headerArray[name],
                                type: 'dateTime',
                                flex: 1,
                                sortable: false
                            }
                        }
                        else if (name === 'End' && headerArray[name]) {
                            holidayHeader[3] = {
                                field: name,
                                headerName: headerArray[name],
                                type: 'dateTime',
                                flex: 1,
                                sortable: false
                            }
                        }
                        else if (name === 'Holiday_Name' && headerArray[name]) {
                            holidayHeader[1] = {
                                field: name,
                                headerName: headerArray[name],
                                flex: 1,
                                sortable: false,
                            }
                        }
                    })
                }
                holidayInfo.push(item)
                holidayInfo[index].id = item.ID
            })
            holidayHeader.push({
                field: 'actions',
                type: 'actions',
                width: 90,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={onClickUpdate(params.id)}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteForeverIcon />}
                        label="Delete"
                        onClick={onClickDelete(params.id)}
                    />,
                ],
            })
        }
    }
    setHolidaysDataGrid()
    return (
        <>
            <ModalUpdate open={open} handleClose={handleClose} title="Holiday Update" >
                <FormHolidaysUpdate id={nowID} handleClose={handleClose} option={option} />
            </ModalUpdate>

            <Box className={classes.box}>
                <Card sx={{ minWidth: 683 }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                justifyItems: 'center',
                                alignItems: 'center',
                                pt: '10px',
                                pb: '10px',

                            }}
                        >
                            <QuickSearchToolbar value={searchText} onChange={(event) => requestSearch(event.target.value)} clearSearch={() => requestSearch('')} />
                            <Button variant="outlined" className={classes.ButtonAdd} onClick={onClickAdd}><pre>+ ADD</pre></Button>
                        </Box>
                        <DataGrid
                            sortingOrder={['desc', 'asc']}
                            sortModel={sortModel}
                            onSortModelChange={(model) => holidayInfo.length !== 0 ? setSortModel(model) : ''}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 20, 50]}
                            pagination
                            headers={holidayHeader ? holidayHeader : ''}
                            rows={searchText ? searchInfo : holidayInfo ? holidayInfo : ''}                          
                        />
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default CardHoliday
