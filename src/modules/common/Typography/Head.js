import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles"
import clsx from 'clsx'
import PropTypes from 'prop-types'


const useStyles = makeStyles((theme) => ({
  default: {
    color: '#000',
    letterSpacing: '0.2px',
    fontWeight: 200,
  },
  danger: {
    color: theme.palette.error.main,
  },
  primary: {
    color: theme.palette.primary.main,
  },
  mute: {
    color: theme.palette.gray.dark,
  },
  info: {
    color: theme.palette.primary.main,
  },
  success: {
    color: theme.palette.success.main,
  },
  warning: {
    color: theme.palette.warning.main,
  },
  white: {
    color: theme.palette.common.white,
  },
  thin: {
    fontWeight: 100,
  },
  light: {
    fontWeight: 200,
  },
  regular: {
    fontWeight: 300,
  },
  medium: {
    fontWeight: 400,
  },
  bold: {
    fontWeight: 500,
  },
  extraBold: {
    fontWeight: 900,
  },
  right: {
    textAlign: 'right',
  },
  left: {
    textAlign: 'left',
  }
  
}))

const TypographyCustom = ({
  variant,
  children,
  color,
  fontWeight,
  className,
  textAlign,
  ...props
}) => {

  const classes = useStyles()

  return (
    <Typography 
      className={clsx(classes.default, {
          // Color
          [classes.danger]: color === 'danger',
          [classes.primary]: color === 'primary',
          [classes.mute]: color === 'mute',
          [classes.info]: color === 'info',
          [classes.success]: color === 'success',
          [classes.warning]: color === 'warning',
          [classes.white]: color === 'white'
        }, {
          // FontWeight
          [classes.thin]: fontWeight === 'thin',
          [classes.light]: fontWeight === 'light',
          [classes.regular]: fontWeight === 'regular',
          [classes.medium]: fontWeight === 'medium',
          [classes.bold]: fontWeight === 'bold',
          [classes.extraBold]: fontWeight === 'extraBold',
        }, {
          // Alignment
          [classes.right]: textAlign === 'right',
          [classes.left]: textAlign === 'left',
        }, className)} 
      variant={variant}
      {...props}
    >
      {children}
    </Typography>
  )
}

export default TypographyCustom


TypographyCustom.propTypes = {
  variant: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "subtitle1",
    "subtitle2",
    "body1",
    "body2",
  ]),
  children: PropTypes.node,
  color: PropTypes.oneOf([
    'danger',
    'primary',
    'mute',
    'info',
    'success',
    'warning',
    'white'
  ]),
  fontWeight: PropTypes.oneOf([
    'thin',
    'light',
    'regular',
    'medium',
    'bold',
    'extraBold',
  ]),
  textAlign: PropTypes.oneOf([
    'right',
    'left'
  ]),
  className: PropTypes.string
}
