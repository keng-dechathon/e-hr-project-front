import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import EmailIcon from '@material-ui/icons/Email'
import PasswordInputOutlined from '../../../common/PasswordInputOutlined'
import { useForm } from 'react-final-form-hooks'
import classNames from 'classnames'
import TextFieldOutline from '../../../common/TextFieldOutlined'
import Button from '../../../common/Button'
import { Link as LinkDom  } from 'react-router-dom'
import { Link } from '@material-ui/core'

import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'


const useStyles = makeStyles(styles)


const FormForgotPassword = () => {
    const classes = useStyles()
    const onSubmit = async () => {
        console.log(values);
    }

    const { form, handleSubmit, submitting, values } = useForm({
        onSubmit: onSubmit
    })


    return (
        <form
            className={classes.root}
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
                <Grid
                    item
                    xs={12}
                    className={classes.center}
                >
                    <Button
                        loading={true}
                        fullWidth
                        variant={'contained'}
                        className={classes.ButtonSubmit}
                        type="submit"
                    >
                        Send
                    </Button>
                </Grid>
                <Grid item xs={12} className={classes.center}>
                    <pre>Already have login and password? </pre>
                    <LinkDom to="/sign-in">
                        <Link>Sign in</Link>
                    </LinkDom>
                </Grid>

            </Grid>
        </form>
    )
}

export default FormForgotPassword
