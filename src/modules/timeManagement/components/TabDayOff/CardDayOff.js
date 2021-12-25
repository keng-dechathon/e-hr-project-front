import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
// import FormHolidaysUpdate from './FormHolidaysUpdate'
import { getDayOffInformation } from '../../actions'
import { useSelector, useDispatch } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import DataGrid from '../../../common/DataGrid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getDayOffAmount } from '../../../../utils/miscellaneous';
import { deleteDayOff } from '../../actions';
import { QuickSearchToolbar, escapeRegExp } from '../../../common/QuickSearchToolbar/QuickSearchToolbar'
import { Button } from '@mui/material'
import ModalUpdate from '../../../common/ModalUpdate'
import FormDayOffUpdate from './FormDayOffUpdate';
import FormDayOffAdd from './FormDayOffAdd';
const useStyles = makeStyles(() => ({
    ButtonAdd: {
        display: 'flex'
    }
}));



const CardDayOff = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { dayOffInformation } = useSelector(state => state.timeReducer)

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
    const headerArray = { ID: 'ID', Name: 'Name', Hour: 'Amount', Detail: 'Detail' }

    let dayOffHeader = React.useMemo(() => [])
    let dayOffInfo = []

    useEffect(() => {
        dispatch(getDayOffInformation())
    }, [])

    useEffect(() => {
        if (deleteID !== '') {
            const onDelete = async (id) => {
                await deleteDayOff([id])
                dispatch(getDayOffInformation())
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
        if (dayOffInfo.length !== 0) {
            const filteredRows = dayOffInfo.filter((row) => {
                return Object.keys(row).some((field) => {
                    console.log(row[field].toString());
                    return searchRegex.test(row[field].toString());
                });
            });
            setSearchInfo(filteredRows)
        }
    };
  
    const setDayOffDataGrid = () => {
        if (Object.keys(dayOffInformation).length !== 0) {
            dayOffInformation.data.map((item, index) => {
                if (index === 0) {
                    Object.keys(item).map((name, value) => {
                        if (name === 'ID' && headerArray[name]) {
                            dayOffHeader[0] = {
                                type: "number",
                                field: name,
                                headerName: headerArray[name],
                                width: '80',
                                align: 'left',
                                headerAlign: 'left',
                            }
                        }
                        else if (name === 'Name' && headerArray[name]) {
                            dayOffHeader[1] = {
                                field: name,
                                headerName: headerArray[name],
                                flex: 1,
                            }
                        }
                        else if (name === 'Detail' && headerArray[name]) {
                            dayOffHeader[2] = {
                                field: name,
                                headerName: headerArray[name],
                                flex: 1,
                                sortable: false
                            }
                        }
                        else if (name === 'Hour' && headerArray[name]) {
                            dayOffHeader[3] = {
                                field: name,
                                headerName: headerArray[name],
                                flex: 1,

                            }
                        }

                    })
                }
                dayOffInfo.push({})
                dayOffInfo[index].ID = item.ID
                dayOffInfo[index].Name = item.Name
                dayOffInfo[index].Detail = item.Detail
                dayOffInfo[index].Hour = getDayOffAmount(item.Hour)
                dayOffInfo[index].id = item.ID
            })
            dayOffHeader.push({
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
    setDayOffDataGrid()
    return (
        <>
            <ModalUpdate open={open} handleClose={handleClose} title="DayOff Update" >
                {
                    option === 'update' ? <FormDayOffUpdate id={nowID} handleClose={handleClose} option={option} />
                        :
                        option === 'add' ? <FormDayOffAdd id={nowID} handleClose={handleClose} option={option} />
                            : ''
                }

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
                            onSortModelChange={(model) => dayOffInfo.length !== 0 ? setSortModel(model) : ''}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 20, 50]}
                            pagination
                            headers={dayOffHeader ? dayOffHeader : ''}
                            rows={searchText ? searchInfo : dayOffInfo ? dayOffInfo : ''}
                        />
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default CardDayOff
