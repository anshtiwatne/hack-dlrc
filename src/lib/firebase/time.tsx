'use client'

import { useContext, createContext, useEffect, useState } from 'react'
import { Timestamp } from 'firebase/firestore'

const TimeContext = createContext({})
new Date(Timestamp.now().seconds * 1000)

export function TimeContextProvider({ children }: { children: React.ReactNode }) {
    const [timer, setTimer] = useState<number | null>(null)
    const [countdown, setCountdown] = useState<number | null>(null)

    const startDate = new Date('2023-11-24T00:17:00.000+05:30') // 24th Nov 5pm IST
	const endDate = new Date('2023-11-26T00:17:00.000+05:30') // 26th Nov 5pm IST

	useEffect(() => {
		if (startDate > new Date(Timestamp.now().seconds * 1000)) {
			const interval = setInterval(() => {
				const now = new Date(Timestamp.now().seconds * 1000)
				setCountdown((startDate as any) - (now as any))
			}, 1000)
			return () => clearInterval(interval)
		} else {
			setCountdown(0)
			if (endDate > new Date(Timestamp.now().seconds * 1000)) {
				const interval = setInterval(() => {
					const now = new Date(Timestamp.now().seconds * 1000)
					setTimer((endDate as any) - (now as any))
				}, 1000)
				return () => clearInterval(interval)
			}
		}
	}, [])

    return (
        <TimeContext.Provider value={{ timer, countdown }}>
            {children}
        </TimeContext.Provider>
    )
}

export function serverTime() {
    return useContext(TimeContext)
}