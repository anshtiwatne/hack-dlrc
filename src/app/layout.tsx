import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SizeContextProvider } from '@/lib/utils/size'
import { TimeContextProvider } from '@/lib/firebase/time'
import { AuthContextProvider } from '@/lib/firebase/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'HackDLRC',
	description: 'The DLRC community hackathon',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} overflow-hidden`}>
				<SizeContextProvider>
				<TimeContextProvider>
				<AuthContextProvider>
					{children}
				</AuthContextProvider>
				</TimeContextProvider>
				</SizeContextProvider>
			</body>
		</html>
	)
}
