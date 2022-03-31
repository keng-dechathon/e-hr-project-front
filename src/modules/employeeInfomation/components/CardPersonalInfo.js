import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../common/Typography/Typography'
import styles from './styles'
import classNames from 'classnames'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import FormUpdatePersonalInfo from './FormUpdatePersonalInfo';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import ModalUpdate from '../../common/ModalUpdate';
import { useSelector, useDispatch } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { capitalizeFirstLetter } from '../../../utils/miscellaneous';
import Grid from '@material-ui/core/Grid'
import Skeleton from '@mui/material/Skeleton';
import { getDateFormat2 } from '../../../utils/miscellaneous';
import { isPath } from '../../../utils/miscellaneous';
import { empMgnt } from './path';

const useStyles = makeStyles(styles)

const CardPersonalInfo = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { id } = props
    const { empInformationByID } = useSelector(state => state.employeeReducer)

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const notSet = <Typography variant="body1" fontWeight='light' color='mute' className={classes.maintext}>Not Set</Typography>
    const personalData = []


    const setDataInfo = () => {
        personalData.push({ "title": "Title", "value": empInformationByID.Title ? empInformationByID.Title : notSet })
        personalData.push({ "title": "Full name", "value": empInformationByID.Firstname && empInformationByID.Lastname ? capitalizeFirstLetter(empInformationByID.Firstname) + " " + capitalizeFirstLetter(empInformationByID.Lastname) : notSet })
        personalData.push({ "title": "Gender", "value": empInformationByID.Gender ? empInformationByID.Gender : notSet })
        personalData.push({ "title": "Date of Birth", "value": empInformationByID.BirthDate ? getDateFormat2(empInformationByID.BirthDate) : notSet })
    }

    setDataInfo()

    return (
        <>
            <ModalUpdate open={open} handleClose={handleClose} title="Personal Information" >
                <FormUpdatePersonalInfo handleClose={handleClose} id={id}/>
            </ModalUpdate>

            <Card
                className={classNames(classes.card, classes.margintop)}
            >
                <CardHeader
                    action={
                        isPath(empMgnt) ?
                            <IconButton onClick={handleOpen}>
                                <EditIcon />
                            </IconButton> : ''
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
                            xs={12}
                        >
                            {personalData.map((items,index) => {
                                return (
                                    <div className={Object.keys(empInformationByID).length !== 0 ? classes.textbox : classes.textboxSkeleton}  key={index}>
                                        <Typography variant="body1" fontWeight='bold' className={classes.maintext}  key={index+"x"}>{items.title}</Typography>
                                        <Typography variant="body1" fontWeight='light' className={classes.subtext}  key={index+"y"}>
                                            {Object.keys(empInformationByID).length !== 0 ?
                                                items.value
                                                :
                                                <Skeleton width={'100%'} height={40} animation="wave" key={index}/>
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
