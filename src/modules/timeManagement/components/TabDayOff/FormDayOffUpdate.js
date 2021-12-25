import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-final-form-hooks'
import Button from '../../../common/Button'
import { makeStyles } from '@material-ui/core/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import { addHoliday } from '../../actions';
import { updateHoliday } from '../../actions';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DialogActions from '@mui/material/DialogActions';
import { getDayOffInformation } from '../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { TextField } from '@mui/material'
import Snackbar from '../../../layout/components/Snackbar'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { updateDayOff } from '../../actions';
import { Box } from '@mui/system'
import { method } from 'lodash';

const useStyles = makeStyles(() => ({
    ButtonSubmit: {
        background: '#04AA6D',
        color: '#FFFFFF',
        '&:hover': {
            background: '#ffa000',

        },
    },
    dialogAction: {
        marginTop: '10px',
        paddingRight: '0 !important',

    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },


}));




const FormDayOffUpdate = (props) => {
    const classes = useStyles()
    const { handleClose, id, option } = props

    const dispatch = useDispatch()
    const { dayOffInformation } = useSelector(state => state.timeReducer)

    useEffect(() => {
        dispatch(getDayOffInformation())
    }, [])

    const item = Object.keys(dayOffInformation).length !== 0 && option != 'add' ? dayOffInformation.data.filter(value => value.ID === id) : ''
    const [dayOffID, setDayOffID] = useState(item.length !== 0 ? item[0].ID ? item[0].ID : '' : '')
    const [name, setName] = useState(item.length !== 0 ? item[0].Name ? item[0].Name : '' : '')
    const [detail, setDetail] = useState(item.length !== 0 ? item[0].Detail ? item[0].Detail : '' : '')
    const [dayoff, setDayoff] = useState(item.length !== 0 ? item[0].Hour ? Math.floor(item[0].Hour / 24) : '' : '')
    const [timeoff, setTimeoff] = useState(item.length !== 0 ? item[0].Hour ? item[0].Hour % 24 : '' : '')
    const [user, setUser] = useState('')



    useEffect(() => {
        setTimeout(() => setUser({ ID: dayOffID, Name: name, Detail: detail, Hour: (parseInt(dayoff * 24) + parseInt(timeoff)).toString() }))
    }, [dayOffID, name, detail, dayoff, timeoff])

console.log(dayoff);


    const onSubmit = async () => {
        if (option === 'update') await updateDayOff(user)
        else if (option === 'add') await addHoliday(user)
        dispatch(getDayOffInformation())
        handleClose()
    };

    const { handleSubmit, submitting } = useForm({
        onSubmit: onSubmit,
    })
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form
                onSubmit={handleSubmit}
            >
                <Grid
                    container
                    spacing={2}
                >

                    <Grid
                        item
                        xs={12}
                    >
                        <InputLabel>Name *</InputLabel>
                        <TextField
                            id='name'
                            name='name'
                            required
                            defaultValue={name}
                            onChange={(e) => { setName(e) }}
                            fullWidth
                            disabled={true}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <InputLabel>Day Off (Day(s))*</InputLabel>
                        <TextField
                            id='dayoff'
                            name='dayoff'
                            required
                            defaultValue={dayoff}
                            onChange={(e) => { setDayoff(e.target.value) }}
                            fullWidth

                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <InputLabel>Time Off (Hr(s))*</InputLabel>
                        <TextField
                            id='timeoff'
                            name='timeoff'
                            required
                            defaultValue={timeoff}
                            onChange={(e) => { setTimeoff(e.target.value) }}
                            fullWidth

                        />
                    </Grid>
                    <Grid item sm={12}>
                        <InputLabel>Detail</InputLabel>
                        <TextField
                            id='detail'
                            name='detail'
                            defaultValue={detail}
                            onChange={(e) => { setDetail(e.target.value) }}
                            fullWidth
                            multiline
                            rows={3}
                            rowsMax={4}
                        />
                    </Grid>

                </Grid>
                <DialogActions className={classes.dialogAction}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        loading={submitting}
                        variant={'contained'}
                        className={classes.ButtonSubmit}
                        type="submit"
                        autoFocus
                    >
                        Update
                    </Button>
                </DialogActions>
                <Snackbar />
            </form>
        </LocalizationProvider>


    )
}

export default FormDayOffUpdate
