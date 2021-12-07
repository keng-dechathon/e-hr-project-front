import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../../common/Typography/Typography'
import styles from './styles'
import classNames from 'classnames'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { getAccountInformation } from '../../actions'
import { useSelector, useDispatch } from 'react-redux'
import pic from '../../../../assets/pic.png'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Grid from '@material-ui/core/Grid'
import Skeleton from '@mui/material/Skeleton';
import Modal from '@mui/material/Modal';

const useStyles = makeStyles(styles)

const CardChangePassword = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const personalData = [], initial = {}
    const { accountInformation } = useSelector(state => state.accountReducer)

    const notSet = <Typography variant="body1" fontWeight='light' color='mute' className={classes.maintext}>Not Set</Typography>

    useEffect(() => {
        dispatch(getAccountInformation())
    }, [])
    console.log(accountInformation);

 

    const fileSelectedHandler = event => {
        console.log(event.target.files[0]);
    }

    
    return (
        <>
            <Card
                className={classes.card}
            >
                <CardHeader
                                  
                    className={classes.cardheader}
                />
                <Divider/>
                <CardContent>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                       
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default CardChangePassword
