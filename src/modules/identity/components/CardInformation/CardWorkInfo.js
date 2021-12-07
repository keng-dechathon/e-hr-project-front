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

const CardWorkInfo = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const personalData = [], initial = {}
    const { accountInformation } = useSelector(state => state.accountReducer)

    const notSet = <Typography variant="body1" fontWeight='light' color='mute' className={classes.maintext}>Not Set</Typography>

    useEffect(() => {
        dispatch(getAccountInformation())
    }, [])
   

    const setDataInfo = () => {
        personalData.push({ "title": "Staff ID", "value": accountInformation.Emp_id ? accountInformation.Emp_id : notSet })
        personalData.push({ "title": "Position", "value": accountInformation.Position ? accountInformation.Position : notSet })
        personalData.push({ "title": "User Role", "value": accountInformation.Role ? accountInformation.Role : notSet })
        personalData.push({ "title": "Company", "value": accountInformation.Company ? accountInformation.Company : notSet })

    }


    const fileSelectedHandler = event => {
        console.log(event.target.files[0]);
    }

    setDataInfo()
    return (
        <>
            <Card
                className={classes.card}
            >
                <CardHeader
                    action={
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                    }
                    title="Work Information"
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
                            xs={12}
                        >
                            {personalData.map((items, indexs) => {
                                return (
                                    <div className={Object.keys(accountInformation).length !== 0 ? classes.textbox : classes.textboxSkeleton}>
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

export default CardWorkInfo
