import Image from 'next/image'
import QuestionNav from '@/components/QuestionNav'
import CodeEditor from '@/components/CodeEditor'

export default function Home() {
	return (
		<main className="flex flex-grow justify-between">
			<div className="inline-block w-[55%]">
				<QuestionNav number={10} />
			</div>
			<div className="inline-block w-[45%]">
				<CodeEditor />
			</div>
		</main>
	)
}
