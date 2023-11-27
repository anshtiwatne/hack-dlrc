'use client'

import { JetBrains_Mono } from "next/font/google"
import { problemData, userData } from "@/lib/utils/types"
import { userAuth } from "@/lib/firebase/auth"
import { collection, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import { useEffect, useState } from "react"
import Link from "next/link"
import encryptEmail from "@/lib/utils/final"

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] })

function Submit({
	userData,
    isLoading
}: {
	userData: userData | null
    isLoading: boolean
}) {
	const { user } = userAuth()
    
	if (!user || isLoading) return <div>Loading...</div>
    
	const userRef = doc(collection(db, 'users'), user?.uid)
	const [answer, setAnswer] = useState('')
	const [answerTimeout, setAnswerTimeout] = useState<number>(0)

	useEffect(() => {
		let intervalId: NodeJS.Timeout

		if (answerTimeout > 0) {
			intervalId = setInterval(() => {
				setAnswerTimeout((prevTimeout) => prevTimeout - 1)
			}, 1000)
		}

		return () => {
			clearInterval(intervalId)
		}
	}, [answerTimeout])

	// function handleSubmit() {
    //     alert('submitted, you can resubmit if you want to change your answer, we will verify your final answer and update your score accordingly')
    //     const newAnswers = userData?.answers as any
    //     newAnswers['finalboss'] = {answer: answer, timestamp: serverTimestamp()}
    //     setDoc(userRef, 
    //         {answers: newAnswers}, {merge: true}
    //     )
    //     setAnswer('')
	// }

    function handleSubmit() {
        if (answer == encryptEmail(user?.email as string)) {
            if (!userData?.answers || !userData?.answers['finalboss'] || userData?.answers['finalboss'].answer != encryptEmail(user?.email as string)) {
                const newAnswers = userData?.answers as any
                newAnswers['finalboss'] = {answer: answer, timestamp: serverTimestamp()}
                setDoc(userRef, 
                    {answers: newAnswers}, {merge: true}
                )
                setDoc(userRef, {points: userData?.points as number + 15}, {merge: true})
                alert('correct')
                setAnswer('')

            } else {
                alert('you\'ve already got this right')
            }
        } else {
            alert('incorrect')
        }
    
    }

	return (
		<div className="inline-block w-96 py-4">
			<div className="flex w-full">
				<div className="flex flex-grow items-center justify-center text-sm">
					<div className="flex flex-grow">
                        <Link
						    href={'https://firebasestorage.googleapis.com/v0/b/hack-dlrc.appspot.com/o/inputs%2Fq7%2Fmapping.json?alt=media&token=37c96934-d4e0-4954-8956-79002ae1dee1'}
						    target="_blank"
						    className="whitespace-nowrap rounded-full bg-slate-500 px-4 py-2 font-semibold text-white hover:bg-slate-600"
					    >
						Get Mapping
					    </Link>
						<input
							name='answer'
							autoComplete='off'
							value={answer}
							onChange={(e) => setAnswer(e.currentTarget.value)}
							className={`ml-4 w-full rounded-l-full bg-slate-200 px-4 py-2 font-medium text-gray-900 outline-none ${
								answerTimeout > 0
									? 'cursor-not-allowed bg-slate-300'
									: ''
							}`}
							type="text"
							placeholder={
								answerTimeout > 0 ? 'Incorrect' : 'Encrypted Email'
							}
							disabled={answerTimeout > 0 ? true : false}
						/>
						<button
							onClick={
								answerTimeout > 0 ? () => {} : handleSubmit
							}
							className={`whitespace-nowrap rounded-r-full bg-slate-500 px-4 py-2 font-semibold text-white ${
								answerTimeout > 0
									? 'cursor-not-allowed'
									: 'hover:bg-slate-600'
							}`}
						>
							{answerTimeout > 0 ? (
								<span className="px-4 font-mono">
									{answerTimeout.toString().padStart(2, '0')}
								</span>
							) : (
								'Submit'
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function Q7() {

    const { user } = userAuth()
    const [userData, setUserData] = useState<userData | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        async function getUserData() {
            if (user) {
                const userRef = doc(collection(db, 'users'), user?.uid)
                const userDoc = await getDoc(userRef)
                const userData = userDoc.data()
                setUserData(userData as userData)
                setIsLoading(false)
            }
        }
        getUserData()
    }, [user])

    return (
        <div className="px-8 py-4 flex flex-grow flex-col overflow-y-scroll">
            <div className="text-gray-900 text-[1.125rem] font-medium">
                Impressive Work! We wanted to store participant emails securely in our database. But we forgot to encrypt them (no joke) and we're relying on you to code an encryption algorithm based on the pseudocode given below. The final answer is your email encrypted by the algorithm below.
            </div>
            <br />
            <div className={`${jetBrainsMono.className} self-center`}>
                <div>
                    // Map_F(c) : takes a character c and returns the cesar cipher of the character<br />
                    // Map_B(c) : takes the ciphered character c and returns deciphered character<br />
                    // Hexify(i) : takes integer i and returns a string representing i in base 16 (without any prefix)<br />
                    // Prime(n) : takes integer n and returns the n-th prime number (2 is the 0th prime)<br />
                    // Ascii(c) : takes character c and returns its ASCII value<br />
                    // Append(a, x): takes an array a and a value x and appends x to a<br />
                    // Join(a, s): takes an array a and a string s and returns a string s with each element in a joined with s<br />
                </div>
                <br />
                <div>
                DECLARE UserEmail : STRING<br />
                INPUT UserEmail<br />
                <br />
                DECLARE StepOne : STRING<br />
                FOR Character IN UserEmail:<br />
                    StepOne = StepOne + Map_F(Character)<br />
                ENDFOR<br />
                <br />
                DECLARE StepTwo : ARRAY OF INTEGER<br />
                FOR Character IN StepOne:<br />
                    I = Ascii(Character) - 32<br />
                    Append(StepTwo, Prime(I))<br />
                ENDFOR<br />
                <br />
                DECLARE StepThree : ARRAY OF STRING<br />
                FOR Element IN StepTwo:<br />
                    Append(StepThree, Hexify(Element))<br />
                ENDFOR<br />
                <br />
                DECLARE StepFour : STRING<br />
                StepFour = Join(StepThree, "-")<br />
                <br />
                DECLARE StepFive : STRING<br />
                FOR Character in StepFour:<br />
                    StepFive = StepFive + Map_B(Character)<br />
                ENDFOR<br />
                <br />
                OUTPUT StepFive<br />
                </div>
            </div>
            <div className="flex flex-grow items-center justify-center pt-10 text-gray-800">
                <div className="pr-1 text-gray-900">Your email:</div>
                <div className="font-semibold">{user?.email}</div>
            </div>
            <div className="flex flex-grow justify-center w-full">
                <Submit
                    userData={userData}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}