'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { displaySize } from '@/lib/utils/size';
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
	if (isLoading) return <p className={`${screen.width > 1100 ? 'w-[50dvw]' : 'w-[100dvw]'}`}>Loading...</p>
	if (!questionData) return <p className={`${screen.width > 1100 ? 'w-[50dvw]' : 'w-[100dvw]'}`}>No question data</p>

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
			<Submit
				questionNum={questionNum}
				questionData={questionData}
				isLoading={isLoading}
			/>
		</div>
	)
}

function Submit({ questionNum, questionData, isLoading }: { questionNum: number | 'sample', questionData: problemData | null | undefined, isLoading: boolean }) {
    const [answer, setAnswer] = useState('')

    function handleSubmit() {
        if (answer === '1434572895') {
            alert('correct')
            setAnswer('')
        }
        else {
            alert('incorrect')
            setAnswer('')
        }
    }

	return (
		<div className="flex">
			<div>
            <div className='flex justify-center items-center text-sm'>
				<Link href="https://pastebin.com/raw/SUn7vLUH" target="_blank" className='bg-slate-500 font-semibold text-white px-4 py-2 rounded-full hover:bg-slate-600 whitespace-nowrap'>Get Input</Link>
					<div className='flex'>
						<input value={answer} onChange={(e) => setAnswer(e.currentTarget.value)} className='w-full bg-slate-200 ml-4 px-4 py-2 outline-none rounded-l-full font-medium text-gray-900' type="text" placeholder='Answer' />
						<button onClick={handleSubmit} className='bg-slate-500 font-semibold whitespace-nowrap text-white px-4 py-2 rounded-r-full hover:bg-slate-600'>Submit</button>
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
		<div className="flex h-full flex-col pt-4">
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

export default function Sample() {
	const { width, height } = displaySize() as SizeProps;
    const [editorMinimized, setEditorMinimized] = width > 1100 ? useState(false) : useState(true)

    return (
        <div className="flex flex-grow justify-between">
            <div
                className={`inline-block ${
                    editorMinimized ? 'w-100' : width > 1100 ? (
                        'w-[55%]'
                    ) : (
                        'w-100'
                    )
                }`}
            >
                <QuestionNav totalQuestions={7} />
            </div>
            <div
                className={`inline-block ${
                    editorMinimized ? 'w-0' : width > 1100 ? (
                        'w-[45%]'
                    ) : (
                        'w-0'
                    )
                }`}
            >
                <CodeEditor
                    minimized={editorMinimized}
                    setMinimized={setEditorMinimized}
                />
            </div>
        </div>
    )
}