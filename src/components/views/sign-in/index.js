import React, { useState } from 'react';

import { Container, Stack, Grid, Typography, Button, Box, InputAdornment, IconButton, SvgIcon } from '@mui/material';
import TextField from '@mui/material/TextField';
import PNG from '../../../icons/Abstraction.png'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { ReactComponent as CustomGoogleIcon } from '../../../icons/google.svg';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase-config'
import Toast from '../../elements/toast/toast';

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
        case 'auth/user-not-found':
            return 'user not found'
        case 'auth/email-already-in-use':
            return 'email has already exsist'
        case 'auth/wrong-password':
            return 'The password is wrong'
        default:
            break;
    }
}
function SignIn() {
    const [userInfo, setUserInfo] = useState({
        email: {
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
    const [showErrorMessage, setShowErrorMessage] = useState({ open: false, message: '', type: 'success' })
    const matches = useMediaQuery('(max-width:908px)');
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
    async function signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider()
            const { user } = await signInWithPopup(auth, provider)
            // const credential = GoogleAuthProvider.credentialFromResult(googleAuthProviderCredential)
            // console.log(credential.providerId);
            // const uid = googleAuthProviderCredential.user.uid
            const hasDocumentExists = (await getDoc(doc(db, 'main', user.uid))).exists()

            if (hasDocumentExists === false) {
                await setDoc(doc(collection(db, 'main'), user.uid), {
                    uid: user.uid,
                })
                await setDoc(doc(collection(db, `main/${user.uid}/folders`)), {
                    parentId: '/',
                    name: 'untitled',
                })
            }
        } catch (err) {
            console.log(err.message)
            setShowErrorMessage({ open: true, message: 'Something went wrong', type: 'error' })
        }
    }

    async function signInWithFacebook() {
        try {
            const provider = new FacebookAuthProvider()
            const facebookAuthProviderCredential = await signInWithPopup(auth, provider)
            const credential = FacebookAuthProvider.credentialFromResult(facebookAuthProviderCredential)
            console.log('Facebook credential', credential)
        } catch (err) {
            console.log(err.message)
            setShowErrorMessage({ open: true, message: 'Something went wrong', type: 'error' })
        }
    }
    async function loginAccount() {
        try {
            await signInWithEmailAndPassword(auth, userInfo.email.value, userInfo.password.value)
        } catch (e) {
            console.log(e.message);
            const setStateByErrorCode = e.code === 'auth/wrong-password' ? 'password' : 'email'
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
    function handleBlur(e) {
        handleChange(e)
    }

    const disabled = !(
        userInfo.email.value.trim().length &&
        userInfo.password.value.trim().length
    )

    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <Grid
                container
                direction='row'
                justifyContent='flex-start'
                sx={{ backgroundColor: '#B1D9DB' }}
            >
                {!matches && <Grid item md={4} sx={{
                    paddingTop: '103px',
                    paddingLeft: '30px',
                    height: '100vh',
                    position: 'relative'
                }}>
                    <Box style={{ width: 309 }}>
                        <Typography color='white' variant='h5' textAlign='center'>
                            Find 3D Objects, Mockups and Ilustration here
                        </Typography>
                    </Box>
                    <img src={PNG} alt='sign up' className='absolute -right-1/3' />
                </Grid>
                }
                <Grid item sm={12} md={matches ? 12 : 8}
                    sx={{
                        height: '100vh',
                        flexGrow: 1,
                        paddingTop: '103px',
                        paddingLeft: '30px',
                        backgroundColor: '#fff',
                        borderTopLeftRadius: matches ? 'none' : '38px',
                        borderBottomLeftRadius: matches ? 'none' : '38px'
                    }}>

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
                            <Typography variant='h5' sx={{
                                marginBottom: '23px',
                                fontWeight: '600',
                            }}>
                                Log In
                            </Typography>

                        </Stack>
                        <Stack
                            direction='column'
                            justifyContent='center'
                            alignItems='center'
                            mt={3}
                        >
                            <Box sx={{ marginBottom: '35px' }}>
                                <Button
                                    variant='outlined'
                                    onClick={signInWithGoogle}
                                    sx={{
                                        width: 190,
                                        marginRight: '25px',
                                        justifyContent: 'flex-start',
                                        fontSize: '12px',
                                        textTransform: 'capitalize',
                                        color: '#000',
                                        paddingY: '10px',
                                        borderRadius: '9px',
                                        borderColor: '#EAEAEA',
                                    }}
                                    startIcon={
                                        <SvgIcon>
                                            <CustomGoogleIcon />
                                        </SvgIcon>}>
                                    Sign in with Google
                                </Button>
                                <Button
                                    variant='outlined'
                                    onClick={signInWithFacebook}
                                    sx={{
                                        width: 190,
                                        justifyContent: 'flex-start',
                                        fontSize: '12px',
                                        textTransform: 'capitalize',
                                        color: '#000',
                                        paddingY: '10px',
                                        borderRadius: '9px',
                                        borderColor: '#EAEAEA',
                                    }}
                                    startIcon={
                                        <FacebookRoundedIcon color='primary' />
                                    }
                                >
                                    Sign in with Facebook
                                </Button>
                            </Box>
                            <Box>
                                <Typography color='gray'>- OR -</Typography>
                            </Box>
                        </Stack>
                        <Stack
                            spacing={6}
                            justifyContent='left'
                            alignItems='center'
                        >
                            <TextField
                                name='email'
                                variant='standard'
                                placeholder='Email Address'
                                sx={{ width: '404px' }}
                                value={userInfo.email.value}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={userInfo.email.hasError}
                                helperText={userInfo.email.errorMessage}
                            />
                            <TextField
                                name='password'
                                type={userInfo.showPassword ? 'text' : 'password'}
                                variant='standard'
                                placeholder='Password'
                                sx={{ width: '404px' }}
                                value={userInfo.password.value}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={userInfo.password.hasError}
                                helperText={userInfo.password.errorMessage}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                tabIndex={-1}
                                            >
                                                {userInfo.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                }} />
                            <Box className='w-full'>
                                <CreateAccountButton
                                    fullWidth
                                    variant='contained'
                                    disabled={disabled}
                                    onClick={loginAccount}
                                >
                                    LogIn
                                </CreateAccountButton>
                                <Link to='/registration'>Registeration</Link>
                                <Typography textAlign='left'> Forgot password? </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid >
            <Toast
                open={showErrorMessage.open}
                onClose={() => setShowErrorMessage({ open: false, message: '', type: '' })}
                message={showErrorMessage.message}
                type={showErrorMessage.type}
            />
        </Container >
    )
}

export default SignIn