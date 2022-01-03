import React, { useState, useRef } from 'react'
import { Box, Stack, Avatar, Typography, SvgIcon, Button, IconButton } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import FolderIcon from '@mui/icons-material/Folder'
import { ReactComponent as ImageIcon } from '../../../icons/image.svg'
import { ReactComponent as DocumentIcon } from '../../../icons/document.svg'
import { ReactComponent as OtherIcon } from '../../../icons/other.svg'
import { getAuth } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import Toast from '../../elements/toast/toast'

function Profile() {
    const auth = getAuth().currentUser
    const fileOpenRef = useRef()
    const [showProgressAlert, setShowProgressAlert] = useState({ open: false, value: '' })

    function stringToColor(string) {
        let i, hash = 0;
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }
        return color;
    }
    function handleUploadPhoto(e) {
        const storage = getStorage()
        const storageRef = ref(storage, 'profile-images/image')
        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0])
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setShowProgressAlert({ open: true, value: progress })
            },
            (error) => {
                console.log(error)
            },
            (res) => {
                console.log('res', res)
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
            }
        )
    }
    return (
        <Box className='h-screen  pr-4' style={{ width: 354, paddingTop: 33, paddingLeft: 17, border: '1px solid #F0F0F0' }}>
            <Stack direction='row' justifyContent='start' alignItems='center'>
                <Avatar sx={{ width: 64, height: 64, bgcolor: stringToColor(auth.displayName) }}>
                    {auth.displayName.split(' ')[0][0] + auth.displayName.split(' ')[1][0]}
                </Avatar>
                <Box className='ml-3'>
                    <Typography variant='h5' fontWeight={500}>Hi, {auth.displayName.split(' ')[0]} </Typography>
                    <Typography
                        variant='caption'
                        color='rgba(0, 0, 0, 0.45)'
                        className='cursor-pointer'
                        onClick={() => {
                            fileOpenRef.current.click()
                        }}
                    >
                        Profile Setting
                    </Typography>
                    {/* <input
                        ref={fileOpenRef}
                        type='file'
                        accept='image/*'
                        onChange={handleUploadPhoto}
                    /> */}
                </Box>
            </Stack >
            <Box sx={{ marginTop: '25px', marginBottom: '41px' }}>
                <Typography
                    variant='caption'
                    color='#595959'
                    fontWeight={600}
                    fontSize={14}
                >
                    Type file
                </Typography>
                <Stack className='mt-5' direction='row' justifyContent='space-between' alignItems='flex-start'>
                    <Box className='flex'>
                        <SvgIcon fontSize='large'>
                            <ImageIcon />
                        </SvgIcon>
                        <Typography variant='body1' color='rgba(0, 0, 0, 0.45)'>Photo & Video</Typography>
                    </Box>
                    <Button sx={{ textTransform: 'none', color: 'rgba(0, 0, 0, 0.45)', padding: '2px' }}>See all</Button>
                </Stack>
                <Stack className='mt-5' direction='row' justifyContent='space-between' alignItems='flex-start'>
                    <Box className='flex'>
                        <SvgIcon fontSize='large'>
                            <DocumentIcon />
                        </SvgIcon>
                        <Typography variant='body1' color='rgba(0, 0, 0, 0.45)'>Photo & Video</Typography>
                    </Box>
                    <Button sx={{ textTransform: 'none', color: 'rgba(0, 0, 0, 0.45)', padding: '2px' }}>See all</Button>
                </Stack>
                <Stack className='mt-5' direction='row' justifyContent='space-between' alignItems='flex-start'>
                    <Box className='flex'>
                        <SvgIcon fontSize='large'>
                            <OtherIcon />
                        </SvgIcon>
                        <Typography variant='body1' color='rgba(0, 0, 0, 0.45)'>Photo & Video</Typography>
                    </Box>
                    <Button sx={{ textTransform: 'none', color: 'rgba(0, 0, 0, 0.45)', padding: '2px' }}>See all</Button>
                </Stack>
            </Box>
            <Box>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography
                        variant='caption'
                        color='#595959'
                        fontWeight={600}
                        fontSize={14}
                    >
                        Pinned Drive
                    </Typography>
                    <IconButton>
                        <ErrorOutlineIcon />
                    </IconButton>
                </Stack>
                <Box className='mt-3'>
                    {['#40A9FF', '#FADB14', '#52C41A'].map(color =>
                        <Box key={color} className='p-3 mb-3' style={{ border: '1px solid #F5F5F5', borderRadius: 4 }}>
                            <Stack direction='row' alignItems='center'>
                                <FolderIcon sx={{ fontSize: '50px', color, }} />
                                <Box className='ml-6 w-full'>
                                    <Typography variant='body1' className='pb-2'>Office Work</Typography>
                                    <Stack direction='row' justifyContent='space-between'>
                                        <Typography variant='caption'
                                            style={{
                                                color: 'rgba(0, 0, 0, 0.45)',
                                                fontWeight: 'bold',
                                                fontSize: 16,
                                            }}
                                        >443 items</Typography>
                                        <Typography variant='caption' style={{
                                            marginRight: 59,
                                            color: 'rgba(0, 0, 0, 0.25)',
                                            fontWeight: 700,
                                            fontSize: 16,
                                        }}>140 MB</Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>
                    )}
                </Box>
                <Box style={{ border: '1px solid #F5F5F5', borderRadius: 4 }}>
                    <Typography
                        variant='body1'
                        textAlign='center'
                        className='py-8'
                        fontSize={16}
                        color='rgba(0, 0, 0, 0.45)'
                    >
                        Drag and Drop Drive to pin
                    </Typography>
                </Box>
            </Box>
            <Toast
                open={showProgressAlert.open}
                onClose={() => setShowProgressAlert({ open: false, value: '' })}
                message={showProgressAlert.value}
                type='info'
            />
        </Box >
    )
}

export default Profile