import * as Types from './types'
import { createRequestTypes, createAction } from '../../utils/requestTypes'
import { apiUrl } from '../../utils/apiUrl'
import { pushSnackbarAction } from '../layout/actions'
import API from '../../utils/api'

export const GET_HOLIDAYS_INFORMATION = createRequestTypes(Types.GET_HOLIDAYS_INFORMATION)

export const GET_WORKINGTIME_INFORMATION = createRequestTypes(Types.GET_WORKINGTIME_INFORMATION)
export const GET_DAYOFF_INFORMATION = createRequestTypes(Types.GET_DAYOFF_INFORMATION)

export const getHolidaysInformation = (config, data = {}) =>
    createAction(GET_HOLIDAYS_INFORMATION.REQUEST, {}, {
        method: 'POST',
        url: apiUrl.eHRService.common.holidays,
        params: data,
        ...config
    }
    )

export const getWorkingTimeInformation = (config, data = {}) =>
    createAction(GET_WORKINGTIME_INFORMATION.REQUEST, {}, {
        method: 'POST',
        url: apiUrl.eHRService.common.workingTime,
        params: data,
        ...config
    }
    )

export const getDayOffInformation = (config, data = {}) =>
    createAction(GET_DAYOFF_INFORMATION.REQUEST, {}, {
        method: 'POST',
        url: apiUrl.eHRService.common.dayOff,
        params: data,
        ...config
    }
    )

export const addHoliday = async (values) => {
    return API()
        .post(apiUrl.eHRService.common.holidays, {
            Holiday_Name: values.Holiday_Name ? values.Holiday_Name : '',
            begin_date: values.begin_date ? values.begin_date : '',
            end_date: values.end_date ? values.end_date : '',
            Option: 'Add',
        })
        .then((response) => {
            // console.log(response);
            pushSnackbarAction('success', 'add success')
            return { status: 'success' }
        })
        .catch((error) => {
            console.log(error);
            pushSnackbarAction('Server Error', 'Server Error.')
            return { status: 'fail' }
        })
}


export const updateHoliday = async (values) => {
    return API()
        .post(apiUrl.eHRService.common.holidays, {
            ID: values.ID ? values.ID : '',
            Holiday_Name: values.Holiday_Name ? values.Holiday_Name : '',
            begin_date: values.begin_date ? values.begin_date : '',
            end_date: values.end_date ? values.end_date : '',
            Option: 'Update',
        })
        .then((response) => {
            // console.log(response);
            pushSnackbarAction('success', 'update success')
            return { status: 'success' }
        })
        .catch((error) => {
            pushSnackbarAction('Server Error', 'Server Error.')
            return { status: 'fail' }
        })
}

export const deleteHoliday = async (values) => {
    return API()
        .post(apiUrl.eHRService.common.holidays, {
            Value: values,
            Option: 'Delete',
        })
        .then((response) => {
            // console.log(response);
            pushSnackbarAction('success', 'delete success')
            return { status: 'success' }
        })
        .catch((error) => {
            pushSnackbarAction('Server Error', 'Server Error.')
            return { status: 'fail' }
        })
}


export const updateWorkingTime = async (values) => {
    console.log(values);
    return API()
        .post(apiUrl.eHRService.common.workingTime, {
            Day_Name: values.Day_Name,
            start_work: values.start_work,
            off_work: values.off_work,
            Option: 'Update',
        })
        .then((response) => {
            pushSnackbarAction('success', 'update success')
            return { status: 'success' }
        })
        .catch((error) => {
            pushSnackbarAction('Server Error', 'Server Error.')
            return { status: 'fail' }
        })
}



export const deleteDayOff = async (values) => {
    return API()
        .post(apiUrl.eHRService.common.dayOff, {
            Value: values,
            Option: 'Delete',
        })
        .then((response) => {
            // console.log(response);
            pushSnackbarAction('success', 'delete success')
            return { status: 'success' }
        })
        .catch((error) => {
            pushSnackbarAction('Server Error', 'Server Error.')
            return { status: 'fail' }
        })
}




export const updateDayOff = async (values) => {
    console.log(values);
    return API()
        .post(apiUrl.eHRService.common.dayOff, {
            ID:values.ID,
            Detail:values.Detail,
            Hours:values.Hour,
            Option: 'Update',
        })
        .then((response) => {
            // console.log(response);
            pushSnackbarAction('success', 'update success')
            return { status: 'success' }
        })
        .catch((error) => {
            pushSnackbarAction('Server Error', 'Server Error.')
            return { status: 'fail' }
        })
}


export const addDayOff = async (ID,values) => {
    console.log(values);
    return API()
        .post(apiUrl.eHRService.common.dayOff, {
            Emp_id:ID,
            Detail:values.Detail,
            Hours:values.Hour,
            Option: 'Add',
        })
        .then((response) => {
            // console.log(response);
            pushSnackbarAction('success', 'update success')
            return { status: 'success' }
        })
        .catch((error) => {
            pushSnackbarAction('Server Error', 'Server Error.')
            return { status: 'fail' }
        })
}