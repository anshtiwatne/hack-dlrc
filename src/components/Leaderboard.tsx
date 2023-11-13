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
			const usersRef = query(collection(db, 'users'), orderBy('points', 'desc'))
			const usersSnapshot = await getDocs(usersRef)
			const usersList = usersSnapshot.docs.map((doc) => doc.data())
			setPlayers(usersList as any)
		}
		getPlayers()
	}, [])

	return (
		<div className="flex h-full w-full flex-grow items-center justify-center overflow-y-scroll">
			<ol className="flex h-full w-full max-w-5xl flex-grow flex-col p-4 pr-6">
				{players.map((player, i) => (
					<li
						key={i}
						className="my-2 ml-1 flex w-full items-center justify-between rounded bg-slate-100 py-2 pl-3 pr-4 profile-shadow"
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
								{player.name}
							</div>
						</div>
						<div className="font-semibold text-gray-800">
							{player.points !== null ? <div>⭐ {player.points}</div> : ""}
						</div>
					</li>
					
				))}
			</ol>
		</div>
	)
}
