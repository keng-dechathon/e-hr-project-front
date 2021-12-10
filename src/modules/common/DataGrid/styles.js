export default (theme) => ({
    borderRadiusLeft: {
        borderRadius: '10px 0 0 0'
    },
    borderRadiusRight: {
        borderRadius: '0 10px 0 0'
    },
    cell: {
        borderBottom: 'unset',
    },
    footerTable: {
        '& td': {
            background: '#FFFFFF',
            // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '0px 0px 10px 10px',
            borderBottom: 'unset',
        }
    },
    paginationCircle: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '15px',
        alignItems: 'center'
    },
    skeleton: {
        width: '100%',
    },
    card: {              
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px !important',
        borderRadius: '12px !important',
        marginBottom: '35px',
        minWidth:'850px',     
        // rgba(0, 0, 0, 0.25)
    },
 
})

