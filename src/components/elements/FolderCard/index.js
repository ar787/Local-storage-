import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, IconButton } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder';
import cx from 'classnames'
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Options from 'components/elements/options'

function FolderCard({ text, onClick, itemsLength, className, style, options }) {
    return (
        <Box className='relative'>
            <Options
                options={options}
                renderButton={onClick => (
                    <IconButton
                        onClick={onClick}
                        sx={{ position: 'absolute', top: '0px', right: '16px' }}
                    // style={{ alignSelf: 'start' }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                )}
            />
            <Box id='doc' className={cx('flex flex-col justify-center items-center', className)} style={style} onClick={onClick}>
                <Box className='flex flex-col justify-center items-center'>
                    <FolderIcon sx={{ fontSize: '100px' }} />
                    <Typography variant='body' fontWeight={500} color={'rgba(0, 0, 0, 0.85)'} textAlign='center'>
                        {text}
                    </Typography>
                    <Typography variant='body' fontWeight={500} color={'rgba(0, 0, 0, 0.45)'} textAlign='center'>
                        {itemsLength} items
                    </Typography>

                </Box>
            </Box>
        </Box>
    )
}

FolderCard.defaultProps = {
    options: []
}

FolderCard.propType = {
    text: PropTypes.string,
    className: PropTypes.string,
    itemsLength: PropTypes.number,
    style: PropTypes.object,
    onClick: PropTypes.func
}

export default FolderCard