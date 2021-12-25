import * as Types from './types'
import { createRequestTypes, createAction } from '../../utils/requestTypes'
import { apiUrl } from '../../utils/apiUrl'

export const GET_EMPINFO_INFORMATION = createRequestTypes(Types.GET_EMPINFO_INFORMATION)

export const getEmployeeInformtion = (config, data = {}) =>
    createAction(GET_EMPINFO_INFORMATION.REQUEST, {}, {
        method: 'POST',
        url: apiUrl.eHRService.common.employeeInfomation,
        params: data,
        ...config
    }
    )
