import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Stack, Typography, TextField, InputAdornment, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined'
import { BasicFormModal } from '../modals/index'
import { addDoc, collection, doc } from 'firebase/firestore'
import { db, auth } from '../../../firebase-config/firebase-config'
import { useLocation } from 'react-router-dom'

function Header({ style }) {
    const [openCreateFolderModal, setCreateFolderModal] = useState(false)
    const location = useLocation()
    async function createFolder(value) {
        await addDoc(collection(db, 'main', auth.currentUser.uid, 'folders'), {
            parentId: new URLSearchParams(location.search).get('id') ?? '/',
            name: value,
        })
    }
    return (
        <Box style={style}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h1' fontSize={38} fontWeight={500}>My Drive</Typography>
                <Button
                    variant='contained'
                    size='large'
                    onClick={() => setCreateFolderModal(true)}
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
            <BasicFormModal
                open={openCreateFolderModal}
                onClose={() => setCreateFolderModal(false)}
                title='New folder'
                autoFocus
                onSubmit={createFolder}
            />
        </Box >
    )
}

Header.propTypes = {
    style: PropTypes.object,
}

export default Header