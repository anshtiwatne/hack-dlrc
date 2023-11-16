'use client'

import { useState, useEffect } from 'react'
import { userAuth } from '@/lib/firebase/auth'
import { serverTime } from '@/lib/firebase/time'
import { displaySize } from '@/lib/utils/size'
import { db } from '@/lib/firebase/config'
import {
	collection,
	doc,
	getDoc,
	setDoc,
	serverTimestamp,
	updateDoc,
	arrayUnion,
} from 'firebase/firestore'
import { TimeProps, SizeProps } from '@/lib/utils/types'

import Countdown from '@/components/Countdown'
import QuestionNav from '@/components/QuestionNav'
import CodeEditor from '@/components/CodeEditor'

export default function Home() {
	const { countdown } = serverTime() as TimeProps
	const { isMobile } = displaySize() as SizeProps
	const [editorMinimized, setEditorMinimized] = useState(
		typeof window !== 'undefined' && window.innerWidth < 1100,
	)
	const { user } = userAuth()

	useEffect(() => {
		async function initUser() {
			if (user) {
				const usersRef = collection(db, 'users')
				const userRef = doc(usersRef, user?.uid)

				getDoc(userRef).then((doc) => {
					if (doc.exists()) {
						setDoc(
							userRef,
							{
								lastLogin: serverTimestamp(),
							},
							{ merge: true },
						)
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
							lastLogin: serverTimestamp(),
						})
					}
				})

				const subscribersRef = doc(db, 'mailList', 'subscribers')
				updateDoc(subscribersRef, { emails: arrayUnion(user.email) })
			}
		}
		initUser()
	}, [user])

	return (
		<main className="flex h-[100dvh] flex-col">
			{countdown != null && countdown > 0 && <Countdown />}

			{countdown != null && countdown <= 0 && (
				<div className="flex flex-grow justify-between">
					<div
						className={`inline-block ${
							editorMinimized
								? 'w-100'
								: !isMobile
								? 'w-[55%]'
								: 'w-100'
						}`}
					>
						<QuestionNav totalQuestions={7} />
					</div>
					<div
						className={`inline-block ${
							editorMinimized
								? 'w-0'
								: !isMobile
								? 'w-[45%]'
								: 'w-0'
						}`}
					>
						<CodeEditor
							minimized={editorMinimized}
							setMinimized={setEditorMinimized}
						/>
					</div>
				</div>
			)}
		</main>
	)
}
