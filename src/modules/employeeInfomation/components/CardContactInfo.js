import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../common/Typography/Typography'
import styles from './styles'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';
import ModalUpdate from '../../common/ModalUpdate';
import FormUpdateContactInfo from './FormUpdateContactInfo';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@mui/material/Skeleton';
import { isPath } from '../../../utils/miscellaneous';
import { empMgnt } from './path';

const useStyles = makeStyles(styles)

const CardContactInfo = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const personalData = []
    const { empInformationByID } = useSelector(state => state.employeeReducer)
    const [open, setOpen] = React.useState(false);
    const { id } = props
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const notSet = <Typography variant="body1" fontWeight='light' color='mute' className={classes.maintext}>Not Set</Typography>


    const setDataInfo = () => {
        personalData.push({ "title": "Email Address", "value": empInformationByID.Email ? empInformationByID.Email : notSet })
        personalData.push({ "title": "Phone", "value": empInformationByID.Phone ? empInformationByID.Phone : notSet })
        personalData.push({ "title": "Address", "value": empInformationByID.Address ? empInformationByID.Address : notSet })
        personalData.push({ "title": "Supervisor", "value": empInformationByID.Supervisor ? empInformationByID.Supervisor : notSet })
    }




    setDataInfo()
    return (
        <>
            <ModalUpdate open={open} handleClose={handleClose} title="Personal Information" >
                <FormUpdateContactInfo handleClose={handleClose} id={id} />
            </ModalUpdate>
            <Card
                className={classes.card}
            >
                <CardHeader
                    action={
                        isPath(empMgnt) ?
                            <IconButton onClick={handleOpen}>
                                <EditIcon />
                            </IconButton> : ''
                    }
                    title="Contact Information"
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

export default CardContactInfo
