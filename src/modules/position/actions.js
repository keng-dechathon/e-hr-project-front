import * as Types from './types'
import { createRequestTypes, createAction } from '../../utils/requestTypes'
import { apiUrl } from '../../utils/apiUrl'

export const GET_ALLPOSITION_INFORMATION = createRequestTypes(Types.GET_ALLPOSITION_INFORMATION)

export const getAllPositionInformtion = (config, data = {}) =>
    createAction(GET_ALLPOSITION_INFORMATION.REQUEST, {}, {
        method: 'POST',
        url: apiUrl.eHRService.common.position,
        params: data,
        ...config
    }
    )