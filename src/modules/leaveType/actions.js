import * as Types from './types'
import { createRequestTypes, createAction } from '../../utils/requestTypes'
import { apiUrl } from '../../utils/apiUrl'
import { pushSnackbarAction } from '../layout/actions'
import API from '../../utils/api'

export const GET_LEAVETYPE_INFORMATION = createRequestTypes(Types.GET_LEAVETYPE_INFORMATION)

export const getLeaveTypeInformation = (config, data = {}) =>
    createAction(GET_LEAVETYPE_INFORMATION.REQUEST, { Option: 'Show_Leave_Type' }, {
        method: 'POST',
        url: apiUrl.eHRService.common.leave,
        params: data,
        ...config
    }
    )



export const updateLeaveType = async (values) => {    
    return API()
        .post(apiUrl.eHRService.common.leave, {
            Type_ID: values.Type_ID ? values.Type_ID : '',
            Type_name: values.Type_name ? values.Type_name : '',
            Num_per_year: values.Num_per_year ? values.Num_per_year : '',
            Num_can_add: values.Num_can_add ? values.Num_can_add : '',
            Option: 'Update_Leave_Type',
        })
        .then((response) => {
            // console.log(response);
            pushSnackbarAction('success', 'update success')
            return { status: 'success' }
        })
        .catch((error) => {
            pushSnackbarAction('error', 'Server Error.')
            return { status: 'fail' }
        })
}

export const deleteLeaveType = async (id) => {    
    return API()
        .post(apiUrl.eHRService.common.leave, {
            Value: id ? id : '',           
            Option: 'Delete_Leave_Type',
        })
        .then((response) => {
            // console.log(response);
            pushSnackbarAction('success', 'delete success')
            return { status: 'success' }
        })
        .catch((error) => {
            pushSnackbarAction('error', 'Server Error.')
            return { status: 'fail' }
        })
}

export const addLeaveType = async (values) => {    
    return API()
        .post(apiUrl.eHRService.common.leave, {          
            Type_name: values.Type_name ? values.Type_name : '',
            Num_per_year: values.Num_per_year ? values.Num_per_year : '',
            Num_can_add: values.Num_can_add ? values.Num_can_add : '',    
            Option: 'Add_Leave_Type',
        })
        .then((response) => {
            // console.log(response);
            pushSnackbarAction('success', 'add success')
            return { status: 'success' }
        })
        .catch((error) => {
            pushSnackbarAction('error', 'Server Error.')
            return { status: 'fail' }
        })
}