import API from '../../utils/api'
import { apiUrl } from '../../utils/apiUrl'
import { encodeB64, decodeB64 } from '../../utils/crypto'
import { getCookieFromBrowser, setCookie, clearCookie } from '../../utils/cookie'
// import Router from 'next/router'
// import { pushSnackbarAction } from '../layout/actions'
import { pushSnackbarAction } from '../layout/actions'


export const signIn = async (values, Checked, navigate) => {

    return API()
        .post(apiUrl.eHRService.auth.signin, {
            username: values.email,
            password: values.password,
        })
        .then((response) => {
            const { access_token, ID, NeedResetPassword } = response.data
            const uid = encodeB64(ID)
            const a = encodeB64(access_token)
            const uname = encodeB64(values.email)
            
            console.log("need: " + NeedResetPassword);
            if (NeedResetPassword) {
                // console.log(values.email); 
                setCookie('uid', uid, (1000 * 3600 ))
                setCookie('a', a, (1000 * 3600 ))
                setCookie('u', uname, (1000 * 3600))
                navigate('/reset-password')
              
            } else {
                ///setRememberMeCookie
                if (Checked) {
                    setCookie('uid', uid, (1000 * 3600 * 24 * 30))
                    setCookie('a', a, (1000 * 3600 * 24 * 30))
                } else {
                    setCookie('uid', uid, (1000 * 3600 * 24))
                    setCookie('a', a, (1000 * 3600 * 24))
                }
                navigate('/Home')
            }
            pushSnackbarAction('success', 'Login successfully')

            return { status: 'success' }
        })
        .catch((error) => {
            console.log(error);
            try {
                let status = error.response.status
                console.log(status);
                if (status == 401) {
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
            pushSnackbarAction('error', 'Email not found.')
            return { status: 'fail' }
        })
}


export const resetPassword = async (values, username, navigate) => {
    console.log(values);
    console.log(username);
    return API()
        .post(apiUrl.eHRService.auth.resetPassword, {
            username: username,
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            confirmNewPassword: values.confirmPassword,
        })
        .then((response) => {
            pushSnackbarAction('success', 'Send Link Reset Password has successful')
            return { status: 'success' }
        })
        .catch((error) => {
            console.log(error);
            pushSnackbarAction('error', 'email incorrect.')
            return { status: 'fail' }
        })
}