import { useContext, createContext, useEffect, useState } from 'react'
import {
	signInWithPopup,
	onAuthStateChanged,
	GoogleAuthProvider,
} from 'firebase/auth'
import { auth } from '@/lib/firebase/config'

const AuthContext = createContext({})

export function AuthContextProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [user, setUser] = useState({})

	function signInWithGoogle() {
		const provider = new GoogleAuthProvider()

		try {
			signInWithPopup(auth, provider)
		} catch (error) {
			console.error('Error signing in with Google', error)
		}
	}

	function signOut() {
		try {
			auth.signOut()
		} catch (error) {
			console.error('Error signing out with Google', error)
		}
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				setUser(currentUser)
			} else {
				setUser({})
			}
		})
		return () => unsubscribe()
	}, [user])

	return (
		<AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
			{children}
		</AuthContext.Provider>
	)
}

export function userAuth() {
	return useContext(AuthContext)
}
