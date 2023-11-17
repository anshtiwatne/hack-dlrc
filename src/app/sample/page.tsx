'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { displaySize } from '@/lib/utils/size'
import { problemData, SizeProps } from '@/lib/utils/types'
import formattedText from '@/lib/utils/text'
import CodeEditor from '@/components/CodeEditor'

function Question({
	questionNum,
	questionData,
	isLoading,
}: {
	questionNum: number | 'sample'
	questionData: problemData | null | undefined
	isLoading: boolean
}) {
	const { isMobile } = displaySize() as SizeProps

	if (isLoading)
		return (
			<p className={`${!isMobile ? 'w-[50dvw]' : 'w-[100dvw]'}`}>
				Loading...
			</p>
		)
	if (!questionData)
		return (
			<p className={`${!isMobile ? 'w-[50dvw]' : 'w-[100dvw]'}`}>
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

	return (
		<div>
			<div className="text-xl font-medium text-gray-800">
				{questionData.title} (Sample)
			</div>
			<div className="py-4 text-gray-900">
				{formattedText(questionData.description)}
			</div>
			<div className="text-xl font-medium text-gray-800">Example</div>
			<div className="py-4 text-gray-900">
				{formattedText(questionData.example, true)}
			</div>
			<div className="text-xl font-medium text-gray-800">
				Additional Info
			</div>
			<div className="py-4 text-gray-900">
				{questionData.additionalInfo.map((data, index) => (
					<div key={index}>
						{index + 1}. {formattedText(data)}
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
		if (answer === '1434572895') {
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
						href="https://pastebin.com/raw/SUn7vLUH"
						target="_blank"
						className="whitespace-nowrap rounded-full bg-slate-500 px-4 py-2 font-semibold text-white hover:bg-slate-600"
					>
						Get Input
					</Link>
					<div className="flex">
						<input
							name='answer'
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

function QuestionNav({ totalQuestions }: { totalQuestions: number }) {
	const questionNum = 'sample'
	const [isLoading, setLoading] = useState(true)
	const [questionData, setData] = useState<problemData | null | undefined>(
		undefined,
	)

	useEffect(() => {
		async function fetchData() {
			const docRef = doc(db, 'problems', questionNum.toString())
			const docSnap = await getDoc(docRef)
			const docData = docSnap.data() as problemData | undefined
			setData(docData)
			setLoading(false)
		}
		fetchData()
	}, [questionNum])

	return (
		<div className="flex h-full w-full flex-col">
			{/* some sort of bug: flex-grow is only working if any random height is set */}
			<div className="h-1 w-full flex-grow overflow-auto p-4">
				<Question
					questionNum={questionNum}
					questionData={questionData}
					isLoading={isLoading}
				/>
			</div>
		</div>
	)
}

export default function Sample() {
	const { isMobile } = displaySize() as SizeProps
	const [editorMinimized, setEditorMinimized] = useState(false)

	return (
		<main className="flex flex-grow justify-between">
			<div
				className={`inline-block ${
					editorMinimized
						? 'w-screen'
						: !isMobile
						? 'w-[55%]'
						: 'w-screen'
				}`}
			>
				<QuestionNav totalQuestions={7} />
			</div>
			<div
				className={`inline-block ${
					editorMinimized ? 'w-0' : !isMobile ? 'w-[45%]' : 'w-0'
				}`}
			>
				<CodeEditor
					minimized={editorMinimized}
					setMinimized={setEditorMinimized}
				/>
			</div>
		</main>
	)
}
