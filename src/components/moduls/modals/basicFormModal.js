import PropTypes from "prop-types"
import React, { useCallback, useState } from 'react'
import ReactDOM from 'react-dom'
import { Modal, Fade, Box, Button, Typography, TextField, CircularProgress } from '@mui/material'
import { withStyles } from '@mui/styles'

const CustomButton = withStyles({
    root: {
        textTransform: 'none',
        fontSize: 14,
        fontWeight: 500,
        color: props => props.pcolor,
        '&:hover': {
            color: '#1976d2',
        }
    }
})(Button)

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
}

function BasicFormModal({ open, onClose, title, placeholder, autoFocus, onSubmit, submitButtonText }) {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const [disabled, setDisabled] = useState(!value)
    const [loading, setLoading] = useState(false)

    const getError = useCallback(error => {
        switch (error.code) {
            case 'auth/user-not-found':
                return 'Email not found'
            case 'auth/invalid-email':
                return 'Invalid email'
            default:
                return '';
        }
    }, [])

    async function onHandleSubmit(value) {
        try {
            setLoading(true)
            await onSubmit(value)
            setLoading(false)
            onClose()
        } catch (error) {
            setError(getError(error))
            setLoading(false)
            console.log(error)
        }
    }

    function onChange(e) {
        if (e.target.value.trim().length === 0) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
        setValue(e.target.value)
        setError('')
    }

    return (
        ReactDOM.createPortal(
            <Modal open={open} onClose={onClose}>
                <Fade in={open}>
                    <Box sx={style} className='w-96 px-5 pt-6 rounded-lg'>
                        <Typography
                            variant='h6'
                            fontWeight={500}
                            sx={{ mb: '12px' }}
                        >
                            {title}
                        </Typography>
                        <TextField
                            value={value}
                            variant='outlined'
                            margin='dense'
                            autoFocus={autoFocus}
                            onChange={onChange}
                            placeholder={placeholder}
                            fullWidth
                            error={!!error}
                            helperText={!!error ? error : ' '}
                            InputProps={{
                                sx: {
                                    borderRadius: '6px'
                                }
                            }}
                            inputProps={{
                                style: {
                                    padding: '10px 12px',
                                    fontSize: 16,
                                }
                            }} />
                        <Box className='flex justify-end items-center py-2'>
                            <CustomButton pcolor='#000' onClick={onClose}>Cancel</CustomButton>
                            {
                                loading ?
                                    <Box className='flex justify-center items-center' sx={{ width: '64px' }}>
                                        <CircularProgress size={25} />
                                    </Box>
                                    :
                                    <CustomButton disabled={disabled} onClick={() => onHandleSubmit(value)}>{submitButtonText}</CustomButton>
                            }
                        </Box>
                    </Box>
                </Fade>
            </Modal>
            , document.getElementById('modal-root'))
    )
}

BasicFormModal.propTypes = {
    open: PropTypes.bool,
    autoFocus: PropTypes.bool,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    submitButtonText: PropTypes.string,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
}

BasicFormModal.defaultProps = {
    open: false,
    autoFocus: false,
    title: '',
    placeholder: '',
    submitButtonText: 'Create',
    onClose: () => { },
    onSubmit: () => { },
}

export default BasicFormModal