'use client'

import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { db } from '@/lib/firebase/config'
import { getDoc, doc } from 'firebase/firestore'

type problemData = {
	title: string
	points: number
	description: string
	example: string
	additionalInfo: Array<string>
	resources: Array<Object>
	// input: Array<string>;
	// output: Array<string>;
}

function formattedText(text: string) {
	if (text === undefined) return <span></span>
	const newText = text.replace(
		/\`(.*?)\`/g,
		(match, content) => '<span class="font-bold">' + content + '</span>',
	)

	return <span dangerouslySetInnerHTML={{ __html: newText }}></span>
}

function Question({
	questionData,
	isLoading,
}: {
	questionData: problemData | null | undefined
	isLoading: boolean
}) {
	if (isLoading) return <p className="mr-2 w-[50vw]">Loading...</p>
	if (!questionData) return <p className="mr-2 w-[50vw]">No question data</p>

	let resources = <div></div>

	if (questionData.resources !== undefined) {
		resources = (
			<div className="py-4 text-blue-600">
				{questionData.resources.map((link, index) => (
					<a key={index} href={Object.entries(link)[0][1]}>
						{Object.entries(link)[0][0]}
					</a>
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
				{formattedText(questionData.description)}
			</div>
			<div className="text-xl font-medium text-gray-800">Example</div>
			<div className="py-4 text-gray-900">
				{formattedText(questionData.example)}
			</div>
			<div className="text-xl font-medium text-gray-800">Additional Info</div>
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
			<Submit questionData={questionData} isLoading={isLoading} />
		</div>
	)
}

function Submit({
	questionData,
	isLoading,
}: {
	questionData: problemData | null | undefined
	isLoading: boolean
}) {
	return (
		<div className='flex'>
			<button className='mr-4 rounded bg-slate-500 px-2 py-1 text-sm font-semibold text-white hover:bg-slate-600'>Get your input</button>
			<div className='bg-slate-500 rounded p-1'>
				<input placeholder='Answer' className='mr-1 w-36 px-2 rounded outline-none focus:bg-slate-100' type="text" />
				<button className='rounded px-2 py-1 text-sm font-semibold text-white hover:bg-slate-600'>Submit</button>
			</div>
		</div>
	)
}

export default function QuestionNav({
	number: totalQuestions,
}: {
	number: number
}) {
	const [questionNum, setQuestionNum] = useState(1)
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

	const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1)

	return (
		<div className="flex h-full flex-col">
			<nav className="flex justify-center pb-2 pt-4 text-zinc-700">
				{questions.map((btnNum) => (
					<button
						key={btnNum}
						onClick={() => setQuestionNum(btnNum)}
						className={`mx-2 h-8 w-8 rounded-md border ${
							btnNum === questionNum
								? 'bg-blue-600 text-neutral-50'
								: 'bg-slate-50 hover:bg-slate-100'
						}`}
					>
						{btnNum}
					</button>
				))}
			</nav>
			{/* some sort of bug: flex-grow is only working if any random height is set */}
			<div className="h-1 flex-grow overflow-auto p-4 pt-0">
				<Question questionData={questionData} isLoading={isLoading} />
			</div>
		</div>
	)
}
