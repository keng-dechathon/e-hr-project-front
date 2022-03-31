import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useForm } from 'react-final-form-hooks'
import { getAccountInformation } from '../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile } from '../../actions'

import InputLabel from '@mui/material/InputLabel';
import Grid from '@material-ui/core/Grid'
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';

import Snackbar from '../../../layout/components/Snackbar'
import Button from '../../../common/Button'
import styles from './stylesForm'

import { isPhoneNumber, isEmail, isThai } from '../../../../utils/validate'
import { pushSnackbarAction } from '../../../layout/actions'

const useStyles = makeStyles(styles)


const FormUpdateContactInfo = (props) => {
    const classes = useStyles()
    const { handleClose } = props

    const dispatch = useDispatch()
    const { accountInformation } = useSelector(state => state.accountReducer)

    useEffect(() => {
        dispatch(getAccountInformation())
    }, [])

    const [email, setEmail] = useState(accountInformation.Email ? accountInformation.Email : '')
    const [phone, setPhone] = useState(accountInformation.Phone ? accountInformation.Phone : '')
    const [address, setAddress] = useState(accountInformation.Address ? accountInformation.Address : '')

    const [user, setUser] = useState('')

    useEffect(() => {
        setTimeout(() => setUser({ Email: email, Phone: phone, Address: address }))
    }, [email, phone, address])


    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleChangePhone = (event) => {
        setPhone(event.target.value);
    };
    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
    };

    const onSubmit = async () => {
        console.log(isEmail(email));
        if (!isEmail(email)) { pushSnackbarAction('error', 'Invalid Email format') }        
        else if (!isPhoneNumber(phone)) { pushSnackbarAction('error', 'Invalid phone number format.') }
        else if (isThai(address)) { pushSnackbarAction('error', 'Enter the address in English only.') }
        else {
            await updateProfile(user)
            dispatch(getAccountInformation())
            handleClose()
        }
        // window.location.reload();
    };

    const { handleSubmit, submitting } = useForm({
        onSubmit: onSubmit,
    })

    return (
        <>
            <form
                className={classes.root}
                onSubmit={handleSubmit}
            >
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item xs={6} >
                        <InputLabel>Email Address</InputLabel>
                        <TextField
                            id='email'
                            name='email'
                            disabled
                            defaultValue={email}
                            onChange={handleChangeEmail}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>Phone Number</InputLabel>
                        <TextField
                            id='phone'
                            name='phone'
                            defaultValue={phone}
                            onChange={handleChangePhone}
                            fullWidth

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Address</InputLabel>
                        <TextField
                            id='address'
                            name='address'
                            defaultValue={address}
                            onChange={handleChangeAddress}
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
            </form>
            <Snackbar />
        </>

    )
}

export default FormUpdateContactInfo
