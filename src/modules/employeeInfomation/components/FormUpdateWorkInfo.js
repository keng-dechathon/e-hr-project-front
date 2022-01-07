import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useForm } from 'react-final-form-hooks'
import { useSelector, useDispatch } from 'react-redux'


import InputLabel from '@mui/material/InputLabel';
import Grid from '@material-ui/core/Grid'
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '../../layout/components/Snackbar'
import Button from '../../common/Button'
import styles from './stylesForm'
import { getEmployeeInformtionByID, getEmployeeInformtion } from '../actions'

import { updateProfileById } from '../actions';
const useStyles = makeStyles(styles)


const FormUpdateWorkInfo = (props) => {
    const classes = useStyles()
    const { handleClose, id } = props

    const dispatch = useDispatch()
    const { empInformationByID } = useSelector(state => state.employeeReducer)
 
    const [position, setPosition] = useState(empInformationByID.Position ? empInformationByID.Position : '')
    const [role, setRole] = useState(empInformationByID.Role ? empInformationByID.Role : '')
    const [company, setCompany] = useState(empInformationByID.Company ? empInformationByID.Company : '')

    const [user, setUser] = useState('')
console.log(empInformationByID);
    useEffect(() => {
        setTimeout(() => setUser({ position: position, role: role, company: company }))
    }, [position, role, company])


    const handleChangePosition = (event) => {
        setPosition(event.target.value);
    };
    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };
    const handleChangeCompany = (event) => {
        setCompany(event.target.value);
    };

    const onSubmit = async () => {
     
            await updateProfileById(user)
            dispatch(getEmployeeInformtionByID('', '', id))
            dispatch(getEmployeeInformtion())
            handleClose()
        
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
                     <Grid item >
                        <InputLabel>Position *</InputLabel>
                        <Select
                            id="position"
                            name="position"
                            value={position}
                            onChange={handleChangePosition}
                            fullWidth
                        >
                          
                        </Select>
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

export default FormUpdateWorkInfo
