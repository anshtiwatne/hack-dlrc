'use client'

import { db } from '@/lib/firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'

export default function Mail() {
    useEffect(() => {
        async function getMailList() {
            const docRef = collection(db, 'users')
            const docSnap = await getDocs(docRef)
            const users = docSnap.docs.map((doc) => doc.data())
            console.log({"users": users})
        }
        getMailList()
    }, [])

    return <></>
}
