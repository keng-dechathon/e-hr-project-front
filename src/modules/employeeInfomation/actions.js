import * as Types from './types'
import { createRequestTypes, createAction } from '../../utils/requestTypes'
import { apiUrl } from '../../utils/apiUrl'
import { pushSnackbarAction } from '../layout/actions'
import API from '../../utils/api'

export const GET_EMPINFO_INFORMATION = createRequestTypes(Types.GET_EMPINFO_INFORMATION)
export const GET_EMPBYID_INFORMATION = createRequestTypes(Types.GET_EMPBYID_INFORMATION)

export const getEmployeeInformtion = (config, data = {}) =>
    createAction(GET_EMPINFO_INFORMATION.REQUEST, {}, {
        method: 'POST',
        url: apiUrl.eHRService.common.employeeInfomation,
        params: data,
        ...config
    }
    )

export const getEmployeeInformtionByID = (config, data = {}, ID) =>
    createAction(GET_EMPBYID_INFORMATION.REQUEST, { Option: 'Get_Profile_By_Id', Id: ID }, {
        method: 'POST',
        url: apiUrl.eHRService.identity.profile,
        params: data,
        ...config
    }
    )