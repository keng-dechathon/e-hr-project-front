import React, { useEffect, useState } from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import Card from '@mui/material/Card';
import styles from './styles';
import { styled } from '@mui/material/styles';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';


const useStyles = makeStyles(styles)

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultiSelect = ({
  className,
  option, //{text,id}
  selectState,
  setSelectState,
  ...props
}) => {
  console.log(selectState);
  const theme = useTheme();
  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setSelectState(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const classes = useStyles()
  return (

    <Select
      labelId="demo-multiple-chip-label"
      id="demo-multiple-chip"
      multiple
      displayEmpty
      value={selectState}
      className={className}
      style={{ minWidth: '250px' }}
      onChange={handleChangeSelect}
      input={<OutlinedInput id="select-multiple-chip" />}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {
            selected.length === 0 ? <em style={{color:'#808080'}}>Search Meeting </em> : ''
          }
          {selected.map((value) => (
            <Chip key={value} label={(option.filter(item => item.id === value))[0].text} />
          ))}
        </Box>
      )}
      MenuProps={MenuProps}
      {
      ...props
      }
    >
      {option.map((item) => (
        <MenuItem
          key={item.id}
          value={item.id}
          style={getStyles(item.text, selectState, theme)}
        >
          {item.text}
        </MenuItem>
      ))}
    </Select>
  )
}

export default MultiSelect


