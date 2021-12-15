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
  pink: {
    color: '#C91F92',
  },
  danger: {
    color: '#ED2F2F',
  },
  primary: {
    color: '#2F80ED',
  },
  mute: {
    color: '#333132',
    opacity: '0.5',
  },
  info: {
    color: '#2F80ED',
  },
  success: {
    color: '#77AF4C',
  },
  warning: {
    color: '#FF9800',
  },
  main: {
    color: '#1976d2',
  },
  white: {
    color: '#FFFFFF',
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
    fontWeight: 500,
  },
  bold: {
    fontWeight: 600,
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
        [classes.white]: color === 'white',
        [classes.pink]: color === 'pink',
        [classes.main]: color === 'main'
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
    'white',
    'pink',
    'main',
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
