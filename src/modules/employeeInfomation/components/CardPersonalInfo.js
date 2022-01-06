import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../common/Typography/Typography'
import styles from './styles'
import classNames from 'classnames'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

import { useSelector, useDispatch } from 'react-redux'

import { capitalizeFirstLetter } from '../../../utils/miscellaneous';
import Grid from '@material-ui/core/Grid'
import Skeleton from '@mui/material/Skeleton';
import { getDateFormat2 } from '../../../utils/miscellaneous'; 


const useStyles = makeStyles(styles)

const CardPersonalInfo = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { empInformationByID } = useSelector(state => state.employeeReducer)
  
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const notSet = <Typography variant="body1" fontWeight='light' color='mute' className={classes.maintext}>Not Set</Typography>
    const personalData = []

    useEffect(() => {
        // dispatch(getAccountInformation())
    }, [])
 
    const setDataInfo = () => {
        personalData.push({ "title": "Title", "value": empInformationByID.Title ? empInformationByID.Title : notSet })
        personalData.push({ "title": "Full name", "value": empInformationByID.Firstname && empInformationByID.Lastname ? capitalizeFirstLetter(empInformationByID.Firstname) + " " + capitalizeFirstLetter(empInformationByID.Lastname) : notSet })
        personalData.push({ "title": "Gender", "value": empInformationByID.Gender ? empInformationByID.Gender : notSet })
        personalData.push({ "title": "Date of Birth", "value": empInformationByID.BirthDate ? getDateFormat2(empInformationByID.BirthDate) : notSet })
    }
    
    setDataInfo()

    return (
        <>
            {/* <ModalUpdate open={open} handleClose={handleClose} title="Personal Information" >
                <FormUpdatePersonalInfo handleClose={handleClose} />
            </ModalUpdate> */}

            <Card
                className={classNames(classes.card, classes.margintop)}
            >
                <CardHeader                   
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
                            xs={8}
                        >
                            {personalData.map((items) => {
                                return (
                                    <div className={Object.keys(empInformationByID).length !== 0 ? classes.textbox : classes.textboxSkeleton}>
                                        <Typography variant="body1" fontWeight='bold' className={classes.maintext}>{items.title}</Typography>
                                        <Typography variant="body1" fontWeight='light' className={classes.subtext}>
                                            {Object.keys(empInformationByID).length !== 0 ?
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
