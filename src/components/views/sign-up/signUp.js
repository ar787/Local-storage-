import React, { useState } from 'react';
import { Container, Stack, Grid, Typography, Button, Box, InputAdornment, IconButton } from '@mui/material';
// import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TextField from '@mui/material/TextField';
// import { ReactComponent as CustomGoogleIcon } from '../../icons/google.svg';
import PNG from '../../../icons/Abstraction.png'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../../firebase-config/firebase-config'

const CreateAccountButton = styled(Button)({
    textTransform: 'capitalize',
    borderRadius: 9,
    marginBottom: 17,
    backgroundColor: '#7CD2D7',
    '&:hover': {
        backgroundColor: '#7CD2D7',
    },
});
function getErrorMessage(error) {
    switch (error) {
        case 'auth/invalid-email':
            return 'email address is not valid'
        case 'auth/email-already-in-use':
            return 'email has already exsist'
        case 'auth/weak-password':
            return 'The password is too weak'
        default:
            break;
    }
}
function SignUp() {
    const [userInfo, setUserInfo] = useState({
        userName: {
            value: '',
            errorMessage: '',
            hasError: false,
        }, email: {
            value: '',
            errorMessage: '',
            hasError: false,
        }, password: {
            value: '',
            errorMessage: '',
            hasError: false,
        },
        showPassword: false,
    })
    const matches = useMediaQuery('(max-width:908px)')

    function handleClickShowPassword() {
        setUserInfo(prev => ({ ...prev, showPassword: !prev.showPassword }))
    }
    function handleChange(e) {
        const hasFieldIsEmpty = !!e.target.value.trim().length
        setUserInfo(prev => ({
            ...prev,
            [e.target.name]: {
                value: e.target.value,
                errorMessage: hasFieldIsEmpty ? '' : 'field is empty',
                hasError: !hasFieldIsEmpty,
            },
        }))
    }

    function handleBlur(e) {
        handleChange(e)
    }

    async function createAccount() {
        try {
            localStorage.setItem('username', userInfo.userName.value)
            const { user } = await createUserWithEmailAndPassword(auth, userInfo.email.value, userInfo.password.value)
            await updateProfile(user, {
                displayName: userInfo.userName.value,
            })

            await setDoc(doc(collection(db, 'main'), user.uid), {
                uid: user.uid,
            })
            await setDoc(doc(collection(db, `main/${user.uid}/folders`)), {
                parentId: '/',
                name: 'untitled',
            })


        } catch (e) {
            const setStateByErrorCode = e.code === 'auth/weak-password' ? 'password' : 'email'
            setUserInfo(prev => ({
                ...prev,
                [setStateByErrorCode]: {
                    ...prev.email,
                    errorMessage: getErrorMessage(e.code),
                    hasError: true
                }
            }))
        }
    }
    const disabled = !(
        userInfo.userName.value.trim().length &&
        userInfo.email.value.trim().length &&
        userInfo.password.value.trim().length
    )

    const endAdornment = (
        <InputAdornment position='end'>
            <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                tabIndex={-1}
            >
                {userInfo.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        </InputAdornment>
    )

    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <Grid container direction='row' justifyContent='flex-start' sx={{ backgroundColor: '#B1D9DB' }}>
                {!matches && <Grid item md={4} sx={{
                    paddingTop: '103px', paddingLeft: '30px', height: '100vh', position: 'relative'
                }}>
                    <Box style={{ width: 309 }}>
                        <Typography color='white' variant='h5' textAlign='center'> Find 3D Objects, Mockups and Ilustration here</Typography>
                    </Box>
                    <img src={PNG} alt='sign up' className='absolute -right-1/3' />
                </Grid>
                }
                <Grid
                    item
                    sm={12}
                    md={matches ? 12 : 8}
                    sx={{
                        height: '100vh',
                        flexGrow: 1,
                        paddingTop: '103px',
                        paddingLeft: '30px',
                        backgroundColor: '#fff',
                        borderTopLeftRadius: matches ? 'none' : '38px',
                        borderBottomLeftRadius: matches ? 'none' : '38px'
                    }}
                >

                    <Stack
                        spacing={2}
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Stack
                            justifyContent='flex-start'
                            alignItems='left'
                            sx={{ width: 404 }}
                        >
                            <Typography variant='h5' sx={{ marginBottom: '23px', fontWeight: '600' }}>Create Account</Typography>

                        </Stack>
                        <Stack
                            spacing={6}
                            justifyContent='left'
                            alignItems='center'
                        >
                            <TextField
                                name='userName'
                                variant='standard'
                                placeholder='Full Name'
                                value={userInfo.userName.value}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={userInfo.userName.hasError}
                                helperText={userInfo.userName.errorMessage}
                                sx={{ width: '404px' }}
                            />
                            <TextField
                                name='email'
                                variant='standard'
                                placeholder='Email Address'
                                value={userInfo.email.value}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={userInfo.email.hasError}
                                helperText={userInfo.email.errorMessage}
                                sx={{ width: '404px' }}
                            />
                            <TextField
                                type={userInfo.showPassword ? 'text' : 'password'}
                                name='password'
                                variant='standard'
                                placeholder='Password'
                                value={userInfo.password.value}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={userInfo.password.hasError}
                                helperText={userInfo.password.errorMessage}
                                sx={{ width: '404px' }}
                                InputProps={{
                                    endAdornment,
                                }}
                            />
                            <Box className='w-full'>
                                <CreateAccountButton
                                    fullWidth
                                    disabled={disabled}
                                    variant='contained'
                                    onClick={createAccount}
                                >
                                    Create Account
                                </CreateAccountButton>
                                <Link to='/login'>Already have an account? Log in</Link>
                            </Box>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid >
        </Container >
    )
}

export default SignUp