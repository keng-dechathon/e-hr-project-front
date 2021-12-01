import React from 'react'
import FormForgotPassword from "../../modules/authentication/components/FormForgotPassword";
import CardSignin from '../../modules/authentication/components/CardAuth';
import MainHead from '../../modules/layout/components/MainHead';

const ForgotPassword = () => {
  return (
    <>
      <MainHead title='Forgot Password' />
      <CardSignin>
        <FormForgotPassword />        
      </CardSignin>
    </>



  )
}

export default ForgotPassword
