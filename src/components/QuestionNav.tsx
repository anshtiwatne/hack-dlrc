'use client'

import React, { useState, useEffect } from 'react'
import { db } from '@/lib/firebase/config'
import { getDoc, doc } from 'firebase/firestore'
import { problemData } from '@/lib/utils/types'
import Question from '@/components/Question'

// console.log({
// 	'÷': 'https://hack.dlrc.in/finalboss'
// 		.split('')
// 		.map((c) => c.charCodeAt(0))
// 		.map((i) => i * 20220239),
// })
console.clear()
console.log({
    "÷": [
        2102904856,
        2345547724,
        2345547724,
        2264666768,
        2325327485,
        1172773862,
        950351233,
        950351233,
        2102904856,
        1961363183,
        2001803661,
        2163565573,
        930130994,
        2022023900,
        2183785812,
        2305107246,
        2001803661,
        930130994,
        2123125095,
        2224226290,
        950351233,
        2062464378,
        2123125095,
        2224226290,
        1961363183,
        2183785812,
        1981583422,
        2244446529,
        2325327485,
        2325327485
    ]
})

export default function QuestionNav({
	totalQuestions,
	isUserInit,
}: {
	totalQuestions: number
	isUserInit: boolean
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
				<Question
					questionNum={questionNum}
					questionData={questionData}
					isLoading={isLoading}
					isUserInit={isUserInit}
				/>
			</div>
		</div>
	)
}
