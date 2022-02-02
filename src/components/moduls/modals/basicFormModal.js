import PropTypes from "prop-types"
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Modal, Fade, Box, Button, Typography, TextField } from '@mui/material'
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

function BasicFormModal({ open, onClose, title, autoFocus, onSubmit }) {
    const [value, setValue] = useState('')
    async function onHandleSubmit(value) {
        try {
            await onSubmit(value)
            onClose()
        } catch (error) {
            console.log('BasicFormModal', error)
        }
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
                            variant='outlined'
                            margin='dense'
                            autoFocus={autoFocus}
                            onChange={e => setValue(e.target.value)}
                            fullWidth
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
                            <CustomButton onClick={() => onHandleSubmit(value)}>Create</CustomButton>
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
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
}

BasicFormModal.defaultProps = {
    open: false,
    autoFocus: false,
    title: '',
    onClose: () => { },
    onSubmit: () => { },
}

export default BasicFormModal