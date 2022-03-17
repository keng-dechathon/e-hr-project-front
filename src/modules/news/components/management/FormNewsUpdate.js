import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-final-form-hooks'
import Button from '../../../common/Button'
import { makeStyles } from '@material-ui/core/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { updateNews } from '../../actions'
import DialogActions from '@mui/material/DialogActions';
import { getAllNewsInformation } from '../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { TextField } from '@mui/material'
import Snackbar from '../../../layout/components/Snackbar'
import { convertFileToBase64 } from '../../../../utils/miscellaneous'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { addNews } from '../../actions';
import { Box } from '@mui/system'

const useStyles = makeStyles(() => ({
    ButtonSubmit: {
        background: '#04AA6D',
        color: '#FFFFFF',
        '&:hover': {
            background: '#ffa000',

        },
    },
    dialogAction: {
        marginTop: '10px',
        paddingRight: '0 !important',

    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }

}));




const FormNewsUpdate = (props) => {
    const classes = useStyles()
    const { handleClose, id, option } = props

    const dispatch = useDispatch()
    const { allNewsInformation } = useSelector(state => state.newsReducer)

    useEffect(() => {        
        dispatch(getAllNewsInformation())
    }, [])


    const item = Object.keys(allNewsInformation).length !== 0 && option != 'add' ? allNewsInformation.data.filter(value => value.News_id === id) : ''
    const [newsId, setNewsID] = useState(item.length !== 0 ? item[0].News_id ? item[0].News_id : '' : '')
    const [topic, setTopic] = useState(item.length !== 0 ? item[0].Topic ? item[0].Topic : '' : '')
    const [detail, setDetail] = useState(item.length !== 0 ? item[0].Detail ? item[0].Detail : '' : '')
    const [start, setStart] = useState(item.length !== 0 ? item[0].Start ? new Date(moment(item[0].Start).format()) : moment().format() : moment().format())
    const [end, setEnd] = useState(item.length !== 0 ? item[0].End ? new Date(moment(item[0].End).format()) : moment().format() : moment().format())
    const [user, setUser] = useState('')
    const [imageBase64, setImageBase64] = useState('')


    useEffect(() => {
        setTimeout(() => setUser({ News_id: newsId, Topic: topic, Detail: detail, Start: moment(start).format('yyyy-MM-DD HH:mm:00'), End: moment(end).format('yyyy-MM-DD HH:mm:00'), Img: imageBase64 }))
    }, [topic, detail, imageBase64, start, end, id])


    const handleChangeTopic = (e) => {
        setTopic(e.target.value)
    }

    const handleChangeDetail = (e) => {
        setDetail(e.target.value)
    }

    const handleChangeStart = (value) => {
        setStart(new Date(moment(value).format()))    
    }
    const handleChangeEnd = (value) => {
        setEnd(new Date(moment(value).format()))
    }
    const onChangeImage = async (event) => {
        const file = event.target.files[0]
        const fileBase64 = await convertFileToBase64(file)
        setImageBase64(fileBase64)
    }

    const onSubmit = async () => {
        if (option === 'update') await updateNews(user)
        else if (option === 'add') await addNews(user)
        dispatch(getAllNewsInformation())
        handleClose()
    };

    const { handleSubmit, submitting } = useForm({
        onSubmit: onSubmit,
    })

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form
                onSubmit={handleSubmit}
            >
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <InputLabel>Name *</InputLabel>
                        <TextField
                            id='topic'
                            name='topic'
                            required
                            size='small'
                            defaultValue={topic}
                            onChange={handleChangeTopic}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Description *</InputLabel>
                        <TextField
                            id='detail'
                            name='detail'
                            size='small'
                            defaultValue={detail}
                            onChange={handleChangeDetail}
                            required
                            fullWidth
                            multiline
                            rows={5}
                            rowsMax={5}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <InputLabel><pre> Date&Time (Begin to Expire)*</pre></InputLabel>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', paddingTop: '0px' }}>
                        <DateTimePicker
                            inputFormat="dd/MM/yyyy hh:mm a"
                            value={start}
                            onChange={handleChangeStart}

                            renderInput={(params) => <TextField fullWidth required {...params} size='small'/>}
                        />
                        <Box sx={{ mx: 2 }} className={classes.center}> to </Box>
                        <DateTimePicker
                            inputFormat="dd/MM/yyyy hh:mm a"
                            value={end}
                            onChange={handleChangeEnd}
                            renderInput={(params) => <TextField fullWidth required {...params} size='small'/>}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <InputLabel>Image Upload</InputLabel>
                        <input type='file' id='file-input' accept="image/*" onChange={onChangeImage} />
                    </Grid>

                </Grid>
                <DialogActions className={classes.dialogAction}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        loading={submitting}
                        variant={'contained'}
                        className={classes.ButtonSubmit}
                        type="submit"
                        autoFocus
                    >
                        Update
                    </Button>
                </DialogActions>
                <Snackbar />
            </form>
        </LocalizationProvider>


    )
}

export default FormNewsUpdate
