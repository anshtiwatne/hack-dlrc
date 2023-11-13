import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SizeContextProvider } from '@/lib/utils/size'
import { TimeContextProvider } from '@/lib/firebase/time'
import { AuthContextProvider } from '@/lib/firebase/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	metadataBase: new URL('https://hack.dlrc.in'),
	title: 'HackDLRC',
	description: 'A DLRC hackathon open to all created Ansh Tiwatne and Aneesh Bhave.',
	openGraph: {
		type: 'website',
		url: 'https://hack.dlrc.in',
		siteName: 'HackDLRC',
		images: '/poster.webp'
	},
	twitter: {
		images: '/poster.webp',
		description: 'A DLRC hackathon open to all created Ansh Tiwatne and Aneesh Bhave.',
		creator: '@ansht_',
	},
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
