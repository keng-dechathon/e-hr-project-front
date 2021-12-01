import React, { useEffect } from 'react'
import Snackbar from './Snackbar'
import MainHead from './MainHead'
import { makeStyles } from '@material-ui/core/styles'
import { actions as snackbarAction } from '../actions'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 0px)',
    maxHeight: 'calc(100vh - 0px)',
    width: '100%',
    overflow: 'auto',
  },
}))

const AuthLayout = ({ title, children }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { clearSnackbar } = snackbarAction

  useEffect(() => {
    return () => {
      dispatch(clearSnackbar())
    }
  }, [])

  return (
    <div>
      <MainHead title={title} />
      <main className={classes.content}>
        {children}
        <Snackbar />
      </main>
    </div>
  )
}

export default AuthLayout
