import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
	apiKey: 'AIzaSyCBHUFCh8uhn1vIW3b9EpQV7qAzAEHT2Oo',
	authDomain: 'hack-dlrc.firebaseapp.com',
	projectId: 'hack-dlrc',
	storageBucket: 'hack-dlrc.appspot.com',
	messagingSenderId: '331587865815',
	appId: '1:331587865815:web:d8dd1daef0c3d1ceceb492',
	measurementId: 'G-KZZ2TZ0JZQ',
}

const app = initializeApp(firebaseConfig)
// export const analytics = getAnalytics(app)
export const db = getFirestore(app)
export const auth = getAuth(app)
