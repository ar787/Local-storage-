import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { db, auth } from '../../../firebase-config/firebase-config'
import { collection, getDocs, where, query, onSnapshot, orderBy } from 'firebase/firestore'
import { Box, CircularProgress } from '@mui/material'

import FolderCard from '../../elements/FolderCard/folderCard'
import Header from '../Header'

function Content() {
    const history = useHistory()
    const location = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    async function getFolderItemsCount(parentId) {
        const q = query(
            collection(db, `main/${auth.currentUser.uid}/folders`),
            orderBy('createdAt', 'asc'),
            where('parentId', '==', String(parentId))
        )
        const querySnapshotCount = (await getDocs(q)).size

        return querySnapshotCount
    }

    function onFolderClick(id) {
        history.push({
            pathname: location.pathname,
            search: `id=${id}`,
        })
    }

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search)
        const parentId = urlSearchParams.get('id') ?? '/'
        setLoading(true)
        const q = query(collection(db, `main/${auth.currentUser.uid}/folders`), orderBy('createdAt', 'asc'), where('parentId', '==', String(parentId)))

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const promises = querySnapshot.docs.map(async doc => {
                const itemsCount = await getFolderItemsCount(doc.id)
                return { id: doc.id, itemsCount, ...doc.data() }
            })
            Promise.all(promises).then(res => {
                setData(res)
                setLoading(false)
            })
        })

        return unsubscribe

    }, [location.search])

    return (
        <Box sx={{ paddingLeft: '36px', paddingRight: '34px', width: 'calc(100vw - 400px - 236px)' }}>
            <Header style={{ paddingTop: 33 }} />
            <Box className='mt-8'>
                {
                    loading && (
                        <Box className='flex justify-center items-center' sx={{ height: 'calc(100vh - 157.35px - 18px - 33px)' }}>
                            <CircularProgress />
                        </Box>
                    )
                }
                {
                    loading === false && (
                        <Box className='flex flex-wrap'>
                            {
                                data.map(item => {
                                    return <FolderCard
                                        key={item.id}
                                        className='m-4 bg-white pt-6 px-11 pb-3 rounded-lg cursor-pointer hover:bg-gray-50 transition'
                                        style={{ boxShadow: '0px 2px 12px rgba(98, 111, 159, 0.12)' }}
                                        text={item.name}
                                        itemsLength={item.itemsCount}
                                        onClick={() => onFolderClick(item.id)}
                                    />
                                })
                            }
                        </Box>
                    )
                }
            </Box>
        </Box>
    )
}


export default Content