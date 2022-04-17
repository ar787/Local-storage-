import React, { useEffect, useState, useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { collection, getDocs, where, query, onSnapshot, orderBy } from 'firebase/firestore'
import { Box, CircularProgress, Grid } from '@mui/material'
import { Download, Delete } from '@mui/icons-material'
import cx from 'classnames'
import { saveAs } from 'file-saver';

// import { getStorage, ref, getDownloadURL } from 'firebase/storage'

import { db, auth } from 'firebase-config'
import Header from 'components/moduls/header'
import FolderCard from 'components/elements/FolderCard'
import DocumentCard from 'components/elements/DocumentCard'
import { getDownloadURL, getStorage, ref, deleteObject } from 'firebase/storage'
import { doc, deleteDoc } from 'firebase/firestore'

function Content() {
    const history = useHistory()
    const params = useParams()
    const [folders, setFolders] = useState({ data: [], loading: null, error: null })
    const [documents, setDocuments] = useState({ data: [], loading: null, error: null })
    const isEmpty = !folders.data.length && !documents.data.length && folders.loading === false && documents.loading === false
    const options = useMemo(() => [
        {
            text: 'Download',
            icon: <Download />,
            onClick: (el) => {
                const storage = getStorage()
                const storageRef = ref(storage, `users/${auth.currentUser.uid}/${el.fileName}`)
                getDownloadURL(storageRef).then(url => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = (event) => {
                        const blob = xhr.response;
                        console.log(blob);
                        saveAs(blob, 'ddd')
                    };
                    xhr.open('GET', url);
                    xhr.setRequestHeader('X-PINGOTHER', 'pingpong');
                    xhr.send();

                })
            }
        },
        {
            text: 'Archive',
            textColor: 'red',
            icon: <Delete color='error' />,
            onClick: async (el) => {
                const storage = getStorage()
                const storageRef = ref(storage, `users/${auth.currentUser.uid}/${el.fileName}`)

                try {
                    await deleteObject(storageRef)
                    await deleteDoc(doc(db, `main/${auth.currentUser.uid}/documents/${el.id}`))
                } catch (error) {
                    console.error(error)
                }

            }
        }
    ], [])
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
                                {/* <a href={item.downloadUrl} download> */}
                                <DocumentCard
                                    className={cx('m-4 pl-4 rounded-lg')}
                                    style={{ boxShadow: '0px 2px 12px rgba(98, 111, 159, 0.12)', height: 184 }}
                                    text={item.name}
                                    options={options.map(el => ({ ...el, id: item.id, fileName: item.name, downloadUrl: item.downloadUrl }))}
                                    // onClick={() => window.open(item.downloadUrl)}
                                    {...item}
                                />
                                {/* </a> */}
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