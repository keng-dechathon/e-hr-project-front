import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationActions from '../TablePaginationActions'
import { fade } from '@material-ui/core/styles/colorManipulator'
import clsx from 'clsx'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '../Typography/Typography'
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import styles from './styles';

import Card from '@mui/material/Card';

const StyledTableCell = withStyles(() => ({
    head: {
        // backgroundColor: theme.palette.primary.main,
        color: '#2F80ED',

    },
    body: {
        fontSize: 14,
        color: '#1976d2',
    
    }
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#FFFFFF',
        },
        '&:nth-of-type(even)': {
            backgroundColor: fade('#1976d2', 0.04),
        },
       

    },

}))(TableRow)

const useStyles = makeStyles(styles)

const TableCustom = ({
    headers = [],
    data = [],
    changePage,
    loading = false,
    disablePagination = false
}) => {
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)
    const classes = useStyles()

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
        if (changePage) setPage(newPage)
    }
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
    }

    return (
        <TableContainer component={Card} className={classes.card}>
            <Table>
                <TableHead style={{borderBottom :'1px solid #f0f0f0'}}>
                    <TableRow>
                        {headers.map((item, index) => (
                            <StyledTableCell
                                key={index}
                                className={classes.bodycell}
                            >
                                <Typography fontWeight={'medium'}>{item}</Typography>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        loading ?
                            [
                                <TableRow>
                                    <TableCell colSpan={headers.length} style={{ textAlign: 'center' }}>
                                        <div className={classes.skeleton}>
                                            {
                                                [...Array(rowsPerPage)].map((_, i) => <Skeleton key={i} animation="wave" height={60} />)
                                            }
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ] :
                            [
                                data.length > 0 ?
                                    [
                                        (data.length > rowsPerPage ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((row, indexRow) => (
                                            <TableRow key={row.name}>
                                                {headers.map((item, index) => (
                                                    <StyledTableCell
                                                        key={item + row.name}
                                                        className={classes.bodycell}
                                                    >
                                                        <Typography style={{ fontSize: '0.875rem', fontWeight: '400 !important' }}>{row[item]}</Typography>
                                                    </StyledTableCell>
                                                ))}
                                            </TableRow>
                                        )
                                        )
                                    ]
                                    :
                                    [
                                        <TableRow style={{ height: 53 * (rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)) }}>
                                            <TableCell colSpan={headers.length} style={{ textAlign: 'center' }}>
                                                <em style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
                                                    {'Sorry, nothing to display here'}
                                                </em>
                                            </TableCell>
                                        </TableRow>
                                    ]
                            ]

                    }

                </TableBody>

                {
                    !disablePagination ?
                        <TableFooter>
                            <TableRow
                                className={clsx(classes.footerTable, classes.table)}
                            >
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 50]}
                                    colSpan={headers.length}
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                        : null
                }
            </Table>
        </TableContainer>
    )
}

export default TableCustom

TableCustom.defaultProps = {
    columnSpan: 6
}

// const headers = ['Frozen yoghurt', 'Ice cream sandwich', 'Eclair', 'Cupcake', 'Gingerbread']
// const rows = [
//     { 'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159 },
//     { 'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159 },
//     { 'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159 },
//     { 'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159 },
//     { 'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159 },
//     { 'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159 },
//     { 'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159 },
//     { 'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159 },
//     { 'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159 },
//     { 'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159 },
//     { 'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159 },
//     { 'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159 },
//     { 'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159 },
//     { 'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159 },
//     { 'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159 },
//     { 'Frozen yoghurt': 159, 'Ice cream sandwich': 159, 'Eclair': 159, 'Cupcake': 159, 'Gingerbread': 159 },

// ]; table data input foramt