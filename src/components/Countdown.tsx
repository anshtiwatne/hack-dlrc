'use client'

import { JetBrains_Mono } from 'next/font/google'
import { serverTime } from '@/lib/firebase/time'
import { displaySize } from '@/lib/utils/size'
import { useState } from 'react'
import { db } from '@/lib/firebase/config'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { SizeProps, TimeProps } from '@/lib/utils/types'

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export default function Countdown() {
	const { isMobile } = displaySize() as SizeProps
	const { countdown } = serverTime() as TimeProps
	const [email, setEmail] = useState<string>('')

	function handleSubscribe() {
		console.log(email)
		if (email) {
			const subscribersRef = doc(db, 'mailList', 'subscribers')
			updateDoc(subscribersRef, { emails: arrayUnion(email.toLowerCase()) })
		}
		alert("You'll receive a reminder soon")
		setEmail('')
	}

	const millisecondsInDay = 24 * 60 * 60 * 1000
	const days = Math.floor(countdown / millisecondsInDay)
		.toString()
		.padStart(2, '0')
	const hours = Math.floor((countdown % millisecondsInDay) / (60 * 60 * 1000))
		.toString()
		.padStart(2, '0')
	const minutes = Math.floor((countdown % (60 * 60 * 1000)) / (60 * 1000))
		.toString()
		.padStart(2, '0')
	const seconds = Math.floor((countdown % (60 * 1000)) / 1000)
		.toString()
		.padStart(2, '0')

	return (
		<div className="flex flex-grow flex-col items-center justify-center pb-16">
			<div className="flex flex-col font-medium text-gray-400">
				<div className="mb-[-2dvw] flex flex-grow">
					<div className="flex w-[15.38%] justify-center"></div>
					<div className="flex w-[15.38%] justify-center">days</div>
					<div className="flex w-[07.69%] justify-center"></div>
					<div className="flex w-[15.38%] justify-center">hours</div>
					<div className="flex w-[07.69%] justify-center"></div>
					<div className="flex w-[15.38%] justify-center">min</div>
					<div className="flex w-[07.69%] justify-center"></div>
					<div className="flex w-[15.38%] justify-center">sec</div>
				</div>
				<div
					className={`${
						jetBrainsMono.className
					} font-extrabold text-zinc-700 ${
						!isMobile ? 'text-[8dvw]' : 'text-[10dvw]'
					}`}
				>
					T-{days}:{hours}:{minutes}:{seconds}
				</div>
			</div>
			<div className="flex w-screen items-center justify-center px-4 pt-4">
				<div className="whitespace-nowrap text-xl font-semibold text-gray-800">
					Remind me
				</div>
				<div className="flex">
					<input
						name='email'
						autoComplete='email'
						value={email}
						onChange={(e) => setEmail(e.currentTarget.value)}
						className="ml-4 w-full rounded-l-full bg-slate-200 px-4 py-2 font-medium text-gray-900 outline-none"
						type="email"
						placeholder={`email${!isMobile ? ' (we won\'t spam you)' : ''}`}
					/>
					<button
						onClick={handleSubscribe}
						className="rounded-r-full bg-slate-500 px-4 py-2 font-semibold text-white hover:bg-slate-600"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	)
}
