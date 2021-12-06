import * as Types from './types'
import { createRequestTypes, createAction } from '../../utils/requestTypes'
import { apiUrl } from '../../utils/apiUrl'
import API from '../../utils/api'

import { pushSnackbarAction } from '../layout/actions'
export const GET_ACCOUNT_INFORMATION = createRequestTypes(Types.GET_ACCOUNT_INFORMATION)

export const getAccountInformation = (config, data = {}) =>
  createAction(GET_ACCOUNT_INFORMATION.REQUEST, {}, {
    method: 'POST',
    url: apiUrl.eHRService.identity.profile,
    params: data,
    ...config
  }
  )



export const getinfo = async () => {
  console.log(apiUrl.eHRService.identity.profile);

  return API()
    .post(apiUrl.eHRService.identity.profile, {

    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction('success', 'success')
      return { status: 'success' }
    })
    .catch((error) => {
      pushSnackbarAction('error', 'err.')
      return { status: 'fail' }
    })
}
