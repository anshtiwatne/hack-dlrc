'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { problemData } from '@/lib/utils/types'
import formattedText from '@/lib/utils/text'

function Submit({
	questionNum,
	questionData,
	isLoading,
}: {
	questionNum: number | 'sample'
	questionData: problemData | null | undefined
	isLoading: boolean
}) {
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
			alert('correct')
			setAnswer('')
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
}: {
	questionNum: number
	questionData: problemData | null | undefined
	isLoading: boolean
}) {
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
			<div className="py-4 text-blue-600">
				{questionData.resources.map((link, index) => (
					<Link key={index} href={Object.entries(link)[0][1]}>
						{Object.entries(link)[0][0]}
					</Link>
				))}
			</div>
		)
	}

	if (questionNum == 7) {
		console.log({ '÷':
			'https://hack.dlrc.in/finalboss'
				.split('')
				.map((c) => c.charCodeAt(0))
				.map((i) => i * 20220239),
			})
	}

	return (
		<div>
			<div className="text-xl font-medium text-gray-800">
				{questionData.title} ({questionData.points}pts)
			</div>
			<div className="py-4 text-gray-900">
				{formattedText(questionData.description)}
			</div>
			<div className="text-xl font-medium text-gray-800">Example</div>
			<div className="py-4 text-gray-900">
				{formattedText(questionData.example)}
			</div>
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
			<div
				className={`text-xl font-medium text-gray-800 ${
					questionData.resources == undefined ? 'hidden' : ''
				}`}
			>
				Resources
			</div>
			{resources}
			<br />
			<Submit
				questionNum={questionNum}
				questionData={questionData}
				isLoading={isLoading}
			/>
		</div>
	)
}
