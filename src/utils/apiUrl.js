export const apiUrl = {
    eHRService: {
      auth: {
        signin: '/eHRService/Login',
        forgotPassword: '/eHRService/ForgotPassword',
        resetPassword: '/eHRService/ChangePassword',
        validateLinkResetPassword: '/w/auth/validate-link-code',
        createAccount:'/w/auth/account',
      },
      identity:{
        profile:'/eHRService/Profile',
        password:'/w/identity/password',
      }
    },
  }
  