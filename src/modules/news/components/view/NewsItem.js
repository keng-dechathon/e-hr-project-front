import React, { useState } from "react";
import svgimg from '../../../../assets/svgimg.svg'
import noimg from '../../../../assets/noimg.png'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@mui/material/styles';

import Card from '@mui/material/Card';
import { Link } from 'react-router-dom'

import { Typography } from "@mui/material";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames";
import Button from "../../../common/Button";

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        padding: '10px',
        minWidth: '400px',
        width: '100%',
        // backgroundColor: '#F1F3FF !important',
        // boxShadow: 'rgba(0, 0, 0, 0.10) 0px 5px 10px 0px !important',
        // borderRadius: '12px !important',
        marginBottom: '15px',
        // [theme.breakpoints.down("sm")]: {
        //     flexDirection: 'column',
        // },
        cursor: 'pointer',
        boxSizing: 'border-box',
        border: '2px solid transparent',
        ['&:hover']: {
            border: '2px solid #E2DED0',
            opacity: '0.8',
        },

    },
    img: {
        display: 'flex  !important',
        width: '240px  !important',
        minHeight: '100px  !important',
        backgroundRepeat: 'no-repeat  !important',
        borderRadius: '0 !important  !important',
        backgroundPosition: 'center  !important',
        backgroundSize: 'cover  !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        flexDirection: 'column  !important',
        color: 'white !important ',
        imageRendering: 'auto !important',
        imageRendering: 'crisp-edges  !important',
        imageRendering: 'pixelated  !important',
        imageRendering: '-webkit-optimize-contrast  !important',
        backgroundSize: "contain",
        objectFit: "contain",
        // [theme.breakpoints.down("sm")]: {
        //     width: '100% !important',
        // },
    },
    detail: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        marginLeft: '20px',
    },
    emptyNews: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    date: {
        display: 'flex',
        alignItems: 'right',
        justifyContent: 'right',
        bottom: '0',
        color: '#333132 !important',
        opacity: '0.5 !important',
    },

    text: {
        width: '100%',
        marginTop: '10px !important',
        textOverflow: 'ellipsis',
        wordBreak: 'break-all',
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
    },
    maintext: {
        marginRight: '10px',
        minHeight: '100px',
    },
    ButtonSubmit: {
        minWidth: '400px',
        backgroundColor: '#C91F92 !important',
        marginTop: '10px',
        color: '#FFFFFF',
        '&:hover': {
            opacity: '0.8',
        }
    },
    center:{
        display:'flex',
        width:"100%",
     
    }
}));

const NewsItem = ({ items, loading }) => {

    const classes = useStyles()
    const [more, setMore] = useState(false)
    const handleChangeMore = () => {
        setMore(!more)
    }
    const theme = useTheme();
    return (
        <>
            {
                items.length !== 0 ? items.map((value, index) => (
                    !more && index <= 2 ?
                        <Link to={"/news/" + value.News_id}>
                            <Card className={classNames(classes.card)} key={index}>
                                <div
                                    className={classes.img}
                                    style={{
                                        backgroundImage: `url(${value.Img && value.Img !== 'null' ? value.Img : noimg})`,

                                    }}
                                />
                                <div className={classes.detail}>
                                    <div className={classes.maintext}>
                                        <Typography variant="h6" className={classes.text}>
                                            {value.Topic}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" className={classes.text}>
                                            {value.Detail}
                                        </Typography>
                                    </div>

                                    <Typography variant="subtitle2" color="text.secondary" className={classNames(classes.text, classes.date)}>
                                        {value.Start}
                                    </Typography>
                                </div>
                            </Card>
                        </Link>
                        : more ?
                            <Link to={"/news/" + value.News_id}>
                                <Card className={classNames(classes.card)} key={index}>
                                    <div
                                        className={classes.img}
                                        style={{
                                            backgroundImage: `url(${value.Img && value.Img !== 'null' ? value.Img : noimg})`,

                                        }}
                                    />
                                    <div className={classes.detail}>
                                        <div className={classes.maintext}>
                                            <Typography variant="h6" className={classes.text}>
                                                {value.Topic}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" className={classes.text}>
                                                {value.Detail}
                                            </Typography>
                                        </div>

                                        <Typography variant="subtitle2" color="text.secondary" className={classNames(classes.text, classes.date)}>
                                            {value.Start}
                                        </Typography>
                                    </div>
                                </Card>
                            </Link> : ''

                )) :
                    <div className={classes.emptyNews}>
                        {loading ?
                            <Card className={classes.card} key={"X"}>
                                <div
                                    className={classes.img}
                                />
                                <div className={classes.detail}>
                                    <Typography component="div" variant="h5">
                                        <Skeleton width={'100%'} height={40} animation="wave" />
                                    </Typography>
                                    <Typography variant="subtitle1" component="div">
                                        <Skeleton width={'100%'} height={40} animation="wave" />
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" className={classNames(classes.text, classes.date)}>
                                        <Skeleton width={'100%'} height={40} animation="wave" />
                                    </Typography>
                                </div>
                            </Card>
                            :
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                There is no news information to display.
                            </Typography>
                        }
                    </div>




            }
            {
                !more && items.length > 3 ?
                    <Button
                        fullWidth
                        variant={'contained'}
                        className={classes.ButtonSubmit}
                        onClick={handleChangeMore}
                    >
                        More News
                    </Button>
                    :
                    <Typography variant="h6" color="text.secondary" className={classNames(classes.text, classes.date,classes.center)} style={{ marginTop: '30px' }}>
                        That's all news.
                    </Typography>
            }

        </>
    )
};

export default NewsItem;
