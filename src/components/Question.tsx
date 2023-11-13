import Link from 'next/link'
import { useState, useEffect } from 'react'
import { problemData } from '@/lib/utils/types'
import formattedText from '@/lib/utils/text'

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
					<Link
						href='example.com'
						target="_blank"
						className="rounded-full bg-slate-500 px-4 py-2 font-semibold text-white hover:bg-slate-600"
					>
						Get Input
					</Link>
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

export default function Question({ questionNum, questionData, isLoading }: { questionNum: number, questionData: problemData | null | undefined, isLoading: boolean }) {
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
