export default (theme) => ({
    root: {
        width: '100%',
        // minHeight: 'calc(100vh - 72px)',
       
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
    },
    form: {
        width: '330px',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    massage: {
        flexDirection: 'column',
        marginBottom: '50px',
        textAlign: 'center',
    },
    forgot: {
        marginTop: '16px',
        color: theme.palette.info.dark
    },
    textfield: {
        '& input': {
            minHeight: '20px',

        }
        , width: '100%'
    },
    request: {
        marginTop: '8px',
        color: theme.palette.info.dark
    },
    head: {
        color: '#C6168D',
        marginBottom: '40px'
    },
    ButtonSubmit: {
        background: '#ffffff',
        color: '#000000',
    }
})

