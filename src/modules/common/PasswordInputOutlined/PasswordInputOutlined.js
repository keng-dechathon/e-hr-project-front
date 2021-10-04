import React, { useState } from 'react'
import TextFieldOutlined from '../TextFieldOutlined'
// import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const PasswordInputOutlined = ({
  id,
  fullWidth,
  placeholder,
  label,
  name,
  className,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <TextFieldOutlined
      id={id}
      name={name}
      fullWidth={fullWidth}
      placeholder={placeholder}
      label={label}
      className={className}
      type={showPassword ? "text" : "password"}
      endAdornment= {(
        <InputAdornment
          variant="filled"
          position="end"
        >
          <IconButton
            aria-label="Toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
            style={{padding:'0'}}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>)
      }
      {...rest}
    />
  )
}

export default PasswordInputOutlined
