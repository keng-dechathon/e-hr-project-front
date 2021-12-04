import * as Types from './types'
import { createRequestTypes, createAction } from '@utils/requestTypes'
import { apiUrl } from '@utils/apiUrl'

export const GET_ACCOUNT_INFORMATION = createRequestTypes(Types.GET_ACCOUNT_INFORMATION)

export const getAccountInformation = (config,data={}) =>
  createAction(GET_ACCOUNT_INFORMATION.REQUEST, {}, {
    method: 'GET',
    url: apiUrl.harbor.identity.profile,
    params: data,
    ...config
  }
)
