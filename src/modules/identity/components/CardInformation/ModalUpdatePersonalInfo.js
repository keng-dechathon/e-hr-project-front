import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../../common/Typography/Typography'
import styles from './styles'
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormUpdatePersonalInfo from './FormUpdatePersonalInfo'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles(styles)

const CardUpdatePersonalInfo = (props) => {
    const classes = useStyles()
    const theme = useTheme()

    const { open, handleClose,children } = props
   
    const fullScreen = useMediaQuery(theme.breakpoints.down('md')); 

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen={fullScreen}              
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h6" fontWeight='bold' >
                        Personal Information
                    </Typography>
                </DialogTitle>
                <Divider variant="middle" />
                <DialogContent>
                    <FormUpdatePersonalInfo handleClose={handleClose} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CardUpdatePersonalInfo
