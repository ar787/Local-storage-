import React from 'react'
import PropTypes from 'prop-types'
import { Box, IconButton, Typography } from '@mui/material'
import cx from 'classnames'
import byteSize from 'byte-size'
// import { getStorage, ref, getDownloadURL } from 'firebase/storage'

import { getImageNameByContentType } from 'utils'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Options from 'components/elements/options'

const DocumentCard = React.forwardRef(({ text, onClick, className, style, type, size, name, options }, ref) => (
    <Box ref={ref} className={cx('flex flex-col justify-start items-start min-w-0', className)} style={style} onClick={onClick}>
        <Box className='flex items-center justify-between w-full mb-3'>
            <Box className='flex-grow'>
                <img src={require(`icons/document-icons/${getImageNameByContentType(type)}.png`).default} alt='document' />
            </Box>
            <Options
                options={options}
                renderButton={onClick => (
                    <IconButton
                        onClick={onClick}
                        style={{ alignSelf: 'start' }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                )}
            />
        </Box>
        <Typography sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: '100%'
        }}
            fontWeight={500}
            color={'rgba(0, 0, 0, 0.45)'}
        >
            {text}
        </Typography>
        <Typography sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: '100%',
            fontWeight: '700',
        }}
            fontWeight={500}
            color={'rgba(0, 0, 0, 0.45)'}
        >
            {byteSize(size).toString()}
        </Typography>
    </Box>
))

DocumentCard.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    itemsLength: PropTypes.number,
    style: PropTypes.object,
    onClick: PropTypes.func
}

export default DocumentCard