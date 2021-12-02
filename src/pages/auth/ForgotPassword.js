import React from 'react'
import FormForgotPassword from "../../modules/authentication/components/FormForgotPassword";
import CardSignin from '../../modules/authentication/components/CardAuth';
import MainHead from '../../modules/layout/components/MainHead';
import AuthLayout from '../../modules/layout/components/AuthLayout';
const ForgotPassword = () => {
  return (
    <>
      <AuthLayout title='Forgot Password Page'>
        <CardSignin>
          <FormForgotPassword />
        </CardSignin>
      </AuthLayout>
    </>
  )
}

export default ForgotPassword
