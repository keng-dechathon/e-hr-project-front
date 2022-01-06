import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../common/Typography/Typography'
import styles from './styles'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@mui/material/Skeleton';

const useStyles = makeStyles(styles)

const CardWorkInfo = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const personalData = [], initial = {}

    const { empInformationByID } = useSelector(state => state.employeeReducer)

    const notSet = <Typography variant="body1" fontWeight='light' color='mute' className={classes.maintext}>Not Set</Typography>

    const setDataInfo = () => {
        personalData.push({ "title": "Staff ID", "value": empInformationByID.Emp_id ? empInformationByID.Emp_id : notSet })
        personalData.push({ "title": "Position", "value": empInformationByID.Position ? empInformationByID.Position : notSet })
        personalData.push({ "title": "User Role", "value": empInformationByID.Role ? empInformationByID.Role : notSet })
        personalData.push({ "title": "Company", "value": empInformationByID.Company ? empInformationByID.Company : notSet })

    }


    setDataInfo()
    return (
        <>
            <Card
                className={classes.card}
            >
                <CardHeader              
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

export default CardWorkInfo
