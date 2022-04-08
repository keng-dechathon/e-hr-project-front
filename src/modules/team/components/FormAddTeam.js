import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-final-form-hooks'
import Button from '../../common/Button'
import { makeStyles } from '@material-ui/core/styles'

import TextField from '../../common/TextFieldOutlined'
import { pushSnackbarAction } from '../../layout/actions'
import DialogActions from '@mui/material/DialogActions';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux'
import makeAnimated from 'react-select/animated';
import Snackbar from '../../layout/components/Snackbar'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { getAccountInformation } from '../../identity/actions'
import { getEmployeeInformtion } from '../../employeeInfomation/actions'
import { getTeamsInformation } from '../actions'
import { addTeam } from '../actions'
const useStyles = makeStyles(() => ({
    ButtonSubmit: {
        background: '#04AA6D',
        color: '#FFFFFF',
        '&:hover': {
            background: "#04AA6D",
      opacity:"0.8",
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
    form:{
        minWidth:'600px',
    }

}));

const customStyles = {
    control: base => ({        
        ...base,              
        'min-height': '56px',
    })
};



const FormAddTeam = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const animatedComponents = makeAnimated();

    const { accountInformation } = useSelector(state => state.accountReducer)
    const { empInformation } = useSelector(state => state.employeeReducer)

    useEffect(() => {
        dispatch(getEmployeeInformtion())
        dispatch(getAccountInformation())
    }, [])
    const { handleClose } = props
    const [selectedHost, setSelectedHost] = useState([])
    const [creatorID, setCreatorID] = useState(Object.keys(accountInformation).length !== 0 && accountInformation.Emp_id ? accountInformation.Emp_id : '')
    const [selectedOptions, setSelectedOptions] = useState([])
    const options = [], listEmp = []

    const getValueArr=(e)=>{
        if(e){
            let memberID =[]
            e.map((value)=>{               
                memberID.push(value.value)
            })
            setSelectedOptions(memberID)
        }
    }
    const onSubmit = async () => {
        if (selectedHost.value) {
            await addTeam(values, selectedHost.value.toString(), creatorID.toString(),selectedOptions)
            dispatch(getTeamsInformation())
            handleClose()
        } else {
            pushSnackbarAction('ERROR', 'pls select host')
        }
    };



    const createOptions = () => {
        if (Object.keys(empInformation).length !== 0) {
            empInformation.data.map((value, index) => {
                options[index] = {}
                options[index].value = value.Emp_id
                options[index].label = value.Name
                listEmp[index] = {}
                listEmp[index].value = value.Emp_id
                listEmp[index].label = value.Name
            })
        }
      
    }

    const { form, handleSubmit, submitting, values } = useForm({
        onSubmit: onSubmit
    })
    createOptions()
    return (
        <form
            onSubmit={handleSubmit}
            // className={classes.form}
        >
            <Grid
                container
                spacing={2}
            >

                <Grid
                    item
                    xs={6}
                >
                    <InputLabel>Team name*</InputLabel>
                    <TextField
                        id={'teamname'}
                        fullWidth
                        placeholder={'Enter Team Name.'}
                        name={'teamname'}
                        form={form}
                       
                        required
                    />
                </Grid>

                <Grid
                    item
                    xs={6}
                >
                    <InputLabel>Team host *</InputLabel>
                    <Select
                        components={animatedComponents}
                        onChange={(e) => { setSelectedHost(e) }}
                        options={options}
                        styles={customStyles}
                        isClearable={true}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <InputLabel>Name *</InputLabel>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        onChange={(e) => { getValueArr(e) }}
                        isMulti
                        options={listEmp}
                        styles={customStyles}
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
    )
}

export default FormAddTeam
