import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import noimg from '../../../../assets/noimg.png'
import { getAllNewsInformation } from '../../actions'
import { useDispatch } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import DataGrid from '../../../common/DataGrid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FormNewsUpdate from './FormNewsUpdate';
import ModalUpdate from './ModalUpdate';
import { deleteNews } from '../../actions';
import { QuickSearchToolbar, escapeRegExp } from './SearchTextfield'
import { Button } from '@mui/material'


const useStyles = makeStyles(() => ({
    tabitem: {
        marginRight: '30px !important',
        padding: '0 !important',
        minWidth: '150px !important',
        textTransform: 'none !important',
        fontWeight: 'bold !important',
        fontSize: '18px !important',
        '&:hover': {
            color: '#C91F92 !important',
            opacity: 1,
        },
        '&.Mui-selected': {
            color: '#C91F92 !important',
        },

    },
    tablist: {
        '& .MuiTabs-indicator': {
            backgroundColor: '#C91F92 !important',

        },
    },
    Img: {
        height: '90px'
    },
    // searchBox: {

    //     display: 'flex',
    //     alignItems: 'center',
    //     width: '100%',
    // },
    ButtonAdd: {
        display: 'flex'
    }
}));



const CardNewsList = ({ items }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllNewsInformation())
    }, [])

    const headerArray = { News_id: 'ID', Img: 'Image', Topic: 'Name', Detail: 'Description', Date: 'Create at', Start: 'Begin at', End: 'Expire at' }
    let newsHeader = React.useMemo(() => [])
    let newsInfo = []
    const [searchInfo, setSearchInfo] = useState([])
    const [value, setValue] = useState('1');
    const [isEdit, setIsEdit] = useState(false)
    const [nowID, setNowID] = useState(0)
    const [isDelete, setIsDelete] = useState(false)
    const [deleteID, setDeleteID] = useState('')
    const [searchText, setSearchText] = useState('')
    const [option, setOption] = useState('')
    const [pageSize, setPageSize] = useState(5);

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const handleClose = () => {
        setIsEdit(false)
    }
    const onDelete = async (deleteID) => {
        await deleteNews(deleteID)
    }

    const deletesNews = React.useCallback(
        (id) => () => {
            setIsDelete(true)
            setDeleteID(id)
        },
        [],
    );

    const updateNews = React.useCallback(
        (id) => () => {
            setOption('update')
            setIsEdit(true)
            setNowID(id)
        },
        [],
    );


    const addNews = () => {
        setOption('add')
        setIsEdit(true)

    }


    useEffect(() => {
        if (deleteID !== '' && isDelete) {
            console.log(deleteID);
            const onDelete = async (id) => {
                await deleteNews([id])
                dispatch(getAllNewsInformation())
            }
            onDelete(deleteID)
            setIsDelete(false)
            setDeleteID('')
        }
    }, [deleteID, isDelete])

    const setNewsDataGrid = () => {
        if (Object.keys(items).length !== 0) {
            items.map((item, index) => {
                if (index === 0) {
                    Object.keys(item).map((name, value) => {
                        if (name === 'News_id' && headerArray[name]) newsHeader.push({ field: name, headerName: headerArray[name], width: '70' })
                        if (name === 'Img' && headerArray[name]) newsHeader.push({
                            field: name,
                            headerName: headerArray[name],
                            width: '80',
                            align: 'center',
                            flex: 1,
                            renderCell: (params) => <img src={params.value && params.value != 'null' ? params.value : noimg} className={classes.Img} />
                        })
                        if (name === 'Start' || name === 'End' || name === 'Date' && headerArray[name]) newsHeader.push({
                            field: name,
                            headerName: headerArray[name],
                            width: '180',
                        })
                        if (name === 'Topic' || name === 'Detail' && headerArray[name]) newsHeader.push({ field: name, headerName: headerArray[name], flex: 1 })

                    })
                }
                newsInfo.push(item)
                newsInfo[index].id = item.News_id

            })
            newsHeader.push({
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={updateNews(params.id)}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteForeverIcon />}
                        label="Delete"
                        onClick={deletesNews(params.id)}

                    />,
                ],
            })

        }

    }

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        if (newsInfo.length !== 0) {
            const filteredRows = newsInfo.filter((row) => {
                return Object.keys(row).some((field) => {
                    console.log(field);
                    if (field !== 'Img') return searchRegex.test(row[field].toString());
                });
            });
            setSearchInfo(filteredRows)
        }
    };

    setNewsDataGrid()

    return (
        <>
            <ModalUpdate open={isEdit} handleClose={handleClose} title="News Update" >
                <FormNewsUpdate id={nowID} handleClose={handleClose} option={option} />
            </ModalUpdate>

            <Box className={classes.box}>
                <Card sx={{ minWidth: 850 }}>

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
                            <Button variant="outlined" className={classes.ButtonAdd} onClick={addNews}><pre>+ ADD</pre></Button>
                        </Box>
                        <DataGrid
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 20, 50]}
                            pagination
                            headers={newsHeader ? newsHeader : ''}
                            rows={searchText ? searchInfo : newsInfo ? newsInfo : ''}
                            className={classes.datagrid} rowHeight={90}
                        />
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default CardNewsList
