import React from 'react'
import TextField from '@material-ui/core/TextField'
import { useField } from 'react-final-form-hooks'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'


const useStyles = makeStyles(styles)

const TextFieldOutlined = ({
  id,
  name,
  fullWidth,
  placeholder,
  defaultValue,
  className,
  multiline,
  label,
  validate,
  endAdornment,
  form,
  disabled,
  InputProps={},
  helperText,
  rows,
  error,
  ...rest
}) => {
  const classes = useStyles()
  const formField = useField(name, form, validate)
  return (
    <TextField
      id={id}
      name={name}
      disabled={disabled}
      fullWidth={fullWidth}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={className}
      multiline={multiline}
      rows={rows}
      variant="outlined"
      label={label}
      InputProps={{
        classes: {
          root: classes.field, 
          multiline:  classes.multiline
        },
        endAdornment: endAdornment,
        ...InputProps
      }}
      InputLabelProps={{
        classes:{
          outlined:  classes.outlined,
          // root: classes.input
        }
      }}
      {...formField.input}
      {...rest}
      error={((form && formField.meta.touched && formField.meta.error) || error) ? true : false}
      helperText={helperText ? 
        helperText
        : 
        (form && formField.meta.touched && formField.meta.error ? formField.meta.error : null)
      }
    />
  )
}

export default TextFieldOutlined
