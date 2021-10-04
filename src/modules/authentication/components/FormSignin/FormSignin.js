import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import EmailIcon from '@material-ui/icons/Email'
import PasswordInputOutlined from '../../../common/PasswordInputOutlined'
import { useForm } from 'react-final-form-hooks'
import classNames from 'classnames'
import TextFieldOutline from '../../../common/TextFieldOutlined'
import Button from '../../../common/Button'

import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'


const useStyles = makeStyles(styles)


const FormSignin = () => {
    const classes = useStyles()
    // const [loadingSignIn, setLoadingSignIn] = useState(false)
    const handleSubmitSignIn = async () => {
        // await setLoadingSignIn(true)
        console.log(values);
        // await signIn(value)
        // await setLoadingSignIn(false)
    }

    const { form, handleSubmit, submitting, values } = useForm({
        onSubmit: handleSubmitSignIn
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
                    <div className={classNames(classes.center, classes.head)}>
                        <Typography variant="h4" >  Welcome e-HR </Typography>
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
                >
                    <PasswordInputOutlined
                        className={classes.textfield}
                        id={'password'}
                        placeholder={'Password'}
                        name={'password'}
                        form={form}
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
                        Sign In
                    </Button>
                </Grid>
                <Grid item xs={12} className={classes.center}>
                    <Link href="#">Forgot password?</Link>
                </Grid>

            </Grid>
        </form>
    )
}

export default FormSignin
