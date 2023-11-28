'use client'

import { db } from '@/lib/firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect } from 'react'

export default function Page() {
    
    useEffect(() => {
        async function getMailList() {
            const docRef = doc(db, 'mailList', 'subscribers')
            const docSnap = await getDoc(docRef)
            const emails = docSnap.data()
            console.log({"emails": emails})
        }
        getMailList()
    }, [])

    return (
        <div>
            <h1>Subscribers</h1>
        </div>
    )
}