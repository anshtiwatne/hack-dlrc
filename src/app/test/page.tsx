'use client'

import { useState } from 'react'
// import { userAuth } from '@/lib/firebase/auth'
import { displaySize } from '@/lib/utils/size'
import { SizeProps } from '@/lib/utils/types'

import QuestionNav from '@/components/QuestionNav'
import CodeEditor from '@/components/CodeEditor'

export default function Test() {
	// const authorizedUsers = ['ansh.tiwatne@gmail.com', 'aneesh1701@gmail.com', 'neofernandes2006@gmail.com']
	const { isMobile } = displaySize() as SizeProps
	const [editorMinimized, setEditorMinimized] = useState(!isMobile)
	// const { user } = userAuth()

	return (
		<main className="flex h-[100dvh] flex-col">
			{/* {authorizedUsers.includes(user?.email as string) ? ( */}
				<div className="flex flex-grow justify-between">
					<div
						className={`inline-block ${
							editorMinimized
								? 'w-100'
								: !isMobile
								? 'w-[55%]'
								: 'w-100'
						}`}
					>
						<QuestionNav totalQuestions={7} isUserInit={true} />
					</div>
					<div
						className={`inline-block ${
							editorMinimized
								? 'w-0'
								: !isMobile
								? 'w-[45%]'
								: 'w-0'
						}`}
					>
						<CodeEditor
							minimized={editorMinimized}
							setMinimized={setEditorMinimized}
						/>
					</div>
				</div>
			{/* ) : (
                <div>You're not permitted to view this content</div>
            )} */}
		</main>
	)
}
