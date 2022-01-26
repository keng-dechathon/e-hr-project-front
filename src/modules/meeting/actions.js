import * as Types from './types'
import { createRequestTypes, createAction } from '../../utils/requestTypes'
import { apiUrl } from '../../utils/apiUrl'
import { pushSnackbarAction } from '../layout/actions'
import API from '../../utils/api'

export const GET_MEETINGROOM_INFORMATION = createRequestTypes(Types.GET_MEETINGROOM_INFORMATION)
export const GET_MEETINGBYID_INFORMATION = createRequestTypes(Types.GET_MEETINGBYID_INFORMATION)

export const getMeetingRoomInformation = (config, data = {}) =>
    createAction(GET_MEETINGROOM_INFORMATION.REQUEST, { Option: 'Show_Meeting_Room' }, {
        method: 'POST',
        url: apiUrl.eHRService.common.meeting,
        params: data,
        ...config
    }
    )

export const getMeetingInformationById = (config, data = {}, Emp_Id) =>
    createAction(GET_MEETINGBYID_INFORMATION.REQUEST, { Option: 'Show_Employee_Meeting_By_ID', Emp_Id: Emp_Id }, {
        method: 'POST',
        url: apiUrl.eHRService.common.meeting,
        params: data,
        ...config
    }
    )

