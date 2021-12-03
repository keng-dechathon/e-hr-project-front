import React from 'react'
import FormResetpassword from '../../modules/authentication/components/FormResetPassword';
import CardAuth from '../../modules/authentication/components/CardAuth';
import MainHead from '../../modules/layout/components/MainHead';
import AuthLayout from '../../modules/layout/components/AuthLayout';
import Navbar from '../../modules/layout/components/Navbar';

const ResetPassword = () => {
    return (
        <>
            <AuthLayout title='Reset Password Page'>
                <CardAuth>
                     <FormResetpassword />
                </CardAuth>
              
                    
            
               
            </AuthLayout>
        </>
    )
}

export default ResetPassword
