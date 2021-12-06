import React from 'react'
import FormForgotPassword from "../../modules/authentication/components/FormForgotPassword";
import CardAuth from '../../modules/authentication/components/CardAuth';
import MainHead from '../../modules/layout/components/MainHead';
import AuthLayout from '../../modules/layout/components/AuthLayout';
const ForgotPassword = () => {
  return (
    <>
      <AuthLayout title='Forgot Password Page'>
        <CardAuth>
          <FormForgotPassword />
        </CardAuth>
      </AuthLayout>
    </>
  )
}

export default ForgotPassword
