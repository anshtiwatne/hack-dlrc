import firebase from "firebase/compat/app"
import { Timestamp } from "firebase/firestore"

interface problemData {
    title: string
    points: number
    description: string
    example: string
    additionalInfo: string[]
    resources: Array<Object>
    input: string[]
    output: string[]
}

interface userData {
    uid: string
    inputID: number
    email: string
    phone: string
    name: string
    photoURL: string
    answers: Object
    points: number | null
    teamMembers: string[]
    lastLogin: Timestamp
}

interface AuthProps {
	user: firebase.User | null
	signInWithGoogle: () => Promise<void>
	signOut: () => Promise<void>
}

interface TimeProps {
	timer: number
	countdown: number
}

interface SizeProps {
	width: number
	height: number
    isMobile: boolean
}

export type { problemData, userData, AuthProps, TimeProps, SizeProps }
