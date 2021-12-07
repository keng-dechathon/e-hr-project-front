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
const useStyles = makeStyles(styles)

const CardPersonalInfo = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const personalData = [], initial = {}
    const { accountInformation } = useSelector(state => state.accountReducer)
    const notSet = <Typography variant="body1" fontWeight='light' color='mute' className={classes.maintext}>Not Set</Typography>
    useEffect(() => {
        dispatch(getAccountInformation())
    }, [])
    console.log(accountInformation);

    const setDataInfo = () => {
        personalData.push({ "title": "Title", "value": accountInformation.Title ? accountInformation.Title : notSet })
        personalData.push({ "title": "Full name", "value": accountInformation.Firstname && accountInformation.Lastname ? accountInformation.Firstname + " " + accountInformation.Lastname : notSet })
        personalData.push({ "title": "Gender", "value": accountInformation.Gender ? accountInformation.Gender : notSet })
        personalData.push({ "title": "Date of Birth", "value": accountInformation.BirthDate ? accountInformation.BirthDate : notSet })


    }


    const fileSelectedHandler = event => {
        console.log(event.target.files[0]);
    }

    setDataInfo()
    return (
        <>
            <Card
                className={classNames(classes.card, classes.margintop)}
            >
                <CardHeader
                    action={
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                    }
                    title="Personal Information"
                    className={classes.cardheader}
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid
                            item
                            xs={4}
                            className={classes.center}
                        >
                            <Avatar alt="Remy Sharp" src={pic} sx={{ width: 150, height: 150 }} />
                            {/* <input type='file' onChange={event => fileSelectedHandler(event)} /> */}
                        </Grid>
                        <Grid
                            item
                            xs={8}
                        >
                            {personalData.map((items, indexs) => {
                                return (
                                    <div className={classes.textbox}>
                                        <Typography variant="body1" fontWeight='bold' className={classes.maintext}>{items.title}</Typography>
                                        <Typography variant="body1" fontWeight='light' className={classes.subtext}>
                                            {Object.keys(accountInformation).length !== 0 ?
                                                items.value
                                                :
                                                <Skeleton width={'100%'} height={40} animation="wave" />
                                            }
                                        </Typography>
                                    </div>
                                )

                            })}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default CardPersonalInfo
