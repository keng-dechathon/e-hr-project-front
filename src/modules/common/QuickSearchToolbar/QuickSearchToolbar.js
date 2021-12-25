import React, { useState, useEffect } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export function QuickSearchToolbar(props) {
    return (
        <Box
            sx={{
                pb: 0,
                justifyContent: 'space-between',
                display: 'flex',
                alignItems: 'flex-start !important',
                flexWrap: 'wrap',
                width: '100%',

            }}
        >
            <TextField
                variant='outlined'
                label="Search News"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small" />,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{ visibility: props.value ? 'visible' : 'hidden' }}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    ),
                }}
                sx={{

                    width: {
                        xs: 1,
                        sm: '500px',
                    },

                    m: (theme) => theme.spacing(1, 0.5, 1.5),
                    '& .MuiSvgIcon-root': {
                        mr: 0.7,
                    },
                    '& .css-152mnda-MuiInputBase-input-MuiOutlinedInput-input': {
                        padding: '12px'
                    }

                }}
            />
        </Box>
    );
}

QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};