import store from '../../stores/stores'

export const actions = {
  pushSnackbar: (alert_type = 'info', message = '') => ({
    type: 'INSERT_SNACKBAR_QUEUES',
    alert_type: alert_type,
    message: message,
  }),
  clearSnackbar: () => ({
    type: 'CLEAR_SNACKBAR_QUEUES',
  }),
}

export const pushSnackbarAction = (alert_type = 'info', message = '') =>
  store.dispatch({
    type: 'INSERT_SNACKBAR_QUEUES',
    alert_type: alert_type,
    message: message,
  })
