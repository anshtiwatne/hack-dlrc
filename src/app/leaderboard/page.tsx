'use client'

import Image from 'next/image'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase/config'
import { userData } from '@/lib/utils/types'

export default function Leaderboard() {
	const [players, setPlayers] = useState([] as userData[])

	useEffect(() => {
		async function getPlayers() {
			const usersRef = query(
				collection(db, 'users'),
				orderBy('points', 'desc'),
			)
			const usersSnapshot = await getDocs(usersRef)
			const usersList = usersSnapshot.docs.map((doc) => doc.data())

			usersList.sort((a, b) => {
				if (a.points !== 100) return 1
				const timestampA = Number(a.answers?.finalboss?.timestamp)
				const timestampB = Number(b.answers?.finalboss?.timestamp)
			  
				return timestampA - timestampB
			})

			setPlayers(usersList as any)
		}
		getPlayers()
	}, [])

	return (
		<main className="flex h-full w-full flex-grow flex-col items-center justify-center">
			{/* some bug: scroll only works on h-1 */}
			<ol className="scroll flex h-1 w-full max-w-5xl flex-grow flex-col overflow-x-hidden overflow-y-scroll p-4 pr-6 pt-3">
				{players.map((player, i) => (
					<li
						key={i}
						className="profile-shadow my-2 ml-1 flex w-full items-center justify-between rounded bg-slate-100 py-2 pl-3 pr-4"
					>
						<div className="flex items-center">
							<div className="relative mr-2 h-8 w-8">
								<Image
									className="rounded-full"
									src={player?.photoURL as string}
									alt="Profile Picture"
									fill
								/>
							</div>
							<div className="font-medium text-gray-800">
								{player.name.replace(
									/(^\w{1})|(\s+\w{1})/g,
									(letter) => letter.toUpperCase(),
								)}
								{/* title case */}
							</div>
						</div>
						<div className="font-semibold flex items-center">
							{player.teamName && (
								<div className='text-gray-800 pr-4 font-normal'>{player.teamName}</div>
							)}
							{player.points !== null ? (
								<div className='text-gray-800'>⭐ {player.points}</div>
							) : (
								<div className='text-gray-600'>organizer</div>
							)}
						</div>
					</li>
				))}
			</ol>
		</main>
	)
}
