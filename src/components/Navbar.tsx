import Link from 'next/link'
import { Open_Sans } from 'next/font/google'
import { userAuth } from '@/lib/firebase/auth'
import firebase from 'firebase/compat/app'
import { db } from '@/lib/firebase/config'
import { getDoc, doc, setDoc } from 'firebase/firestore'

const openSans = Open_Sans({ subsets: ['latin'] })

interface AuthProps {
	user: firebase.User | null
	signInWithGoogle: () => Promise<void>
	signOut: () => Promise<void>
}

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

export default function Navbar() {
	const { user, signInWithGoogle, signOut } = userAuth() as AuthProps

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

	return (
		<header>
			<div
				className={`${openSans.className} flex items-center justify-between p-4`}
			>
				<nav className="flex items-center text-zinc-500">
					<Link href="/" className="px-2 pr-8 text-xl font-bold text-zinc-800">
						HackDLRC
					</Link>
					<Link href="/leaderboard" className="px-2">
						Leaderboard
					</Link>
					<Link href="/help" className="px-2">
						Help
					</Link>
				</nav>

				<div className="absolute left-1/2 -translate-x-1/2 transform text-xl font-bold text-zinc-700">
					48:00:00
				</div>

				{!user ? (
					<nav className="flex items-center text-zinc-600">
						<button
							onClick={handleSignIn}
							className="ml-4 rounded bg-slate-500 px-2 py-1 text-sm font-semibold text-white hover:bg-slate-600"
						>
							Sign in with Google
						</button>
					</nav>
				) : (
					<nav className="flex items-center text-zinc-600">
						<div className="px-2">Hello {'Ansh'}</div>
						<div className="px-2 font-semibold">⭐ 30</div>
						<button
							onClick={handleSignIn}
							className="ml-4 rounded bg-slate-500 px-2 py-1 text-sm font-semibold text-white hover:bg-slate-600"
						>
							Sign out
						</button>
					</nav>
				)}
			</div>
			<hr />
		</header>
	)
}
