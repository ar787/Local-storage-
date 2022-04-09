import React, { useState, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { Box, Stack, Typography, TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import UploadIcon from '@mui/icons-material/Upload';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '../../../firebase-config'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { BasicFormModal } from '../modals/index'
import AddButton from './add-button'

function Header({ style }) {
    const params = useParams()
    const inputRef = useRef()
    const options = useMemo(() => [
        {
            text: 'Create Folder',
            icon: <CreateNewFolderIcon />,
            onClick: () => setCreateFolderModal(true)
        },
        {
            text: 'Upload file',
            icon: <UploadIcon />,
            onClick: () => { inputRef.current.click() }
        },
    ], [])
    const [openCreateFolderModal, setCreateFolderModal] = useState(false)

    async function createFolder(name) {
        await addDoc(collection(db, 'main', auth.currentUser.uid, 'folders'), {
            parentId: params.id ?? 'root',
            name,
            createdAt: serverTimestamp(),
        })
    }

    async function addDocumentsIntoFirestore(name, type, downloadUrl, size) {
        await addDoc(collection(db, 'main', auth.currentUser.uid, 'documents'), {
            parentId: params.id ?? 'root',
            name,
            createdAt: serverTimestamp(),
            downloadUrl,
            type,
            size,
        })
    }
    function uploadImageAsPromise(file) {
        return new Promise((res, rej) => {
            const storage = getStorage()
            const storageRef = ref(storage, `users/${auth.currentUser.uid}/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file)
            console.log(file)
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    // setShowProgressAlert({ open: true, value: progress })
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    // console.log('res', res)
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        addDocumentsIntoFirestore(file.name, file.type, downloadURL, file.size).then(() => {
                            res(downloadURL)
                        }).catch((e) => rej(e))
                    });
                }
            )
        })

    }
    function handleUploadFile(e) {
        const files = e.target.files

        for (let i = 0; i < files.length; i++) {
            uploadImageAsPromise(files[i])
        }
    }
    return (
        <Box style={style}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h1' fontSize={38} fontWeight={500}>My Drive</Typography>
                <AddButton options={options} />
                <input
                    ref={inputRef}
                    type='file'
                    accept='.png, .jpg, .doc, .xml'
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleUploadFile}
                />
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