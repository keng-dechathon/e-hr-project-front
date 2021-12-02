import React from 'react'
import FormResetpassword from '../../modules/authentication/components/FormResetPassword';
import CardSignin from '../../modules/authentication/components/CardAuth';
import MainHead from '../../modules/layout/components/MainHead';
import AuthLayout from '../../modules/layout/components/AuthLayout';
import Navbar from '../../modules/layout/components/Navbar';

const ResetPassword = () => {
    return (
        <>
            <AuthLayout title='Reset Password Page'>
                <Navbar />
              
                     <FormResetpassword />
            
               
            </AuthLayout>
        </>
    )
}

export default ResetPassword
