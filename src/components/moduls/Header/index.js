import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Stack, Typography, TextField, InputAdornment, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined'

function Header({ style }) {
    return (
        <Box style={style}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h1' fontSize={38} fontWeight={500}>My Drive</Typography>
                <Button
                    variant='contained'
                    size='large'
                    startIcon={<AddIcon />}
                    sx={{
                        textTransform: 'none',
                        boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.043)',
                    }}>
                    Create Drive
                </Button>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ marginTop: '24px' }}>
                <TextField
                    sx={{ width: '90%', borderRadius: '4px' }}
                    placeholder='Search File, Folder, Drive name'
                    color='info'
                    InputProps={{
                        sx: { borderRadius: '8px' },
                        endAdornment: (
                            <InputAdornment position='end'>
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Box className='flex flex-nowrap'>
                    <IconButton>
                        <FilterAltOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AppsOutlinedIcon />
                    </IconButton>
                </Box>
            </Stack>
        </Box >
    )
}

Header.propTypes = {
    style: PropTypes.object,
}

export default Header