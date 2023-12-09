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
	getDocs,
} from 'firebase/firestore'
import { TimeProps, SizeProps } from '@/lib/utils/types'

import Countdown from '@/components/Countdown'
import QuestionNav from '@/components/QuestionNav'
import CodeEditor from '@/components/CodeEditor'
import Link from 'next/link'

export default function Home() {
	const { countdown, timer } = serverTime() as TimeProps
	const { isMobile } = displaySize() as SizeProps
	const [editorMinimized, setEditorMinimized] = useState(
		typeof window !== 'undefined' && window.innerWidth < 1100,
	)
	const { user } = userAuth()
	const [userInit, setUserInit] = useState(false)
	const usersRef = collection(db, 'users')

	useEffect(() => {
		async function initUser() {
			if (user) {
				const userRef = doc(usersRef, user?.uid)
				const usersSnapshot = await getDocs(usersRef)
				const usersList = usersSnapshot.docs.map(
					(doc) => doc.data().uid,
				)

				if (!usersList.includes(user?.uid)) {
					const randID = Math.floor(Math.random() * 16)
					setDoc(userRef, {
						uid: user?.uid,
						inputID: randID,
						email: user?.email,
						phone: user?.phoneNumber,
						name: user?.displayName,
						photoURL: user?.photoURL,
						answers: {},
						points: 0,
						teamMembers: [],
						lastLogin: serverTimestamp(),
					})
					setUserInit(true)
				} else {
					setDoc(
						userRef,
						{
							lastLogin: serverTimestamp(),
						},
						{ merge: true },
					)
				}

				// getDoc(userRef).then((doc) => {
				// 	if (doc.exists()) {
				// 		setDoc(
				// 			userRef,
				// 			{
				// 				lastLogin: serverTimestamp(),
				// 			},
				// 			{ merge: true },
				// 		)
				// 		setUserInit(true)
				// 	} else {
				// 		const randID = Math.floor(Math.random() * 16)
				// 		setDoc(userRef, {
				// 			uid: user.uid,
				// 			inputID: randID,
				// 			email: user.email,
				// 			phone: user.phoneNumber,
				// 			name: user.displayName,
				// 			photoURL: user.photoURL,
				// 			answers: {},
				// 			points: 0,
				// 			teamMembers: [],
				// 			lastLogin: serverTimestamp(),
				// 		})
				// 		setUserInit(true)
				// 	}
				// })

				const subscribersRef = doc(db, 'mailList', 'subscribers')
				updateDoc(subscribersRef, { emails: arrayUnion(user?.email) })
			}
		}
		initUser()
	}, [user])

	if (timer != null && timer > 0) {
		if (user) {
			return (
				<main className="flex h-[100dvh] flex-col">
					{true && <Countdown />}

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
								<QuestionNav
									totalQuestions={7}
									isUserInit={userInit}
								/>
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
		} else {
			return (
				<div className="flex flex-grow items-center justify-center pb-10 text-[2dvw] font-semibold text-gray-700">
					HackDLRC has begun 🎉 Sign in now to get started!
				</div>
			)
		}
	} else {
		return (
			<div
				className={`flex flex-grow flex-col items-center justify-center pb-10`}
			>
				<div className={`font-semibold text-gray-700 ${isMobile? 'text-7dvw' : 'text-5xl'}`}>
					HackDLRC has ended!
				</div>
				<div className='text-xl pt-4 text-blue-600'>
					<Link href="/2023/questions">2023 Questions</Link>
				</div>
			</div>
		)
	}
}
