import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { db, auth } from '../../../firebase-config/firebase-config'
import { collection, getDocs, where, query, onSnapshot, orderBy } from 'firebase/firestore'
import { Box, CircularProgress, Grid } from '@mui/material'

import FolderCard from '../../elements/FolderCard/folderCard'
import Header from '../Header'

function Content() {
    const history = useHistory()
    const params = useParams()
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
        history.push(`/dashboard/${id}`)
    }

    useEffect(() => {
        const q = query(
            collection(db, `main/${auth.currentUser.uid}/folders`),
            orderBy('createdAt', 'asc'),
            where('parentId', '==', String(params.id))
        )

        setLoading(true)

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

    }, [params.id])

    return (
        <Box sx={{ paddingLeft: '36px', paddingRight: '34px', maxWidth: 'calc(100vw - 236px)', flexGrow: '1' }}>
            <Header style={{ paddingTop: 33 }} />
            <Grid container direction='row' className='mt-8 overflow-scroll'>
                {
                    loading && (
                        <Box className='flex w-full justify-center items-center' sx={{ height: 'calc(100vh - 157.35px - 18px - 33px)' }}>
                            <CircularProgress />
                        </Box>
                    )
                }
                {
                    !loading && (

                        data.map(item => {
                            return <Grid key={item.id} item xs={12} md={4} lg={3}>
                                <FolderCard
                                    className='m-4 bg-white pt-6 px-11 pb-3 rounded-lg cursor-pointer hover:bg-gray-50 transition'
                                    style={{ boxShadow: '0px 2px 12px rgba(98, 111, 159, 0.12)' }}
                                    text={item.name}
                                    itemsLength={item.itemsCount}
                                    onClick={() => onFolderClick(item.id)}
                                />
                            </Grid>
                        })
                    )
                }
            </Grid>
        </Box >
    )
}


export default Content