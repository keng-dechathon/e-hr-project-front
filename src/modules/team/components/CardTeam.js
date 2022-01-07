import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
// import FormHolidaysUpdate from './FormHolidaysUpdate'
import { getTeamsInformation } from '../actions'
import { useSelector, useDispatch } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import DataGrid from '../../common/DataGrid';
import FormUpdateTeam from './FormUpdateTeam';
import ModalUpdate from '../../common/ModalUpdate';
import FormAddTeam from './FormAddTeam';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteTeam } from '../actions';

import { QuickSearchToolbar, escapeRegExp } from '../../common/QuickSearchToolbar/QuickSearchToolbar'
import { Button } from '@mui/material'

const useStyles = makeStyles(() => ({
    ButtonAdd: {
        display: 'flex'
    },
    cardcontant: {
        padding: 0,
        "&:last-child": {
            paddingBottom: '0 !important'
        }
    },
}));



const CardTeam = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { teamsInformation } = useSelector(state => state.teamReducer)


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

    const headerArray = { Team_id: 'ID', Teamname: 'Team name', Team_host: 'Host' }

    let Header = React.useMemo(() => [])
    let Info = []

    useEffect(() => {
        dispatch(getTeamsInformation())
    }, [])

    useEffect(() => {
        if (deleteID !== '') {
            const onDelete = async (id) => {
                await deleteTeam([id])
                dispatch(getTeamsInformation())
            }
            onDelete(deleteID)
            setDeleteID('')
        }
    }, [deleteID])



    const handleClose = () => { setopen(false) }
    const onClickUpdate = React.useCallback(
        (row) => () => {
            console.log(row);
            setopen(true)
            setOption('update')
            setNowID(row)
        },
        [],
    );
    const onClickAdd = () => {
        setopen(true)
        setOption('add')
    }


    const onClickDelete = React.useCallback(
        (id) => () => {

            setDeleteID(id)
        },
        [],
    );
    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        if (Info.length !== 0) {
            const filteredRows = Info.filter((row) => {
                return Object.keys(row).some((field) => {
                    console.log(row[field].toString());
                    return searchRegex.test(row[field].toString());
                });
            });
            setSearchInfo(filteredRows)
        }
    };
   
    const setDataGrid = () => {
        if (Object.keys(teamsInformation).length !== 0) {
            teamsInformation.data.map((item, index) => {
                if (index === 0) {
                    Object.keys(item).map((name, value) => {

                        if (name === 'Team_id' && headerArray[name]) {
                            Header[0] = {
                                type: "number",
                                field: name,
                                headerName: headerArray[name],
                                width: '80',
                                align: 'left',
                                headerAlign: 'left',
                            }
                        }
                        if (name === 'Teamname' && headerArray[name]) {
                            Header[1] = {

                                field: name,
                                headerName: headerArray[name],
                                flex: 1,

                            }
                        }

                        if (name === 'Team_host' && headerArray[name]) {
                            Header[2] = {
                                field: name,
                                headerName: headerArray[name],
                                flex: 1,
                            }
                        }
                    })
                }
                Info.push(item)
                Info[index].id = item.Team_id

            })
            Header.push({
                field: 'actions',
                type: 'actions',
                width: 90,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={onClickUpdate(params.row)}
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
    setDataGrid()
    return (
        <>
            <ModalUpdate open={open} handleClose={handleClose} title={option === 'add' ? 'Add Team' : option === 'update' ? 'Update Team' : ''} fullscreen='true' >
                {
                    option === 'add' ? <FormAddTeam handleClose={handleClose} /> : <FormUpdateTeam handleClose={handleClose} nowID={nowID} />
                }
            </ModalUpdate>
            <Box className={classes.box}>
                <Card sx={{ minWidth: 683 }}>
                    <CardContent className={classes.cardcontant}>
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
                            <Button variant="outlined" className={classes.ButtonAdd} onClick={onClickAdd}>
                                <pre>+ ADD</pre>
                            </Button>
                        </Box>
                        <DataGrid
                            sortingOrder={['desc', 'asc']}
                            sortModel={sortModel}
                            onSortModelChange={(model) => Info.length !== 0 ? setSortModel(model) : ''}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 20, 50]}
                            pagination
                            headers={Header ? Header : ''}
                            rows={searchText ? searchInfo : Info ? Info : ''}
                        />
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default CardTeam
