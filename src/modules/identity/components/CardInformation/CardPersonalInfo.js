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
import { capitalizeFirstLetter } from '../../actions';
import Grid from '@material-ui/core/Grid'
import Skeleton from '@mui/material/Skeleton';
import { getDateFormat2 } from '../../actions';
import ModalUpdate from '../ModalUpdate';
import FormUpdatePersonalInfo from './FormUpdatePersonalInfo';
import Tooltip from '@mui/material/Tooltip';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const useStyles = makeStyles(styles)

const CardPersonalInfo = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { accountInformation } = useSelector(state => state.accountReducer)
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const notSet = <Typography variant="body1" fontWeight='light' color='mute' className={classes.maintext}>Not Set</Typography>
    const personalData = []

    useEffect(() => {
        dispatch(getAccountInformation())
    }, [])

    const setDataInfo = () => {
        personalData.push({ "title": "Title", "value": accountInformation.Title ? accountInformation.Title : notSet })
        personalData.push({ "title": "Full name", "value": accountInformation.Firstname && accountInformation.Lastname ? capitalizeFirstLetter(accountInformation.Firstname) + " " + capitalizeFirstLetter(accountInformation.Lastname) : notSet })
        personalData.push({ "title": "Gender", "value": accountInformation.Gender ? accountInformation.Gender : notSet })
        personalData.push({ "title": "Date of Birth", "value": accountInformation.BirthDate ? getDateFormat2(accountInformation.BirthDate) : notSet })
    }


    const fileSelectedHandler = event => {
        console.log(event.target.files[0]);
    }


    setDataInfo()

    return (
        <>
            <ModalUpdate open={open} handleClose={handleClose} title="Personal Information" >
                <FormUpdatePersonalInfo handleClose={handleClose} />
            </ModalUpdate>

            <Card
                className={classNames(classes.card, classes.margintop)}
            >
                <CardHeader
                    action={
                        <IconButton onClick={handleOpen}>
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
                            className={classNames(classes.center, classes.imgBox)}
                        >
                            <Avatar src={pic} sx={{ width: 150, height: 150 }} className={classes.image} />
                        
                        </Grid>
                        <Grid
                            item
                            xs={8}
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

export default CardPersonalInfo
