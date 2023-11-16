'use client'

import MailIcon from '@mui/icons-material/MailRounded'
import PhoneIcon from '@mui/icons-material/PhoneRounded'
import Link from 'next/link'
import { displaySize } from '@/lib/utils/size'
import { SizeProps } from '@/lib/utils/types'

function Contact({
	name,
	email,
	phone,
}: {
	name: string
	email: string
	phone: string
}) {
	return (
		<div className="flex flex-col items-center px-4">
			<div className="text-xl font-semibold text-gray-600">{name}</div>
			<div className="flex flex-col items-center text-lg font-light text-gray-800">
				<Link href={`mailto:${email}`}>
					<MailIcon className="mx-2" />
					{email}
				</Link>
				<Link href={`tel:${phone}`}>
					<PhoneIcon className="mx-2" />
					{phone}
				</Link>
			</div>
		</div>
	)
}

export default function Help() {
	const { isMobile } = displaySize() as SizeProps
	return (
		<main className="flex h-full flex-col items-center justify-center px-6 py-4">
			<div className="text-xl text-gray-800">
				In case you run into any issues during the hackathon, feel free
				to contact one of us using the details below
			</div>
			{!isMobile ? (
				<div className="flex pt-10">
					<Contact
						name="Ansh"
						email="ansh.tiwatne@gmail.com"
						phone="+91 9075055300"
					/>
					<Contact
						name="Aneesh"
						email="aneesh1701@gmail.com"
						phone="+91 9146196969"
					/>
				</div>
			) : (
				<div className="flex flex-grow flex-col justify-evenly pb-10">
					<div className="">
						<Contact
							name="Ansh"
							email="ansh.tiwatne@gmail.com"
							phone="+91 9075055300"
						/>
					</div>
					<div className="">
						<Contact
							name="Aneesh"
							email="aneesh1701@gmail.com"
							phone="+91 9146196969"
						/>
					</div>
				</div>
			)}
		</main>
	)
}
