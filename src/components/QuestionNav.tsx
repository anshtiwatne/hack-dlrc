'use client'

import React, { useState, useEffect } from 'react'
import { db } from '@/lib/firebase/config'
import { getDoc, doc } from 'firebase/firestore'
import { problemData } from '@/lib/utils/types'
import Question from '@/components/Question'

function Submit({ questionNum, questionData, isLoading }: { questionNum: number | 'sample', questionData: problemData | null | undefined, isLoading: boolean }) {
	const [answer, setAnswer] = useState('')

	function handleGetInput() {
		return null
	}

	function handleSubmit() {
		return null
	}

	return (
		<div className="flex">
			<div>
				<div className="flex items-center justify-center text-sm">
					<button
						onClick={handleSubmit}
						className="rounded-full bg-slate-500 px-4 py-2 font-semibold text-white hover:bg-slate-600"
					>
						Get Input
					</button>
					<div className="flex">
						<input
							value={answer}
							onChange={(e) => setAnswer(e.currentTarget.value)}
							className="ml-4 w-full rounded-l-full bg-slate-200 px-4 py-2 font-medium text-gray-900 outline-none"
							type="text"
							placeholder="Answer"
						/>
						<button
							onClick={handleSubmit}
							className="rounded-r-full bg-slate-500 px-4 py-2 font-semibold text-white hover:bg-slate-600"
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function QuestionNav({ totalQuestions }: { totalQuestions: number }) {
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
				<Question
					questionNum={questionNum}
					questionData={questionData}
					isLoading={isLoading}
				/>
			</div>
		</div>
	)
}
