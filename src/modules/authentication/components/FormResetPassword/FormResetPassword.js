import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import EmailIcon from '@material-ui/icons/Email'
import PasswordInputOutlined from '../../../common/PasswordInputOutlined'
import { useForm } from 'react-final-form-hooks'
import classNames from 'classnames'
import TextFieldOutline from '../../../common/TextFieldOutlined'
import Button from '../../../common/Button'
import { Link as LinkDom } from 'react-router-dom'
import { Link } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'


const useStyles = makeStyles(styles)


const FormResetpassword = () => {
    const classes = useStyles()

    const onSubmit = async (values) => {
        console.log(values);
    }

    const { form, handleSubmit, submitting, values } = useForm({
        onSubmit: onSubmit
    })


    return (
        <div className={classes.root}>
            <form
                className={classes.form}
                onSubmit={handleSubmit}
            >
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <div className={classNames(classes.center, classes.head, classes.massage)}>
                            <Typography variant="h4" >Forgot Password</Typography>
                            <div>we will send reset url link to your email</div>
                        </div>

                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <TextFieldOutline
                            className={classes.textfield}
                            id={'email'}
                            placeholder={'Email'}
                            name={'email'}
                            form={form}
                            endAdornment={<EmailIcon style={{ color: 'rgba(0, 0, 0, 0.54)' }} />}
                        />

                    </Grid>


                </Grid>
            </form>
        </div>

    )
}

export default FormResetpassword
