import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../../common/Typography/Typography'
import styles from './styles'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import FormChangePassword from './FormChangePassword';
import ModalUpdate from '../ModalUpdate';
import { green } from '@mui/material/colors';
import LockIcon from '@mui/icons-material/Lock';

const useStyles = makeStyles(styles)

const CardChangePassword = () => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <ModalUpdate open={open} handleClose={handleClose} title="Change Password" >
                <FormChangePassword handleClose={handleClose} />
            </ModalUpdate>
            <Card
                className={classes.card}
            >
                <CardHeader
                    className={classes.cardheader}
                    title={<LockIcon sx={{ color: green[500], fontSize: '30px' }} />}
                >
                </CardHeader>
                <Divider orientation="vertical" flexItem />
                <CardContent className={classes.content}>
                    <Typography variant="body1" fontWeight='bold' textAlign='left' className={classes.typography}>
                        Change Password
                    </Typography>
                    <IconButton className={classes.IconButton} onClick={handleOpen}> 
                        <EditIcon />
                    </IconButton>
                </CardContent>
            </Card>
        </>
    )
}

export default CardChangePassword
