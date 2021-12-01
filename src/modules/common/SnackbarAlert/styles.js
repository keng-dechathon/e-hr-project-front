export default (theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
    alert: {
        backgroundColor: '#fff',
        minWidth: '350px !important',
        maxWidth: '350px !important',
        borderLeft: '5px solid',
        color: '#ACACAC',
    },
    icon: {
        alignItems: 'center'
    },
    textTitle: {
        fontSize: '18px'
    },
   

})
