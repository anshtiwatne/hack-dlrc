import { useContext, createContext, useEffect, useState } from 'react'
import {
	signInWithPopup,
	onAuthStateChanged,
	GoogleAuthProvider,
} from 'firebase/auth'
import { auth } from './config'

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
		onAuthStateChanged(auth, (currentUser) => {
			if (currentUser == null || !('uid' in currentUser)) {
				setUser(currentUser as Object | any)
			} else {
				setUser({})
			}
		})
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
