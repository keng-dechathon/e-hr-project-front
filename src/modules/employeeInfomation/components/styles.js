import { borderRadius } from "@mui/system";

export default () => ({
    card: {   
        // backgroundColor: '#F1F3FF !important',        
        marginBottom: '16px',
        // rgba(0, 0, 0, 0.25)
    },
    cardheader: {
        padding: '6px 10px !important',
        [`& .css-1qvr50w-MuiTypography-root  `]: {

            fontWeight: '550',
            fontSize: '18px !important',
        },
    },
    input: {
        display: "none",
    },
    textbox: {
        display: 'flex',
        marginLeft: '10px',
        marginTop: '10px',
    },
    textboxSkeleton: {
        display: 'flex',
        marginLeft: '10px',
    },
    maintext: {
        width: '200px',
        marginRight: '20px',
        display: 'flex',
        alignItems: 'center',
    },
    subtext: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    margintop: {
        marginTop: '10px'
    },

    avatar: {
        height: '200px',
        width: '200px',
    },

    btnfile: {
        position: 'absolute !important',

        background: 'rgb(0, 0, 0) !important',
        background: 'rgba(0, 0, 0, 0.3) !important', /* Black see-through */
        color: '#f1f1f1 !important',
        transition: '.5s ease !important',
        opacity: '0 !important',
        color: 'white !important',
        fontSize: '20px !important',

        // borderBottomLeftRadius: '50px',  /* 100px of height + 10px of border */
        // borderBottomRightRadius: '50px', /* 100px of height + 10px of border */
        textAlign: 'center !important',
        "&:hover": {
            opacity: '1 !important'
        },
    },
    imgBox: {
        boxSizing: 'border-box',
        position: 'relative',
        "&:hover": {
            opacity: '1 !important'
        }
    },
    flex: {
        display: 'flex',
        flexDirection: 'column',
    },
    image: {
        border: `4px solid #FFFFFF`,
        boxShadow: ' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px !important',
        width: '150px !important',
        height: '150px !important',
    },
  
})

