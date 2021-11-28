import React from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

const useStyles = makeStyles(styles)

const ButtonCustom = ({
  children,
  loading,
  fullWidth,
  className,
  variant,
  ...rest
}) => {

  const classes = useStyles()

  return (
    <Button
      classes={{
        root: clsx({
          [classes.contained]: variant === 'contained',
        }, classes.button)
      }}
      variant={variant}
      fullWidth={fullWidth}
      className={className}
      // disableRipple
      // disableFocusRipple
      // disableElevation
      {...rest}
    >
      {loading ? <CircularProgress color={'#FFF'} size={20} style={{ marginRight: '20px' }} /> : ''}

      {children}

      {/* {console.log(loading)} */}
    </Button>
  )
}

export default ButtonCustom
