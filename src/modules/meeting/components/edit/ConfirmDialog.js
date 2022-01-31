import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteMeeting } from '../../actions';
import { getMeetingRoomInformation, getMeetingInformationById, getMeetingInformationByMultiId, getMeetingInformationByRoomId } from '../../actions';
import { useSelector, useDispatch } from 'react-redux'


export default function ConfirmDialog(props) {
    const { open, handleOpenConfirmDialog,deleteID,uid } = props
    const dispatch = useDispatch()

    const onClickDelete = async (id) => {
        await deleteMeeting(String(deleteID))
        dispatch(getMeetingInformationByMultiId('','',[String(uid)]))
        handleOpenConfirmDialog()
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleOpenConfirmDialog}
                aria-labelledby="alert-dialog-title"
                disableEnforceFocus 
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOpenConfirmDialog}>Disagree</Button>
                    <Button onClick={onClickDelete} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
