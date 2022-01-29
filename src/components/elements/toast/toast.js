import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Alert, Snackbar } from '@mui/material'

function Toast({ open, message, onClose, type }) {
    return (
        ReactDOM.createPortal(
            <Snackbar
                open={open}
                onClose={onClose}
                autoHideDuration={7000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                message="Note archived"
            >
                <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>{message}</Alert>
            </Snackbar>
            , document.getElementById('modal-root'))
    )
}

Toast.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    message: PropTypes.string,
    type: PropTypes.string,
}

Toast.defaultProps = {
    open: false,
    onClose: () => { },
    message: '',
    type: '',
}

export default Toast