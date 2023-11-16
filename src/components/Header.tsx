'use client'

// Fonts
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Open_Sans } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import MenuIcon from '@mui/icons-material/MenuRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'

// Contexts
import { serverTime } from '@/lib/firebase/time'
import { userAuth } from '@/lib/firebase/auth'
import { displaySize } from '@/lib/utils/size'
import { AuthProps, TimeProps, SizeProps } from '@/lib/utils/types'

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

export default function Header() {
	const { user, signInWithGoogle, signOut } = userAuth() as AuthProps
	const { timer, countdown } = serverTime() as TimeProps
	const { isMobile } = displaySize() as SizeProps
	const [menuOpen, setMenuOpen] = useState(false)

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
						<Link
							href="/"
							className="pr-6 text-xl font-bold text-zinc-800"
						>
							HackDLRC
						</Link>
						<Link
							href="/sponsors"
							className="px-2 hover:text-zinc-600"
						>
							Sponsors
						</Link>
						<Link
							href="/leaderboard"
							className="px-2 hover:text-zinc-600"
						>
							Leaderboard
						</Link>
						<Link href="/help" className="px-2 hover:text-zinc-600">
							Help
						</Link>
						{countdown != null && countdown > 0 && (
							<Link
								href="/sample"
								className="px-2 hover:text-zinc-600"
							>
								Sample Question
							</Link>
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
							{countdown != null && countdown > 0 && (
								<Link
									className="px-2 text-zinc-500 hover:text-zinc-600"
									href="https://forms.gle/RLTPQ8h9TQrzwJi5A"
								>
									Register a Team
								</Link>
							)}
							<button
								onClick={handleSignIn}
								className="ml-4 rounded-full bg-slate-500 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-600"
							>
								Sign in with Google
							</button>
						</nav>
					) : (
						<div className="flex items-center">
							{timer != null && timer > 0 && (
								<div className="font-medium">⭐ 0</div>
							)}
							{countdown != null && countdown > 0 && (
								<Link
									className="px-2 text-zinc-500 hover:text-zinc-600"
									href="https://forms.gle/RLTPQ8h9TQrzwJi5A"
								>
									Register a Team
								</Link>
							)}
							<button
								onClick={handleSignOut}
								className="ml-4 rounded-full bg-slate-500 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-600"
							>
								Sign out
							</button>
							<div className="relative my-[-1rem] ml-4 h-8 w-8">
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
						<button onClick={() => setMenuOpen(!menuOpen)}>
							<MenuIcon />
						</button>
						<Link
							href="/"
							onClick={() => setMenuOpen(false)}
							className="pl-2 pr-4 text-xl font-bold text-zinc-800"
						>
							HackDLRC
						</Link>
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
							{timer != null && timer > 0 && (
								<div className="font-medium">⭐ 0</div>
							)}

							<button
								onClick={handleSignOut}
								className="ml-4 rounded-full bg-slate-500 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-600"
							>
								Sign out
							</button>
							<div className="relative my-[-1rem] ml-4 h-8 w-8">
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
			<nav className="flex w-max text-xl absolute h-[100dvh] rounded-r-lg flex-col bg-slate-200 px-4 pr-10 font-medium text-gray-700">
				<button onClick={() => setMenuOpen(false)} className='w-full pt-5 pb-2 px-1 flex'>
					<CloseIcon />
				</button>
				<Link
					onClick={() => setMenuOpen(false)}
					href="/"
					className="p-2"
				>
					Home
				</Link>
				{/* <hr className="w-full" /> */}
				{countdown != null && countdown > 0 && (
					<div className="flex w-full flex-col justify-center">
						<Link
							onClick={() => setMenuOpen(false)}
							className="p-2"
							href="https://forms.gle/RLTPQ8h9TQrzwJi5A"
						>
							Register a Team
						</Link>
						{/* <hr className="w-full" /> */}
					</div>
				)}
				{countdown != null && countdown > 0 && (
					<div className="flex w-full flex-col justify-center">
						<Link
							onClick={() => setMenuOpen(false)}
							href={'/sample'}
							className="p-2"
						>
							Sample Question
						</Link>
						{/* <hr className="w-full" /> */}
					</div>
				)}
				<Link
					onClick={() => setMenuOpen(false)}
					href="/sponsors"
					className="p-2"
				>
					Sponsors
				</Link>
				{/* <hr className="w-full" /> */}
				<Link
					onClick={() => setMenuOpen(false)}
					href="/leaderboard"
					className="p-2"
				>
					Leaderboard
				</Link>
				{/* <hr className="w-full" /> */}
				<Link
					onClick={() => setMenuOpen(false)}
					href="/help"
					className="p-2"
				>
					Help
				</Link>
			</nav>
		)
	}

	return (
		<>
			{!isMobile ? <LargeHeader /> : <SmallHeader />}
			{menuOpen && <HamburgerMenu />}
		</>
	)
}
