import React, { useEffect, useState } from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import styles from './styles';
import TableContainer from '@mui/material/TableContainer';


const useStyles = makeStyles(styles)

const DataGridCustom = ({
    headers,
    rows,
    pageSize = 5,
    rowsPerPageOptions = [5],
    checkboxSelection = false,
    loading = false,
    disablePagination = false
}) => {
    const classes = useStyles()
    return (
        <TableContainer component={Card} className={classes.card}>
            <DataGrid
                rows={rows}
                columns={headers}
                pageSize={pageSize}
                disableExtendRowFullWidth={true}
                rowsPerPageOptions={rowsPerPageOptions}
                checkboxSelection={checkboxSelection}
                autoHeight={true}
                autoWidth={true}
            />
        </TableContainer>


    )
}

export default DataGridCustom


