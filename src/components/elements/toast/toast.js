import React from "react";
import ReactDOM from "react-dom";
import { Alert, Snackbar } from '@mui/material';
// import PropTypes from 'prop-types';

function Toast(props) {
    return (
        ReactDOM.createPortal(
            <Snackbar
                open={props.open}
                onClose={props.onClose}
                autoHideDuration={7000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                message="Note archived"
            >
                <Alert onClose={props.onClose} severity={props.type} sx={{ width: '100%' }}>{props.message}</Alert>
            </Snackbar>
            , document.getElementById('portal-root'))
    )
}
export default Toast
// Toast.propTypes = {
//     open: PropTypes.bool,
//     onclose: PropTypes.func,
//     autoHideDuration: PropTypes.number,
//     anchorOrigin: PropTypes.object
// }