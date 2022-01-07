import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import EmailIcon from '@material-ui/icons/Email'
import PasswordInputOutlined from '../../../common/PasswordInputOutlined'
import { useForm } from 'react-final-form-hooks'
import classNames from 'classnames'
import TextFieldOutline from '../../../common/TextFieldOutlined'
import Button from '../../../common/Button'
import { pink } from '@mui/material/colors'
import Checkbox from '@mui/material/Checkbox'
import { Link as LinkDom } from 'react-router-dom'
import { Link } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { signIn } from '../../action'
import { useNavigate } from 'react-router-dom';
import { getCookieFromBrowser } from '../../../../utils/cookie'



const useStyles = makeStyles(styles)


const FormSignin = () => {
    const classes = useStyles()
    const [Checked, setChecked] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        if (getCookieFromBrowser('uid') || getCookieFromBrowser('a')) {
            navigate('/home')
        }
    });

    const onSubmitChecked = () => {
        setChecked(!Checked)
        console.log(Checked)
    }
    const onSubmit = async (values) => {       
        await signIn(values, Checked, navigate)     
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
                        <Typography variant="h4" >  Welcome e-HR </Typography>
                        <div>hello world.</div>
                    </div>

                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <TextFieldOutline
                        className={classes.textfield}
                        id={'email'}
                        placeholder={'Enter your email.'}
                        name={'email'}                                          
                        form={form}
                        endAdornment={<EmailIcon style={{ color: 'rgba(0, 0, 0, 0.54)' }} />}
                        label="Email"
                    />

                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <PasswordInputOutlined
                        className={classes.textfield}
                        id={'password'}
                        placeholder={'Enter your password.'}
                        name={'password'}
                        form={form}
                        label="Password"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    className={classes.center}
                >
                    <Button
                        loading={submitting}
                        fullWidth
                        variant={'contained'}
                        className={classes.ButtonSubmit}
                        type="submit"
                    >
                        Sign In
                    </Button>
                </Grid>
                <div className={classNames(classes.center)}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={onSubmitChecked}
                                defaultChecked
                                disableRipple
                                disableFocusRipple                               
                            />
                        }
                        label="Remember me"
                        style={{ margin: '0 65px 0 -4px' }}
                    />

                    <LinkDom to="/forgot-password">
                        <Link>Forgot password?</Link>
                    </LinkDom>
                </div>
            </Grid>
        </form>
    )
}

export default FormSignin
