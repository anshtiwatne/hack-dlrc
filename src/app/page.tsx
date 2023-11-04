'use client'

import Image from 'next/image'
import QuestionNav from '@/components/QuestionNav'
import CodeEditor from '@/components/CodeEditor'
import { useState } from 'react'

export default function Home() {
	const [editorMinimized, setEditorMinimized] = useState(false)

	return (
		<main className="flex flex-grow justify-between">
			<div className={`inline-block ${editorMinimized ? 'w-100' : 'w-[55%]'}`}>
				<QuestionNav number={10} />
			</div>
			<div className={`inline-block ${editorMinimized ? 'w-0' : 'w-[45%]'}`}>
				<CodeEditor minimized={editorMinimized} setMinimized={setEditorMinimized} />
			</div>
		</main>
	)
}
