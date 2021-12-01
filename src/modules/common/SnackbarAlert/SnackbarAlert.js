import React, { useState, useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import isEmpty from 'lodash/isEmpty'
import upperFirst from 'lodash/upperFirst'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

const useStyles = makeStyles(styles)

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const SnackbarAlert = ({
    onClose,
    open,
    severity = "info",
    autoHideDuration = 4000,
    snackbarObject
}) => {
    const classes = useStyles()
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false)
        onClose()
    }

    useEffect(() => {
        if (open) setOpenSnackbar(true)
        if (!open) setOpenSnackbar(false)
    }, [open])


    return (
        <div className={classes.root}>
            {!isEmpty(snackbarObject) ?
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={openSnackbar}
                    autoHideDuration={autoHideDuration}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={onClose}
                        severity={severity}
                        classes={{
                            root: clsx(classes.alert, {
                                [classes.iconSuccess]: severity === "success",
                                [classes.iconError]: severity === "error",
                                [classes.iconWarning]: severity === "warning",
                                [classes.iconInfo]: severity === "info"
                            }),
                            icon: classes.icon,
                            filledSuccess: classes.alertSuccess,
                            filledInfo: classes.alertInfo,
                            filledWarning: classes.alertWarning,
                            filledError: classes.alertError
                        }}
                    >
                        <span
                            className={clsx(classes.textTitle, {
                                [classes.textSuccess]: severity === "success",
                                [classes.textError]: severity === "error",
                                [classes.textWarning]: severity === "warning",
                                [classes.textInfo]: severity === "info"
                            })}>
                            {upperFirst(severity)}
                        </span>
                        <br />
                        <span className={classes.textBody}>{snackbarObject.message}</span>
                    </Alert>
                </Snackbar>
                :
                ''
            }
        </div>
    )
}

export default SnackbarAlert
