'use client'

import qs from 'qs'
import axios from 'axios'
import Editor from '@monaco-editor/react'
import React, { useState, useRef } from 'react'
import FirstPageIcon from '@mui/icons-material/FirstPageRounded'
import LastPageIcon from '@mui/icons-material/LastPageRounded'
import PlayArrowIcon from '@mui/icons-material/PlayArrowRounded'
import { displaySize } from '@/lib/utils/size'
import { SizeProps } from '@/lib/utils/types'

type languagesObject = {
	[key: string]: {
		display: string
		monaco: string
		codex: string
		comment: string
		helloWorld: string
	}
}

const languages: languagesObject = {
	js: {
		display: 'JavaScript',
		monaco: 'javascript',
		codex: 'js',
		comment: '// you can also code in your own setup',
		helloWorld: 'console.log("Hello, HackDLRC")',
	},
	python: {
		display: 'Python',
		monaco: 'python',
		codex: 'py',
		comment: '# you can also code in your own setup',
		helloWorld: 'print("Hello, HackDLRC")',
	},
	java: {
		display: 'Java',
		monaco: 'java',
		codex: 'java',
		comment: '// you can also code in your own setup',
		helloWorld:
			'class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, HackDLRC");\n    }\n}',
	},
	c: {
		display: 'C',
		monaco: 'c',
		codex: 'c',
		comment: '// you can also code in your own setup',
		helloWorld:
			'#include <stdio.h>\n\nint main() {\n    printf("Hello, HackDLRC");\n}',
	},
	cs: {
		display: 'C#',
		monaco: 'csharp',
		codex: 'cs',
		comment: '// you can also code in your own setup',
		helloWorld:
			'using System;\n\npublic class Program\n{\n    public static void Main()\n    {\n        Console.WriteLine("Hello, HackDLRC");\n    }\n}',
	},
	cpp: {
		display: 'C++',
		monaco: 'cpp',
		codex: 'cpp',
		comment: '// you can also code in your own setup',
		helloWorld:
			'#include <iostream>\n\nint main() {\n    std::cout << "Hello, HackDLRC";\n}',
	},
	go: {
		display: 'Go',
		monaco: 'go',
		codex: 'go',
		comment: '// you can also code in your own setup',
		helloWorld:
			'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, HackDLRC")\n}',
	},
	other: {
		display: 'Other',
		monaco: 'plaintext',
		codex: 'null',
		comment:
			"sorry if your language isn't supported :(\nyou can code in your own setup instead",
		helloWorld: '',
	},
}

function runCode(code: string, lang: string, stdin: string) {
	let data = qs.stringify({
		code: code,
		language: lang,
		input: stdin,
	})

	let config = {
		method: 'post',
		url: 'https://api.codex.jaagrav.in',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		data: data,
	}

	return new Promise((resolve) => {
		if (code === '' || lang === 'null') {
			resolve(['', ''])
		} else {
			axios(config)
				.then(function (response) {
					resolve([response.data.output, response.data.error])
					console.log(response.data)
				})
				.catch((AxiosError) => {
					resolve(['', AxiosError.message])
				})
		}
	})
}

