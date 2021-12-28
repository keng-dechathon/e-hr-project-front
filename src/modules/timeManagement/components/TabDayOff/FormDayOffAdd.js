import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-final-form-hooks'
import Button from '../../../common/Button'
import { makeStyles } from '@material-ui/core/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import DialogActions from '@mui/material/DialogActions';
import { getDayOffInformation } from '../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { TextField } from '@mui/material'
import Snackbar from '../../../layout/components/Snackbar'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { addDayOff } from '../../actions';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getEmployeeInformtion } from '../../../employeeInfomation/actions';
import { pushSnackbarAction } from '../../../layout/actions';
const animatedComponents = makeAnimated();


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

const customStyles = {
    control: base => ({
        ...base,
        'min-height': '56px',
    })
};
const FormDayOffAdd = (props) => {
    const classes = useStyles()
    const { handleClose, id, option } = props

    const dispatch = useDispatch()
    const { empInformation } = useSelector(state => state.employeeReducer)

    useEffect(() => {
        dispatch(getDayOffInformation())
        dispatch(getEmployeeInformtion())
    }, [])



    const [ID, setID] = useState('')
    const [detail, setDetail] = useState('')
    const [dayoff, setDayoff] = useState('')
    const [timeoff, setTimeoff] = useState('')
    const [user, setUser] = useState('')
    const [selectedOptions, setSelectedOptions] = useState([])


    useEffect(() => {
        setTimeout(() => setUser({ ID: ID, Detail: detail, Hour: (parseInt(dayoff * 24) + parseInt(timeoff)).toString() }))
    }, [ID, detail, dayoff, timeoff])


    const options = []


    const createOptions = () => {
        if (Object.keys(empInformation).length !== 0) {
            empInformation.data.map((value, index) => {
                options[index] = {}
                options[index].value = value.Emp_id
                options[index].label = value.Name
            })
        }
    }



    const onSubmit = async () => {
        if (selectedOptions.length !== 0) {
            selectedOptions.map(async (value) => {
                await addDayOff(value.value, user)
            })
            dispatch(getEmployeeInformtion())
            dispatch(getDayOffInformation())
            handleClose()
        } else {
            pushSnackbarAction('Error', 'Please Select Employee')
        }

    };

    const { handleSubmit, submitting } = useForm({
        onSubmit: onSubmit,
    })
    createOptions()
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
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            onChange={(e) => { setSelectedOptions(e) }}
                            isMulti
                            options={options}
                            styles={customStyles}
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
                        + ADD
                    </Button>
                </DialogActions>
                <Snackbar />
            </form>
        </LocalizationProvider>


    )
}

export default FormDayOffAdd
