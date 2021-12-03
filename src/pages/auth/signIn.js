import React from 'react'
import CardAuth from '../../modules/authentication/components/CardAuth'
import FormSignin from '../../modules/authentication/components/FormSignin'
import MainHead from '../../modules/layout/components/MainHead'
import AuthLayout from '../../modules/layout/components/AuthLayout';
const SignIn = () => {
  return (
    <>
      <AuthLayout title=" Sign In Page">
        <CardAuth>
          <FormSignin />
        </CardAuth>
      </AuthLayout>

    </>
  )
}

export default SignIn
