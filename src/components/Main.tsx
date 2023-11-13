'use client'

// Fonts
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Open_Sans } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import MenuIcon from '@mui/icons-material/MenuRounded'

// Contexts
import { serverTime } from '@/lib/firebase/time'
import { userAuth } from '@/lib/firebase/auth'
import { displaySize } from '@/lib/utils/size'
import { AuthProps, TimeProps, SizeProps } from '@/lib/utils/types'

// Components
import Countdown from '@/components/Countdown'
import Leaderboard from '@/components/Leaderboard'
import Sponsors from '@/components/Sponsors'
import Help from '@/components/Help'
import QuestionNav from '@/components/QuestionNav'
import CodeEditor from '@/components/CodeEditor'
import Sample from '@/components/Sample'

const openSans = Open_Sans({ subsets: ['latin'] })
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] })

function getInputID(uid: string) {
	function customHash() {
		let hash = 0
		for (let i = 0; i < uid.length; i++) {
			hash = (hash << 5) - hash + uid.charCodeAt(i)
		}
		return hash
	}

	const hash = customHash()
	const min = 1
	const max = 10
	const range = max - min + 1
	return (((hash % range) + range) % range) + min
}

export default function Main() {
	const { user, signInWithGoogle, signOut } = userAuth() as AuthProps
	const { timer, countdown } = serverTime() as TimeProps
	const { width } = displaySize() as SizeProps
	const [pageNav, setPageNav] = useState(0)

	let days = ''
	let hours = ''
	let minutes = ''
	let seconds = ''

	if (timer != null) {
		const millisecondsInDay = 24 * 60 * 60 * 1000
		days = Math.floor(timer / millisecondsInDay)
			.toString()
			.padStart(2, '0')
		hours = Math.floor((timer % millisecondsInDay) / (60 * 60 * 1000))
			.toString()
			.padStart(2, '0')
		minutes = Math.floor((timer % (60 * 60 * 1000)) / (60 * 1000))
			.toString()
			.padStart(2, '0')
		seconds = Math.floor((timer % (60 * 1000)) / 1000)
			.toString()
			.padStart(2, '0')
	}

	async function handleSignIn() {
		try {
			await signInWithGoogle()
		} catch (error) {
			console.error('Error signing in with Google', error)
		}
	}

	async function handleSignOut() {
		try {
			await signOut()
		} catch (error) {
			console.error('Error signing out with Google', error)
		}
	}

	function LargeHeader() {
		return (
			<header>
				<div
					className={`${openSans.className} flex items-center justify-between p-4`}
				>
					<nav className="flex items-center text-zinc-500">
						<button
							onClick={() => setPageNav(0)}
							className="pr-6 text-xl font-bold text-zinc-800"
						>
							HackDLRC
						</button>
						<button onClick={() => setPageNav(1)} className="px-2 hover:text-zinc-600">
							Sponsors
						</button>
						<button onClick={() => setPageNav(2)} className="px-2 hover:text-zinc-600">
							Leaderboard
						</button>
						<button onClick={() => setPageNav(3)} className="px-2 hover:text-zinc-600">
							Help
						</button>
						{countdown != null && countdown > 0 && (
							<button onClick={() => setPageNav(4)} className='px-2 hover:text-zinc-600'>Sample Question</button>
						)}
					</nav>

					{timer === null ? (
						''
					) : (
						<div
							className={`${jetBrainsMono.className} absolute left-1/2 -translate-x-1/2 transform text-xl font-bold text-zinc-700`}
						>
							{days}:{hours}:{minutes}:{seconds}
						</div>
					)}

					{!user ? (
						<nav className="flex items-center text-zinc-600">
							<button
								onClick={handleSignIn}
								className="ml-4 rounded-full bg-slate-500 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-600"
							>
								Sign in with Google
							</button>
						</nav>
					) : (
						<div className="flex items-center">
							{timer != null && timer > 0 && <div className='font-medium'>⭐ 0</div>}
							{countdown != null && countdown > 0 && (
							<Link className='px-2 text-zinc-500 hover:text-zinc-600' href='https://forms.gle/RLTPQ8h9TQrzwJi5A'>Register a Team</Link>
							)}
							<button
								onClick={handleSignOut}
								className="ml-4 rounded-full bg-slate-500 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-600"
							>
								Sign out
							</button>
							<div className="relative ml-4 h-8 w-8 my-[-1rem]">
								<Image
									className="rounded-full"
									src={user?.photoURL as string}
									alt="Profile Picture"
									referrerPolicy="no-referrer"
									fill
								/>
							</div>
						</div>
					)}
				</div>
				<hr />
			</header>
		)
	}

	function SmallHeader() {
		return (
			<header>
				<div
					className={`${openSans.className} flex items-center justify-between p-4`}
				>
					<nav className="flex items-center text-zinc-500">
						<button onClick={() => setPageNav(-1)}>
							<MenuIcon />
						</button>
						<button
							onClick={() => setPageNav(0)}
							className="pl-2 pr-4 text-xl font-bold text-zinc-800"
						>
							HackDLRC
						</button>
					</nav>

					{!user ? (
						<nav className="flex items-center text-zinc-600">
							<button
								onClick={handleSignIn}
								className="ml-4 rounded-full bg-slate-500 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-600"
							>
								Sign in
							</button>
						</nav>
					) : (
						<div className="flex items-center">
							{timer != null && timer > 0 && <div className='font-medium'>⭐ 0</div>}
							
							<button
								onClick={handleSignOut}
								className="ml-4 rounded-full bg-slate-500 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-600"
							>
								Sign out
							</button>
							<div className="relative ml-4 h-8 w-8 my-[-1rem]">
								<Image
									className="rounded-full"
									src={user?.photoURL as string}
									alt="Profile Picture"
									referrerPolicy="no-referrer"
									fill
								/>
							</div>
						</div>
					)}
				</div>
				<hr />
			</header>
		)
	}

	function HamburgerMenu() {
		return (
			<nav className="flex h-full w-full flex-col items-center bg-slate-50 px-4 font-medium text-gray-700">
				<button onClick={() => setPageNav(0)} className="p-2 text-xl">
					Home
				</button>
				<hr className="w-full" />
				{countdown != null && countdown > 0 && (
					<div className='w-full flex justify-center items-center flex-col'>
						<Link className='p-2 text-xl' href='https://forms.gle/RLTPQ8h9TQrzwJi5A'>Register a Team</Link>
						<hr className='w-full' />
					</div>
				)}
				{countdown != null && countdown > 0 && (
					<div className='w-full flex justify-center items-center flex-col'>
						<button onClick={() => setPageNav(4)} className='p-2 text-xl'>Sample Question</button>
						<hr className='w-full' />
					</div>
				)}
				<button onClick={() => setPageNav(1)} className="p-2 text-xl">
					Sponsors
				</button>
				<hr className="w-full" />
				<button onClick={() => setPageNav(2)} className="p-2 text-xl">
					Leaderboard
				</button>
				<hr className="w-full" />
				<button onClick={() => setPageNav(3)} className="p-2 text-xl">
					Help
				</button>
				<hr className="w-full" />
			</nav>
		)
	}

	const [editorMinimized, setEditorMinimized] = useState(
		typeof window !== 'undefined' && window.innerWidth < 1100
	)

	return (
		<div className="flex h-[100dvh] flex-col">
			{width > 1100 ? <LargeHeader /> : <SmallHeader />}

			{pageNav === 0 && countdown != null && countdown > 0 && (
				<Countdown />
			)}
			{pageNav === 0 && countdown != null && countdown <= 0 && (
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
			)}
			{pageNav === 1 && <Sponsors />}
			{pageNav === 2 && <Leaderboard />}
			{pageNav === 3 && <Help />}
			{pageNav === 4 && <Sample />}
			{pageNav === -1 && <HamburgerMenu />}
		</div>
	)
}
