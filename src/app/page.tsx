'use client'

import Main from '@/components/Main'
import { useEffect } from 'react'
import { userAuth } from '@/lib/firebase/auth'
import { db } from '@/lib/firebase/config'
import { collection, doc, getDoc, setDoc, serverTimestamp, updateDoc, arrayUnion } from 'firebase/firestore'

export default function Home() {
	const { user } = userAuth()

	useEffect(() => {
		async function initUser() {
			if (user) {
				const usersRef = collection(db, 'users')
				const userRef = doc(usersRef, user?.uid)
				getDoc(userRef).then((doc) => {
					if (doc.exists()) {
						setDoc(userRef, {
							uid: user.uid,
							inputID: null,
							email: user.email,
							phone: user.phoneNumber,
							name: user.displayName,
							photoURL: user.photoURL,
							answers: {},
							points: 0,
							teamMembers: [],
							// fields above only till 24th Nov
							lastLogin: serverTimestamp()
						}, {merge: true})
					} else {
						setDoc(userRef, {
							uid: user.uid,
							inputID: null,
							email: user.email,
							phone: user.phoneNumber,
							name: user.displayName,
							photoURL: user.photoURL,
							answers: {},
							points: 0,
							teamMembers: [],
							lastLogin: serverTimestamp()
						})
					}
				})

				const subscribersRef = doc(db, 'mailList', 'subscribers')
				updateDoc(subscribersRef, {emails: arrayUnion(user.email)})
			}
		}
		initUser()
	}, [user])

	return (
		<main className="flex h-[100dvh] flex-col">
			<Main />
		</main>
	)
}
