import * as Types from './types'
import { createRequestTypes, createAction } from '../../utils/requestTypes'
import { apiUrl } from '../../utils/apiUrl'
import { pushSnackbarAction } from '../layout/actions'
import API from '../../utils/api'

export const GET_EMPINFO_INFORMATION = createRequestTypes(Types.GET_EMPINFO_INFORMATION)
export const GET_EMPBYID_INFORMATION = createRequestTypes(Types.GET_EMPBYID_INFORMATION)

export const getEmployeeInformtion = (config, data = {}) =>
    createAction(GET_EMPINFO_INFORMATION.REQUEST, {}, {
        method: 'POST',
        url: apiUrl.eHRService.common.employeeInfomation,
        params: data,
        ...config
    }
    )

export const getEmployeeInformtionByID = (config, data = {}, ID) =>
    createAction(GET_EMPBYID_INFORMATION.REQUEST, { Option: 'Get_Profile_By_Id', Id: ID }, {
        method: 'POST',
        url: apiUrl.eHRService.identity.profile,
        params: data,
        ...config
    }
    )



export const updateProfileById = async (values) => {
    return API()
        .post(apiUrl.eHRService.identity.profile, {
            Option: 'Update_Profile_By_Id',
            Id: values.Id?values.Id:'',
            Img: values.Img ? values.Img : '',
            Email: values.Email ? values.Email : '',
            Address: values.Address ? values.Address : '',
            Lastname: values.Lastname ? values.Lastname : '',
            Title: values.Title ? values.Title : '',
            Gender: values.Gender ? values.Gender : '',
            Firstname: values.Firstname ? values.Firstname : '',
            Role: values.Role ? values.Role : '',
            Position: values.Position ? values.Position : '',
            Phone: values.Phone ? values.Phone : '',
            BirthDate: values.BirthDate ? values.BirthDate : '',
            Company: values.Company ? values.Company : '',
        })
        .then((response) => {
            // console.log(response);
            pushSnackbarAction('success', 'update success')
            return { status: 'success' }
        })
        .catch((error) => {
            pushSnackbarAction('Server Error', 'Server Error.')
            return { status: 'fail' }
        })
}
