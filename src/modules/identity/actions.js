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

export const updateProfile = async (values) => {
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
      BirthDate: values.BirthDate ? values.BirthDate : '',
    })
    .then((response) => {
      // console.log(response);
      pushSnackbarAction('success', 'success')
      return { status: 'success' }
    })
    .catch((error) => {
      pushSnackbarAction('Server Error', 'Server Error.')
      return { status: 'fail' }
    })
}

export const mouthArr = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' }

export const mouthArr2 = { January: '01', February: '02', March: '03', April: '04', May: '05', June: '06', July: '07', August: '08', September: '09', October: '10', November: '11', December: '12' }

export const getDateFormat = (Date) => {
  //DateInputFormat = Tue Nov 01 2022 00:00:00 GMT+0700 (Indochina Time)
  //format from DatePicker mui
  //format to yy-mm-dd

  try {
    if (Date) {
      Date = String(Date)
      let arrSplite = Date.split(" ")
      let year = arrSplite[3]
      let mouth = arrSplite[1]
      let date = arrSplite[2]


      Object.entries(mouthArr).forEach(([name, value]) => {
        if (mouth === name) mouth = value
      });

      return year + '-' + mouth + '-' + date
    } else {
      return '1111/1/1'
    }
  } catch (err) {
    return '1111/1/1'
  }

}

export const getDateFormat2 = (Date) => {
  //DateInputFormat = yy-mm-dd'
  //return 11 june 1999
  try {
    if (Date) {
      let arrSplite = Date.split("-")
      let year = arrSplite[0]
      let mouth = arrSplite[1]
      let date = arrSplite[2]

      // let mouthNumber = 0

      Object.entries(mouthArr2).forEach(([name, value]) => {
        if (mouth === value) mouth = name
      });

      return date + " " + mouth + " " + year
    } else {
      return '1111/1/1'
    }
  } catch (err) {
    return '1111/1/1'
  }
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const fileReader = new FileReader();
      if (file && file.type.match('image.*')) {
        fileReader.readAsDataURL(file);
      }
      else {
        pushSnackbarAction('File type error', 'Insert the image file type')
      }

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    } catch (err) {
      console.log(err);
    }

  });
};