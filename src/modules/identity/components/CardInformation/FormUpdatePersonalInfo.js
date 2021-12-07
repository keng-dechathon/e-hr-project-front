import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { useForm, useField } from 'react-final-form-hooks'
import classNames from 'classnames'
// import TextFieldOutlined from '../../../common/TextFieldOutlined'
import Button from '../../../common/Button'

import { makeStyles } from '@material-ui/core/styles'
import styles from './stylesForm'
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import { getAccountInformation } from '../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { getDateFormat } from '../../actions'
import { updateProfile } from '../../actions'
import Snackbar from '../../../layout/components/Snackbar'
const useStyles = makeStyles(styles)


const FormUpdatePersonalInfo = (props) => {
    const classes = useStyles()
    const { handleClose } = props
    const [Checked, setChecked] = useState(true)

    const dispatch = useDispatch()
    const { accountInformation } = useSelector(state => state.accountReducer)

    useEffect(() => {
        dispatch(getAccountInformation())
    }, [])

    const [title, setTitle] = useState(accountInformation.Title ? accountInformation.Title : '')
    const [gender, setGender] = useState(accountInformation.Gender ? accountInformation.Gender : '')
    const [date, setDate] = useState(accountInformation.BirthDate ? new Date(getDateFormat(accountInformation.BirthDate)) : '')
    const [firstname, setFirstname] = useState(accountInformation.Firstname ? accountInformation.Firstname : '')
    const [lastname, setLastname] = useState(accountInformation.Lastname ? accountInformation.Lastname : '')
    const [user, setUser] = useState('')

    useEffect(() => {
        setTimeout(() => setUser({ Title: title, Firstname: firstname, Lastname: lastname, BirthDate: date, Gender: gender }))
    }, [title, gender, date, firstname, lastname])



    const handleChangeDate = (newValue) => {
        setDate(newValue);
    };
    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };
    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };
    const handleChangeFirstname = (event) => {
        setFirstname(event.target.value);
    };
    const handleChangeLastname = (event) => {
        setLastname(event.target.value);
    };

    const onSubmit = async () => {
        // console.log(user);
        await updateProfile(user)
        handleClose()
    };

    const { form, handleSubmit, submitting, values } = useForm({
        onSubmit: onSubmit,

    })

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form
                className={classes.root}
                onSubmit={handleSubmit}
            >
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item sm={2} xs={3}>
                        <InputLabel>Title *</InputLabel>
                        <Select
                            id="title"
                            name="title"
                            value={title}
                            onChange={handleChangeTitle}
                            fullWidth
                        >
                            <MenuItem value="Mr.">Mr.</MenuItem>
                            <MenuItem value="Mrs.">Mrs.</MenuItem>                         
                        </Select>

                    </Grid>
                    <Grid item sm={5} xs>
                        <InputLabel>First name *</InputLabel>
                        <TextField
                            id='firstname'
                            name='firstname'
                            defaultValue={firstname}
                            onChange={handleChangeFirstname}
                            fullWidth

                        />
                    </Grid>
                    <Grid item sm={5} xs>
                        <InputLabel>Last name *</InputLabel>
                        <TextField
                            id='lastname'
                            name='lastname'
                            defaultValue={lastname}
                            onChange={handleChangeLastname}
                            fullWidth

                        />

                    </Grid>
                    <Grid item sm={3} xs={4}>
                        <InputLabel>Gender *</InputLabel>
                        <Select
                            id="gender"
                            name="gender"
                            value={gender}
                            onChange={handleChangeGender}
                            fullWidth
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs >
                        <InputLabel>BirthDate *</InputLabel>
                        <DesktopDatePicker
                            inputFormat="dd/MM/yyyy"
                            value={date}
                            onChange={handleChangeDate}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                    </Grid>

                </Grid>
                <DialogActions className={classes.dialogAction}>
                    <Button onClick={handleClose}>Cancle</Button>
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
            </form>
            <Snackbar/>
        </LocalizationProvider>


    )
}

export default FormUpdatePersonalInfo
