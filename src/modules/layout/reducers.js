const initialState = {
    snackbarQueue: {},
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'INSERT_SNACKBAR_QUEUES':
        return {
          ...state,
          snackbarQueue: {
            open: true,
            message: action.message,
            type: action.alert_type,
            duration: 3000,
          },
        }
      case 'CLEAR_SNACKBAR_QUEUES':
        return {
          ...state,
          snackbarQueue: {
            ...state.snackbarQueue,
            open: false,
          },
        }
      default:
        return state
    }
  }
  