import * as Types from './types'
import { createRequestTypes, createAction } from '../../utils/requestTypes'
import { apiUrl } from '../../utils/apiUrl'

export const GET_ALLCOMPANY_INFORMATION = createRequestTypes(Types.GET_ALLCOMPANY_INFORMATION)

export const getAllCompanyInformtion = (config, data = {}) =>
    createAction(GET_ALLCOMPANY_INFORMATION.REQUEST, {}, {
        method: 'POST',
        url: apiUrl.eHRService.common.company,
        params: data,
        ...config
    }
    )