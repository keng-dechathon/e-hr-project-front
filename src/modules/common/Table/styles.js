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
    }
})

