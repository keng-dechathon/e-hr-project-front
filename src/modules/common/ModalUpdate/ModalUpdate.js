import React from 'react';
import Typography from '../Typography/Typography';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



const ModalUpdate = (props) => {
  
    const theme = useTheme()

    const { open, handleClose, children, title } = props

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
                        {title}
                    </Typography>
                </DialogTitle>
                <Divider variant="middle" />
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ModalUpdate
