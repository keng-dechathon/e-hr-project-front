import * as Types from './types'
import { createRequestTypes, createAction } from '../../utils/requestTypes'
import { apiUrl } from '../../utils/apiUrl'

export const GET_ALLROLE_INFORMATION = createRequestTypes(Types.GET_ALLROLE_INFORMATION)

export const getAllRoleInformtion = (config, data = {}) =>
    createAction(GET_ALLROLE_INFORMATION.REQUEST, {}, {
        method: 'POST',
        url: apiUrl.eHRService.common.role,
        params: data,
        ...config
    }
    )