import React from 'react'
import SnackbarAlert from '../../common/SnackbarAlert'
import { useDispatch, useSelector } from 'react-redux'
import { actions as snackbarAction } from '../actions'

const Snackbar = () => {
  const dispatch = useDispatch()
  const { clearSnackbar } = snackbarAction
  const { snackbarQueue } = useSelector((state) => state.layoutReducer)

  const handleCloseSnackbar = async () => {
    await dispatch(clearSnackbar())
  }

  return (
    <SnackbarAlert
      onClose={handleCloseSnackbar}
      open={snackbarQueue ? snackbarQueue.open : false}
      snackbarObject={snackbarQueue ? snackbarQueue : {}}
      severity={snackbarQueue ? snackbarQueue.type : null}
      autoHideDuration={snackbarQueue ? snackbarQueue.duration : 0}
    />
  )
}

export default Snackbar
