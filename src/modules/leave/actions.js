import * as Types from './types'
import { createRequestTypes, createAction } from '../../utils/requestTypes'
import { apiUrl } from '../../utils/apiUrl'

export const GET_LEAVE_INFORMATION = createRequestTypes(Types.GET_LEAVE_INFORMATION)

export const getLeaveInformation = (config, data = {}) =>
    createAction(GET_LEAVE_INFORMATION.REQUEST, {}, {
        method: 'POST',
        url: apiUrl.eHRService.common.leave,
        params: data,
        ...config
    }
    )
