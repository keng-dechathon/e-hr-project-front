import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
// import FormHolidaysUpdate from './FormHolidaysUpdate'
import { getEmployeeInformtion } from '../actions';
import { useSelector, useDispatch } from 'react-redux'

import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import DataGrid from '../../common/DataGrid';
import Avatar from '@mui/material/Avatar';
import DrawerEmpInformation from './DrawerEmpInformation';
import Typography from '../../common/Typography/Typography';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { purple, red, lightGreen, pink, blue, lightBlue, lime } from '@mui/material/colors';

import SearchIcon from '@mui/icons-material/Search';
import { QuickSearchToolbar, escapeRegExp } from '../../common/QuickSearchToolbar/QuickSearchToolbar'
import { Button } from '@mui/material'

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
            paddingBottom: 0
        }
    },
    datagrid: {
        '& .MuiDataGrid-cell': {
            borderRight: '0px !important'
        },
        '& .MuiDataGrid-columnHeader': {
            borderRight: '0px !important'
        }
    }
}));



const CardEmpInformation = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { empInformation } = useSelector(state => state.employeeReducer)

    const [open, setOpen] = useState(false)
    const [ID, setID] = useState('')
    const [searchText, setSearchText] = useState('')
    const [searchInfo, setSearchInfo] = useState([])

    const [pageSize, setPageSize] = useState(5);
    const [sortModel, setSortModel] = useState([
        {
            field: 'ID',
            sort: 'desc',
        },
    ]);

    const headerArray = { Img: 'Name', Position: 'Position', Company: 'Company', Team_Info: 'Owner' }
    const avatarColor = [pink[500], lightGreen[500], red[500], purple[500], blue[500], lightBlue[500], lime[500]]

    let Header = React.useMemo(() => [])
    let Info = []

    useEffect(() => {

        dispatch(getEmployeeInformtion())
    }, [])

    const onClickShowEmpInfo = React.useCallback(
        (id) => () => {
            console.log(id);
            setOpen(true)
            setID(id)
        },
        [],
    );

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        if (Info.length !== 0) {
            const filteredRows = Info.filter((row) => {
                return Object.keys(row).some((field) => {
                    if (field !== 'Team_Info' && field !== 'Img') {
                        return searchRegex.test(row[field].toString());
                    }

                });
            });
            setSearchInfo(filteredRows)
        }
    };

    const setDataGrid = () => {
        if (Object.keys(empInformation).length !== 0) {
            empInformation.data.map((item, index) => {
                if (index === 0) {
                    Object.keys(item).map((name, value) => {
                        if (name === 'Img' && headerArray[name]) {
                            Header[0] = {
                                field: name,
                                headerName: headerArray[name],
                                renderCell: (params) => (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Avatar alt={params.row.Name} src={params.value} sx={{ width: 28, height: 28, bgcolor: avatarColor[6] }} />
                                        <Typography variant="subtitle2" style={{ marginLeft: '10px' }} >{params.row.Name}</Typography>
                                    </div>
                                ),
                                minWidth: '280',
                                sortable: false,
                            }
                        }
                        if (name === 'Position' && headerArray[name]) {
                            Header[1] = {
                                field: name,
                                headerName: headerArray[name],
                                flex: 1,
                            }
                        }
                        if (name === 'Company' && headerArray[name]) {
                            Header[2] = {
                                field: name,
                                headerName: headerArray[name],
                                flex: 1,
                            }
                        }
                        if (name === 'Team_Info' && headerArray[name]) {
                            Header[3] = {
                                field: name,
                                headerName: headerArray[name],
                                renderCell: (params) => (
                                    <div>
                                        {
                                            params.value.map((item, index) => (
                                                index === 0 ?
                                                    <div style={{ display: 'flex', alignItems: 'center' }} key={index}>
                                                        <Avatar alt={params.value[0].HostName} src={params.value} sx={{ width: 28, height: 28, bgcolor: avatarColor[6] }} />
                                                        <Typography variant="subtitle2" style={{ marginLeft: '10px' }} >{item.HostName}</Typography>
                                                    </div>
                                                    : ''
                                            ))
                                        }
                                    </div>
                                ),
                                minWidth: '280',
                                sortable: false,
                            }
                        }

                    })
                }
                Info[index] = {}
                Info[index].Img = item.Img
                Info[index].Name = item.Name
                Info[index].Position = item.Position
                Info[index].Company = item.Company
                Info[index].Team_Info = item.Team_Info
                Info[index].id = item.Emp_id
            })
            Header.push({
                field: 'actions',
                type: 'actions',
                width: 90,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<SearchIcon />}
                        label="search"
                        onClick={onClickShowEmpInfo(params.id)}
                    />,
                ],
            })
        }
    }
    setDataGrid()
    return (
        <>
            <DrawerEmpInformation open={open} setOpen={setOpen} ID={ID} />
            <Box className={classes.box}>
                <Card >
                    <CardContent className={classes.cardcontant} >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                justifyItems: 'center',
                                alignItems: 'center',

                            }}
                        >
                            <QuickSearchToolbar value={searchText} onChange={(event) => requestSearch(event.target.value)} clearSearch={() => requestSearch('')} />

                        </Box>
                        <DataGrid
                            sortingOrder={['desc', 'asc']}
                            sortModel={sortModel}
                            onSortModelChange={(model) => Info.length !== 0 ? setSortModel(model) : ''}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 20, 50]}
                            pagination
                            disableSelectionOnClick
                            className={classes.datagrid}
                            headers={Header ? Header : ''}
                            rows={searchText ? searchInfo : Info ? Info : ''}
                        />
                    </CardContent>

                </Card>
            </Box>
        </>
    )
}

export default CardEmpInformation
