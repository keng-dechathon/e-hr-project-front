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
import EmailIcon from '@mui/icons-material/Email';

import { green } from '@mui/material/colors';

import LockIcon from '@mui/icons-material/Lock';

const useStyles = makeStyles(styles)

const CardChangeEmail = () => {
    const classes = useStyles()

    return (
        <>
            <Card
                className={classes.card}
            >
                <CardHeader
                    className={classes.cardheader}
                    title={<EmailIcon sx={{ color: green[500], fontSize: '30px' }} />}
                >
                </CardHeader>
                <Divider orientation="vertical" flexItem />
                <CardContent className={classes.content}>
                    <Typography variant="body1" fontWeight='bold' textAlign='left' className={classes.typography}>
                        Email Address
                    </Typography>
                    <IconButton className={classes.IconButton} disabled>
                        <EditIcon color="disabled" />
                    </IconButton>
                </CardContent>
            </Card>
        </>
    )
}

export default CardChangeEmail
