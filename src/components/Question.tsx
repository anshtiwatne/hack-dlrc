'use client'

import Link from 'next/link'
import { useState, useEffect, Key } from 'react'
import { userAuth } from '@/lib/firebase/auth'
import { problemData } from '@/lib/utils/types'
import formattedText from '@/lib/utils/text'
import { userData } from '@/lib/utils/types'
import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'

function Submit({
	userData,
	questionNum,
	questionData,
	isLoading,
}: {
	userData: userData | null
	questionNum: number | 'sample'
	questionData: problemData | null | undefined
	isLoading: boolean
}) {
	const { user } = userAuth()
	const userRef = doc(collection(db, 'users'), user?.uid)

	if (isLoading) return <div>Loading...</div>

	const [answer, setAnswer] = useState('')
	const [answerCorrect, setAnswerCorrect] = useState(false)
	const [answerTimeout, setAnswerTimeout] = useState<number>(0)

	useEffect(() => {
		let intervalId: NodeJS.Timeout

		if (answerTimeout > 0) {
			intervalId = setInterval(() => {
				setAnswerTimeout((prevTimeout) => prevTimeout - 1)
			}, 1000)
		}

		return () => {
			clearInterval(intervalId)
		}
	}, [answerTimeout])

	function handleSubmit() {
		if (answer == questionData?.output[0]) {
			if (userData?.answers[questionNum] == undefined) {
				const newAnswers = userData?.answers as any
				newAnswers[questionNum] = {answer: answer, timestamp: serverTimestamp()}
				setDoc(userRef, 
					{answers: newAnswers}, {merge: true}
					)
					setDoc(userRef, {points: userData?.points as number + questionData?.points}, {merge: true})
				alert('correct')
				setAnswer('')
			} else {
				alert('you\'ve already got this right')
			}
			setAnswerCorrect(true)
		} else {
			// alert('incorrect')
			setAnswerCorrect(false)
			setAnswer('')
			setAnswerTimeout(60)
		}
	}

	return (
		<div className="flex">
			<div>
				<div className="flex items-center justify-center text-sm">
					<Link
						href={questionData?.input[0] as string}
						target="_blank"
						className="whitespace-nowrap rounded-full bg-slate-500 px-4 py-2 font-semibold text-white hover:bg-slate-600"
					>
						Get Input
					</Link>
					<div className="flex">
						<input
							name='answer'
							autoComplete='off'
							value={answer}
							onChange={(e) => setAnswer(e.currentTarget.value)}
							className={`ml-4 w-full rounded-l-full bg-slate-200 px-4 py-2 font-medium text-gray-900 outline-none ${
								answerTimeout > 0
									? 'cursor-not-allowed bg-slate-300'
									: ''
							}`}
							type="text"
							placeholder={
								answerTimeout > 0 ? 'Incorrect' : 'Answer'
							}
							disabled={answerTimeout > 0 ? true : false}
						/>
						<button
							onClick={
								answerTimeout > 0 ? () => {} : handleSubmit
							}
							className={`whitespace-nowrap rounded-r-full bg-slate-500 px-4 py-2 font-semibold text-white ${
								answerTimeout > 0
									? 'cursor-not-allowed'
									: 'hover:bg-slate-600'
							}`}
						>
							{answerTimeout > 0 ? (
								<span className="px-4 font-mono">
									{answerTimeout.toString().padStart(2, '0')}
								</span>
							) : (
								'Submit'
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function Question({
	questionNum,
	questionData,
	isLoading,
	isUserInit,
}: {
	questionNum: number
	questionData: problemData | null | undefined
	isLoading: boolean
	isUserInit: boolean
}) {
	const { user } = userAuth()
	const [playerData, setUserData] = useState<userData | null>(null)
	
	useEffect(() => {
		async function getInputID() {
			if (user) {
				const userRef = doc(collection(db, 'users'), user?.uid)
				const userDoc = await getDoc(userRef)
				const userData = userDoc.data()
				setUserData(userData as any)
			}
		}
		getInputID()
	}, [isUserInit, user])

	if (isLoading)
		return (
			<p
				className={`${
					screen.width > 1100 ? 'w-[50dvw]' : 'w-[100dvw]'
				}`}
			>
				Loading...
			</p>
		)
	if (!questionData)
		return (
			<p
				className={`${
					screen.width > 1100 ? 'w-[50dvw]' : 'w-[100dvw]'
				}`}
			>
				No question data
			</p>
		)

	let resources = <div></div>

	if (questionData.resources !== undefined) {
		resources = (
			<div className="py-3 text-blue-600 flex flex-col">
				{Object.keys(questionData.resources).map((key, index) => (
					<Link className='py-1' key={index} href={questionData.resources[key]} target='_blank'>
						{key}
					</Link>
				))}
			</div>
		)
	}

	return (
		<div>
			<div className="text-xl font-medium text-gray-800">
				{questionData.title} ({questionData.points}pts)
			</div>
			<div className="py-4 text-gray-900">
				{formattedText(questionData.description, true)}
			</div>
			{questionData?.example && (
				<>
					<div className="text-xl font-medium text-gray-800">Example</div>
					<div className="py-4 text-gray-900">
						{formattedText(questionData.example, true)}
					</div>
				</>
			)}
			<div className="text-xl font-medium text-gray-800">
				Additional Info
			</div>
			<div className="py-4 text-gray-900">
				{questionData.additionalInfo.map((data, index) => (
					<div key={index}>
						<span className='font-mono font-semibold text-gray-600'>{index + 1}.</span> {formattedText(data)}
					</div>
				))}
			</div>
			{questionData?.hint && (
				<>
					<div className="text-xl font-medium text-gray-800">Hint (-10pts)</div>
					<div className="py-4 text-gray-900">
						{formattedText(questionData.hint)}
					</div>
				</>
			)}
			<div
				className={`text-xl font-medium text-gray-800 ${
					questionData.resources == undefined ? 'hidden' : ''
				}`}
			>
				Resources
			</div>
			{resources}
			<br />
			{playerData && !isLoading && questionData.input && (
				<Submit
					userData={playerData}
					questionNum={questionNum}
					questionData={questionData}
					isLoading={isLoading}
				/>
			)}
		</div>
	)
}
