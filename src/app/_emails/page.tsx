'use client'

import { db } from '@/lib/firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect } from 'react'

export default function Mail() {
    let emails = [] as any
    useEffect(() => {
        async function getMailList() {
            const docRef = doc(db, 'mailList', 'subscribers')
            const docSnap = await getDoc(docRef)
            for (const email of docSnap.data()?.emails) {
                emails.push(email)
            }
            console.log(emails)
        }
        getMailList()
    }, [])

    return <></>
}