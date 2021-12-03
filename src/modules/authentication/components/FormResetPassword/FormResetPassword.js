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
import { resetPassword } from '../../action'
import { decodeB64 } from '../../../../utils/crypto'

const useStyles = makeStyles(styles)


const FormResetPassword = () => {
    const classes = useStyles()
    const [Checked, setChecked] = useState(true)
    const navigate = useNavigate();
    const [username, setUsername] = useState("")

    useEffect(() => {
        if (getCookieFromBrowser("u")) {
            // console.log(decodeB64(getCookieFromBrowser("u")));
            setUsername(decodeB64(getCookieFromBrowser("u")) )
        } else {
            navigate('/sign-in')
        }
    });

    const onSubmit = async (values) => {
        console.log(values);

        await resetPassword(values, username, navigate)
    }

    //check username cookie




    const { form, handleSubmit, submitting, values } = useForm({
        onSubmit: onSubmit,
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
                        <Typography variant="h4" >Reset Password</Typography>
                        <div>you need to change your password.</div>
                    </div>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <PasswordInputOutlined
                        className={classes.textfield}
                        id={'oldPassword'}
                        placeholder={'Enter New Password.'}
                        name={'oldPassword'}
                        form={form}
                        label="Old Password"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <PasswordInputOutlined
                        className={classes.textfield}
                        id={'newPassword'}
                        placeholder={'Enter New Password.'}
                        name={'newPassword'}
                        form={form}
                        label="New Password"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <PasswordInputOutlined
                        className={classes.textfield}
                        id={'confirmPassword'}
                        placeholder={'Re-Enter New Password.'}
                        name={'confirmPassword'}
                        form={form}
                        label="Confirm Password"
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
                        Reset Password
                    </Button>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <LinkDom to="/sign-in">
                        <Link>Back to sign-in</Link>
                    </LinkDom>
                </Grid>
            </Grid>
        </form>
    )
}

export default FormResetPassword
