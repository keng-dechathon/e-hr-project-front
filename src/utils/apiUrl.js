export const apiUrl = {
    eHRService: {
      auth: {
        signin: '/eHRService/Login',
        authorize: '/w/oauth2/authorize',
        token: '/w/oauth2/token',
        forgotPassword: '/eHRService/ForgotPassword',
        resetPassword: '/w/auth/reset-password',
        validateLinkResetPassword: '/w/auth/validate-link-code',
        createAccount:'/w/auth/account',
      },
      identity:{
        profile:'/w/identity/profile',
        password:'/w/identity/password',
      }
    },
  }
  