export default () => ({
    margintop: {
        marginTop: '40px',
    },
    tabitem: {
        marginRight: '30px !important',
        padding: '0 !important',      
        minWidth: '150px !important',
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
    }
})

