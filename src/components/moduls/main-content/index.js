import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { db, auth } from '../../../firebase-config/firebase-config'
import { collection, getDocs, where, query, onSnapshot, orderBy } from 'firebase/firestore'
import { Box, CircularProgress, Grid } from '@mui/material'
import cx from 'classnames'

import FolderCard from '../../elements/FolderCard/folderCard'
import Header from '../header'
import DocumentCard from '../../elements/DocumentCard'

function Content() {
    const history = useHistory()
    const params = useParams()
    const [folders, setFolders] = useState({ data: [], loading: null, error: null })
    const [documents, setDocuments] = useState({ data: [], loading: null, error: null })
    const isEmpty = !folders.data.length && !documents.data.length && folders.loading === false && documents.loading === false

    async function getFolderItemsCount(parentId) {
        const queryFolder = query(
            collection(db, `main/${auth.currentUser.uid}/folders`),
            orderBy('createdAt', 'asc'),
            where('parentId', '==', String(parentId))
        )
        const queryDocument = query(
            collection(db, `main/${auth.currentUser.uid}/documents`),
            orderBy('createdAt', 'asc'),
            where('parentId', '==', String(parentId))
        )
        const queryFolderSnapshotCount = (await getDocs(queryFolder)).size
        const queryDocumentSnapshotCount = (await getDocs(queryDocument)).size

        return queryFolderSnapshotCount + queryDocumentSnapshotCount
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

        // setLoading(true)
        setFolders(prev => ({ ...prev, loading: true }))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const promises = querySnapshot.docs.map(async doc => {
                const itemsCount = await getFolderItemsCount(doc.id)
                return { id: doc.id, itemsCount, ...doc.data() }
            })
            Promise.all(promises).then(res => {
                setFolders(prev => ({ ...prev, data: res, loading: false }))
                // setLoading(false)
            }).catch(error => setFolders(prev => ({ ...prev, error: error.message })))
        })

        return unsubscribe

    }, [params.id])

    useEffect(() => {

        const q = query(
            collection(db, `main/${auth.currentUser.uid}/documents`),
            orderBy('createdAt', 'asc'),
            where('parentId', '==', String(params.id))
        )
        setDocuments(prev => ({ ...prev, loading: true }))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const documents = querySnapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            })
            console.log('documents', documents)
            setDocuments(prev => ({ ...prev, data: documents, loading: false }))
        })

        return unsubscribe
    }, [params.id])
    return (
        <Box sx={{ paddingLeft: '36px', paddingRight: '34px', maxWidth: 'calc(100vw - 236px)', flexGrow: '1' }}>
            <Header style={{ paddingTop: 33 }} />
            <Grid container direction='row' className={cx('overflow-scroll', { 'mt-8': !isEmpty })}>
                {
                    folders.loading && documents.loading && (
                        <Box className='flex w-full justify-center items-center' sx={{ height: 'calc(100vh - 157.35px - 18px - 33px)' }}>
                            <CircularProgress />
                        </Box>
                    )
                }
                {/* // folders //////// */}
                {
                    !folders.loading && (
                        folders.data.map(item => {
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
                {/* // documents //////// */}
                {
                    !documents.loading && !folders.loading && (
                        documents.data.map(item => {
                            return <Grid key={item.id} item xs={12} md={4} lg={3}>
                                <DocumentCard
                                    className='m-4 pt-6 px-11 pb-3 rounded-lg cursor-pointer hover:bg-gray-50 transition'
                                    style={{ boxShadow: '0px 2px 12px rgba(98, 111, 159, 0.12)' }}
                                    text={item.name}
                                    onClick={() => window.open(item.downloadUrl)}
                                />
                            </Grid>
                        })
                    )
                }
            </Grid>
            {
                isEmpty &&
                (
                    <Box style={{ height: 'calc(100vh - 157.34px)' }}>
                        <p
                            className='text-center text-lg'
                            style={{ lineHeight: 'calc(100vh - 157.34px)' }}
                        >
                            This folder dosn't have item
                        </p>
                    </Box>
                )
            }
        </Box>
    )
}


export default Content