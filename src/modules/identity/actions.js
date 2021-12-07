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

export const updateProfile = async (values) => {
  console.log(values.Firstname);
  return API()
    .post(apiUrl.eHRService.identity.profile, {
      Img: values.Img ? values.Img : '',
      Email: values.Email ? values.Email : '',
      Address: values.Address ? values.Address : '',
      Lastname: values.Lastname ? values.Lastname : '',
      Title: values.Title ? values.Title : '',
      Gender: values.Gender ? values.Gender : '',
      Firstname: values.Firstname ? values.Firstname : '',
      Role: values.Role ? values.Role : '',
      Phone: values.Phone ? values.Phone : '',
      BirthDate: ''
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

export const mouthArr = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' }

export const getDateFormat = (Date) => {
  try {

    if (Date) {

      let arrSplite = Date.split("-")

      let year = arrSplite[0]
      let mouth = arrSplite[1]
      let date = arrSplite[2]

      let mouthNumber = 0

      // Object.entries(mouthArr).forEach(([name, value]) => {
      //   if (mouth === name) mouthNumber = value
      // });

      return year + '-' + mouth + '-' + date
    } else {
      return 0
    }
  } catch (err) {
    return '0/0/0'
  }

}