export default function CodeEditor({ minimized, setMinimized }: { minimized: boolean, setMinimized: React.Dispatch<React.SetStateAction<boolean>> }) {
	const { isMobile } = displaySize() as SizeProps
	const [lang, setLang] = useState(languages.python)

	const handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedLang = event.target.value
		setLang(languages[selectedLang])
	}

	const editorRef = useRef<any>(null)
	const inputRef = useRef<any>(null)

	function handleEditorDidMount(editor: any) {
		editorRef.current = editor
	}

	function inputDidMount(editor: any) {
		inputRef.current = editor
	}

	const [response, setResponse] = useState<string>('')

	async function handleClick() {
		setResponse('Running...')
		const editorValue = editorRef.current?.getValue()
		// const input = questionData?.input?.join('\n') ?? '';
		const input = inputRef.current?.getValue()
		const apiResponse: [string, string] = (await runCode(
			editorValue,
			lang.codex,
			input,
		)) as [string, string]
		setResponse(apiResponse[0] + apiResponse[1])
	}

	if (isMobile) return (<div></div>)

	return (
		<div className='flex h-full'>
			<div className="flex items-center">
				<button onClick={() => {setMinimized(!minimized)}} className="flex-nowrap whitespace-nowrap ml-[-2rem] h-10 rounded-l-full bg-blue-600 px-1 text-neutral-50 hover:bg-blue-700">
					{minimized ? <FirstPageIcon /> : <LastPageIcon />}
				</button>
			</div>
			<div className={`flex flex-col h-full rounded-sm bg-[#1E1E1E] text-neutral-50 ${minimized ? 'hidden' : 'w-full'}`}>
				<div>
					<select
						className="m-2 rounded-md bg-neutral-700 p-1 outline-none"
						name="language"
						id="lang"
						onChange={handleLangChange}
					>
						{Object.keys(languages).map((key) => (
							<option key={key} value={key} selected={key === 'python'}>
								{languages[key].display}
							</option>
						))}
					</select>

					<button
						className={`m-2 ml-0 rounded-md bg-neutral-700 p-1 py-[0.15rem] ${
							lang.codex === 'null' ? 'hidden' : ''
						}`}
						onClick={handleClick}
					>
						<div className='pr-2'><PlayArrowIcon /> Run</div>
					</button>

					<hr className="border-neutral-700" />
				</div>

				<div className="flex flex-grow flex-col">
					<div className="inline-block h-[75%] w-full pt-2">
						<Editor
							theme="vs-dark"
							language={lang.monaco}
							value={
								lang.helloWorld
									? `${lang.comment}\n\n${lang.helloWorld}\n`
									: `${lang.comment}\n`
							}
							options={{
								fontSize: 14,
								fontFamily: 'JetBrains Mono',
								fontLigatures: true,
								minimap: { enabled: false },
								scrollbar: {
									horizontalScrollbarSize: 5,
									verticalScrollbarSize: 5,
								},
								overviewRulerLanes: 0,
							}}
							onMount={handleEditorDidMount}
						/>
						<hr
							className={`border-neutral-700 ${
								lang.codex === 'null' ? 'hidden' : ''
							}`}
						/>
					</div>
					<div
						className={`flex w-full flex-grow ${
							lang.codex === 'null' ? 'hidden' : ''
						}`}
					>
						<div className="inline-block w-1/2">
							<div className="mx-7 mb-1 mt-2 text-sm font-light text-neutral-200">
								INPUT
							</div>
							<Editor
								className="pl-1 pr-4"
								height="15vh"
								theme="vs-dark"
								language="plaintext"
								options={{
									fontSize: 14,
									fontFamily: 'JetBrains Mono',
									fontLigatures: true,
									minimap: { enabled: false },
									scrollbar: {
										horizontalScrollbarSize: 5,
										verticalScrollbarSize: 5,
										useShadows: false,
									},
									overviewRulerLanes: 0,
									cursorStyle: 'block',
									lineNumbers: 'off',
								}}
								onMount={inputDidMount}
							/>
						</div>

						<div
							className={`my-2 border border-neutral-700 ${
								lang.codex === 'null' ? 'hidden' : ''
							}`}
						/>

						<div className="inline-block w-1/2">
							<div className="mx-6 mb-1 mt-2 text-sm font-light text-neutral-200">
								OUTPUT
							</div>
							<Editor
								className="pr-1"
								height="15vh"
								theme="vs-dark"
								language="plaintext"
								value={response}
								options={{
									fontSize: 14,
									fontFamily: 'JetBrains Mono',
									fontLigatures: true,
									minimap: { enabled: false },
									scrollbar: {
										horizontalScrollbarSize: 5,
										verticalScrollbarSize: 5,
										useShadows: false,
									},
									overviewRulerLanes: 0,
									readOnly: true,
									domReadOnly: true,
									lineNumbers: 'off',
									renderLineHighlight: 'none',
									renderWhitespace: 'none',
									guides: { indentation: false },
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
