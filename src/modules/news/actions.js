import * as Types from './types'
import { createRequestTypes, createAction } from '../../utils/requestTypes'
import { apiUrl } from '../../utils/apiUrl'

export const GET_NEWS_INFORMATION = createRequestTypes(Types.GET_NEWS_INFORMATION)

export const getNewsInformation = (config, data = {}) =>
    createAction(GET_NEWS_INFORMATION.REQUEST, {}, {
        method: 'POST',
        url: apiUrl.eHRService.common.news,
        params: data,
        ...config
    }
    )
