import API from '../../utils/api'
import { apiUrl } from '../../utils/apiUrl'
import { encodeB64, decodeB64 } from '../../utils/crypto'
import { getCookieFromBrowser, setCookie, clearCookie } from '../../utils/cookie'
// import Router from 'next/router'
// import { pushSnackbarAction } from '@modules/layout/actions'


export const signIn = async (values, Checked) => {    
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
                setCookie('uid', uid)
                setCookie('a', a)
            }else {
                 if (getCookieFromBrowser('a')&&!Checked){
                    clearCookie('a')
                    clearCookie('uid')
                 }
            }
                        
            console.log(ID);
            console.log(access_token);
            return true
        })
        .catch((error) => {            
            console.log('err');
            return false
        })
}
