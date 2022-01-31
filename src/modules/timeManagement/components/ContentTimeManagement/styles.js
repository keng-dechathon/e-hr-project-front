export default () => ({
    margintop: {
        marginTop: '40px',
    },
    padding:{
        padding:'24px'
    },
    box: {
        padding: '40px '
    },
    tabitem: {
        marginRight: '30px !important',
        padding: '0 !important',
        minWidth: '80px !important',
        textTransform: 'none !important',
        fontWeight: 'bold !important',
        fontSize: '18px !important',
        '&:hover': {
            color: '#C91F92 !important',
            opacity: 1,
        },
        '&.Mui-selected': {
            color: '#C91F92 !important',
        },

    },
    tablist: {
        '& .MuiTabs-indicator': {
            backgroundColor: '#C91F92 !important',

        },

    },
    tabpanel: {
        padding: ' 16px 0 0 0 !important',
    }
})
