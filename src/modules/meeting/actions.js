import * as Types from './types'
import { createRequestTypes, createAction } from '../../utils/requestTypes'
import { apiUrl } from '../../utils/apiUrl'
import { pushSnackbarAction } from '../layout/actions'
import API from '../../utils/api'

export const GET_MEETING_INFORMATION = createRequestTypes(Types.GET_MEETING_INFORMATION)

export const getMeetingInformation = (config, data = {}) =>
    createAction(GET_MEETING_INFORMATION.REQUEST, { Option: 'Show_Meeting_Room' }, {
        method: 'POST',
        url: apiUrl.eHRService.common.meeting,
        params: data,
        ...config
    }
    )



