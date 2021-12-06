import { borderRadius } from "@mui/system";

export default () => ({
    card: {
        maxWidth: '800px !important',
        fontFamily :'Roboto, Helvetica, Arial, sans-serif',
        // backgroundColor: '#F1F3FF !important',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px !important',
        borderRadius:'12px !important',
        marginBottom:'35px',
    },
    cardheader: {
        padding: '14px !important',
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
        marginTop:'10px',
    },
    maintext: {
        width: '200px',
        marginRight: '20px',
    },
    subtext: {
        width: '100%',
    },
    center:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',

    },
    margintop:{
        marginTop:'10px'
    }

})

