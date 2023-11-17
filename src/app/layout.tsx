import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SizeContextProvider } from '@/lib/utils/size'
import { TimeContextProvider } from '@/lib/firebase/time'
import { AuthContextProvider } from '@/lib/firebase/auth'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	metadataBase: new URL('https://hack.dlrc.in'),
	title: 'HackDLRC',
	description: 'A DLRC hackathon open to all created Ansh Tiwatne and Aneesh Bhave.',
	openGraph: {
		type: 'website',
		title: 'HackDLRC',
		url: 'https://hack.dlrc.in',
		siteName: 'HackDLRC',
		images: '/poster.webp'
	},
	twitter: {
		title: 'HackDLRC',
		description: 'A DLRC hackathon open to all created Ansh Tiwatne and Aneesh Bhave.',
		images: '/poster.webp',
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
			<body className={`${inter.className} overflow-hidden h-[100dvh] flex flex-col`}>
				<SizeContextProvider>
				<TimeContextProvider>
				<AuthContextProvider>
					<Header />
					{children}
				</AuthContextProvider>
				</TimeContextProvider>
				</SizeContextProvider>
			</body>
		</html>
	)
}
