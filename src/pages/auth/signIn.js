import React from 'react'
import CardSignin from '../../modules/authentication/components/CardAuth'
import FormSignin from '../../modules/authentication/components/FormSignin'
import MainHead from '../../modules/layout/components/MainHead'

const SignIn = () => {
  return (
    <>
      <MainHead title='Sign In'/>
      <CardSignin>
        <FormSignin />
      </CardSignin>
    </>
  )
}

export default SignIn
