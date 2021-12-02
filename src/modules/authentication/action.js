import API from '../../utils/api'
import { apiUrl } from '../../utils/apiUrl'
import { encodeB64, decodeB64 } from '../../utils/crypto'
import { getCookieFromBrowser, setCookie, clearCookie } from '../../utils/cookie'
// import Router from 'next/router'
// import { pushSnackbarAction } from '../layout/actions'
import { pushSnackbarAction } from '../layout/actions'


export const signIn = async (values, Checked,navigate) => {   

    return API()
        .post(apiUrl.eHRService.auth.signin, {
            username: values.email,
            password: values.password,
        })
        .then((response) => {
            const { access_token, ID } = response.data
            const uid = encodeB64(ID)
            const a = encodeB64(access_token)
           
            if (Checked) {
                setCookie('uid', uid,(1000*3600*24*30))
                setCookie('a', a,(1000*3600*24*30))
            } else {
                setCookie('uid', uid,(1000*3600*24))
                setCookie('a', a,(1000*3600*24))
            } 
            pushSnackbarAction('success', 'Login successfully')
            navigate('/Home')
            // console.log(ID);
            // console.log(access_token);
            return { status: 'success' }
        })
        .catch((error) => {
            try {
                let status = error.response.status
                if (status === 401) {
                  pushSnackbarAction('error', 'username or password incorrect')
                } else {
                  pushSnackbarAction('error', 'Invalid email or password')
                }
              } catch (e) {
                pushSnackbarAction('error', 'Server error')
              }              
            console.log('err');
            return { status: 'fail' }
        })
}


export const forgotPassword = async (values) => {
    console.log(apiUrl.eHRService.auth.forgotPassword);
    console.log(values);
    return API()
        .post(apiUrl.eHRService.auth.forgotPassword, {            
            username: values.email
        })
        .then((response) => {
            pushSnackbarAction('success', 'Send Link Reset Password has successful')
            return { status: 'success' }
        })
        .catch((error) => {
            pushSnackbarAction('error', 'email incorrect.')
            return { status: 'fail' }
        })
}