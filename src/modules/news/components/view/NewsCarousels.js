import React, { useEffect } from "react";
import svgimg from '../../../../assets/svgimg.svg'
import { makeStyles } from '@material-ui/core/styles'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CircularProgress from "../../../common/CircularProgress/CircularProgress";
import { Link } from 'react-router-dom'
import "./styles.css"
const useStyles = makeStyles(() => ({
    carousel: {
        ['& .makeStyles-buttonWrapper-8']: {
            height: `100% !important`,
            justifyContent: 'center',
            alignItems: 'center'
        },
        // boxShadow: 'rgba(0, 0, 0, 0.3) 0px 5px 20px 0px !important',
    },
    item: {
        display: 'flex',
        width: '100%',
        height: '240px',
        backgroundRepeat: 'no-repeat',
        borderRadius: '0 !important',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        flexDirection: 'column',
        color: 'white !important',
        imageRendering: 'auto',
        imageRendering: 'crisp-edges',
        imageRendering: 'pixelated',
        imageRendering: '-webkit-optimize-contrast',
        textOverflow: 'ellipsis',
        wordBreak: 'break-all',
        padding: '30px',
        cursor:'pointer',
        '&:hover':{
            opacity:'0.8',
        }
    },



}));




const NewsSlider = ({ items, loading }) => {


    const classes = useStyles()
    const emptyItem = () => {
        return (
            <Paper
                className={classes.item}
            >
                {loading ? <CircularProgress /> : <h2>There is no news information to display.</h2>}
            </Paper>
        )
    }
    function Item(props) {
        
        return (
            <Link to={"/news/" + props.item.News_id}>
                <Paper
                    className={classes.item}
                    style={{
                        backgroundImage: `url(${props.item.Img ? props.item.Img : svgimg})`,
                    }}
                >
                    {/* <h2>{props.item.Topic === '-' || !props.item.Topic ? '' : props.item.Topic}</h2> */}
                    {/* <p>{props.item.Detail === '-' || !props.item.Detail ? '' : props.item.Detail}</p> */}

                </Paper>
            </Link>
        )
    }
    return (
        <div>
            <Carousel
                navButtonsAlwaysVisible='true'
                animation='fade'
                duration='900'
                className={classes.carousel}
                PrevIcon={<ArrowBackIosNewIcon />}
                NextIcon={<ArrowForwardIosIcon />}
                cycleNavigation={true}
                navButtonsProps={{
                    style: {
                        borderRadius: '0',
                        top: '0',
                        color: 'white',
                        opacity: '0.3',
                        background: '#2F4F4F',
                    }
                }}
                navButtonsWrapperProps={{
                    style: {

                    }
                }}
                indicatorContainerProps={{
                    style: {
                        position: 'absolute',
                        bottom: '0',
                        zIndex: '1',
                        marginBottom: '8px',
                    }

                }}
                indicatorIconButtonProps={{
                    style: {
                        color: '#A9A9A9',
                        opacity: '0.8',
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        color: '#2F4F4F',
                        opacity: '0.8',
                    }
                }}
            >
                {
                    items.length !== 0 ? items.map((item, i) => <Item key={i + "c"} item={item} />) : emptyItem()
                }
            </Carousel>
        </div >
    )
};

export default NewsSlider;
