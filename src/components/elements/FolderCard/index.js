import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder';
import cx from 'classnames'

function FolderCard({ text, onClick, itemsLength, className, style }) {
    return (
        <Box id='doc' className={cx('flex flex-col justify-center items-center', className)} style={style} onClick={onClick}>
            <FolderIcon sx={{ fontSize: '100px' }} />
            <Typography variant='body' fontWeight={500} color={'rgba(0, 0, 0, 0.85)'} textAlign='center'>
                {text}
            </Typography>
            <Typography variant='body' fontWeight={500} color={'rgba(0, 0, 0, 0.45)'} textAlign='center'>
                {itemsLength} items
            </Typography>
        </Box>
    )
}
FolderCard.propType = {
    text: PropTypes.string,
    className: PropTypes.string,
    itemsLength: PropTypes.number,
    style: PropTypes.object,
    onClick: PropTypes.func
}

export default FolderCard