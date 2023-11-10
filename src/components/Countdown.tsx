'use client'

import { JetBrains_Mono } from 'next/font/google'
import { serverTime } from '@/lib/firebase/time'
import { displaySize } from '@/lib/utils/size'
import { useState } from 'react'
import { db } from '@/lib/firebase/config'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] })

interface TimeProps {
	timer: number
	countdown: number
}

interface SizeProps {
	width: number
	height: number
}

export default function Countdown() {
	const { width } = displaySize() as SizeProps
	const { countdown } = serverTime() as TimeProps
	const [email, setEmail] = useState<string>('')

	function handleSubscribe() {
		console.log(email)
		if (email) {
			const subscribersRef = doc(db, 'mailList', 'subscribers')
			updateDoc(subscribersRef, {emails: arrayUnion(email)})
		}
		alert("You'll receive a reminder soon")
		setEmail('')
	}

	const millisecondsInDay = 24 * 60 * 60 * 1000;
	const days = Math.floor(countdown / millisecondsInDay).toString().padStart(2, '0')
	const hours = Math.floor((countdown % millisecondsInDay) / (60 * 60 * 1000)).toString().padStart(2, '0')
	const minutes = Math.floor((countdown % (60 * 60 * 1000)) / (60 * 1000)).toString().padStart(2, '0')
	const seconds = Math.floor((countdown % (60 * 1000)) / 1000).toString().padStart(2, '0')

	return (
		<div className='flex-grow flex items-center justify-center flex-col pb-16'>
			<div className='flex flex-col text-gray-400 font-medium'>
				<div className='flex flex-grow mb-[-2dvw]'>
					<div className='flex justify-center w-[15.38%]'></div>
					<div className='flex justify-center w-[15.38%]'>days</div>
					<div className='flex justify-center w-[07.69%]'></div>
					<div className='flex justify-center w-[15.38%]'>hours</div>
					<div className='flex justify-center w-[07.69%]'></div>
					<div className='flex justify-center w-[15.38%]'>min</div>
					<div className='flex justify-center w-[07.69%]'></div>
					<div className='flex justify-center w-[15.38%]'>sec</div>
				</div>
				<div className={`${jetBrainsMono.className} font-extrabold text-zinc-700 ${width > 1100 ? 'text-[8dvw]' : 'text-[10dvw]'}`}>T-{days}:{hours}:{minutes}:{seconds}</div>
			</div>
			<div className='flex justify-center items-center w-screen px-4 pt-4'>
				<div className='font-semibold text-xl text-gray-800 whitespace-nowrap'>Remind me</div>
				<div className='flex'>
					<input value={email} onChange={(e) => setEmail(e.currentTarget.value)} className='w-full bg-slate-200 ml-4 px-4 py-2 outline-none rounded-l-full font-medium text-gray-900' type="email" placeholder='email' />
					<button onClick={handleSubscribe} className='bg-slate-500 font-semibold text-white px-4 py-2 rounded-r-full hover:bg-slate-600'>Submit</button>
				</div>
			</div>
		</div>
	)
}
