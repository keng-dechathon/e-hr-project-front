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
import { getAllPositionInformtion } from '../../position/actions';
import { getAllCompanyInformtion } from '../../company/actions';
import { getAllRoleInformtion } from '../../userRole/actions';

import { updateProfileById } from '../actions';
const useStyles = makeStyles(styles)


const FormUpdateWorkInfo = (props) => {
    const classes = useStyles()
    const { handleClose, id } = props

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllPositionInformtion())
        dispatch(getAllCompanyInformtion())
        dispatch(getAllRoleInformtion())
    }, [])
    const { empInformationByID } = useSelector(state => state.employeeReducer)
    const { AllPositionInformation } = useSelector(state => state.positionReducer)
    const { AllCompanyInformation } = useSelector(state => state.companyReducer)
    const { AllRoleInformation } = useSelector(state => state.roleReducer)



    const positionName = Object.keys(empInformationByID).length !== 0 ? empInformationByID.Position : ''
    const positionID = Object.keys(AllPositionInformation).length !== 0 ? (AllPositionInformation.data.filter(item => item.Position_Name === positionName)) : ''
    const roleName = Object.keys(empInformationByID).length !== 0 ? empInformationByID.Role : ''
    const roleID = Object.keys(AllRoleInformation).length !== 0 ? (AllRoleInformation.data.filter(item => item.Role_Name === roleName)) : ''
    const companyName = Object.keys(empInformationByID).length !== 0 ? empInformationByID.Company : ''
    const companyID = Object.keys(AllCompanyInformation).length !== 0 ? (AllCompanyInformation.data.filter(item => item.Company_Name === companyName)) : ''


    const [position, setPosition] = useState('')
    const [role, setRole] = useState('')
    const [company, setCompany] = useState('')

    const [user, setUser] = useState('')


    useEffect(() => {
        setTimeout(() => setUser({ Id: id, Position: position === '' ? positionID.length !== 0 ? positionID[0].ID : '' : position, Role: role === '' ? roleID.length !== 0 ? roleID[0].ID : '' : role, Company: company === '' ? companyID.length !== 0 ? companyID[0].ID : '' : company }))
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
                style={{ minWidth: '400px' }}
            >
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item xs={12} >
                        <InputLabel>Position *</InputLabel>
                        <Select
                            id="position"
                            name="position"
                            value={position === '' ? positionID.length !== 0 ? positionID[0].ID : '' : position}
                            onChange={handleChangePosition}
                            fullWidth
                        >
                            {
                                Object.keys(AllPositionInformation).length !== 0 &&
                                AllPositionInformation.data.map(({ ID, Position_Name }) => {
                                    return <MenuItem value={ID}>{Position_Name}</MenuItem>

                                })
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={12} >
                        <InputLabel>Company *</InputLabel>
                        <Select
                            id="company"
                            name="company"
                            value={company === '' ? companyID.length !== 0 ? companyID[0].ID : '' : company}
                            onChange={handleChangeCompany}
                            fullWidth
                        >
                            {
                                Object.keys(AllCompanyInformation).length !== 0 &&
                                AllCompanyInformation.data.map(({ ID, Company_Name }) => {
                                    return <MenuItem value={ID}>{Company_Name}</MenuItem>

                                })
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={12} >
                        <InputLabel>User Role *</InputLabel>
                        <Select
                            id="role"
                            name="role"
                            value={role === '' ? roleID.length !== 0 ? roleID[0].ID : '' : role}
                            onChange={handleChangeRole}
                            fullWidth
                        >
                            {
                                Object.keys(AllRoleInformation).length !== 0 &&
                                AllRoleInformation.data.map(({ ID, Role_Name }) => {
                                    return <MenuItem value={ID}>{Role_Name}</MenuItem>

                                })
                            }
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
