'use client'

import Image from 'next/image'
import { displaySize } from '@/lib/utils/size'

interface SizeProps {
    width: number
    height: number
}

function Sponsor({ imgSrc, imgAlt, description, text }: { imgSrc: string, imgAlt: string, description:string, text: string }) {
    return (
        <div className="flex w-full flex-col items-center">
            <div className="relative h-12 w-full">
                <Image
                    src={imgSrc}
                    alt={imgAlt}
                    fill
                    objectFit='contain'
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
            <div className='font-medium px-4 py-2 text-gray-600'>
                {description}
            </div>
            <div className='font-medium px-4 py-2 text-gray-600'>
                {text}
            </div>
        </div>
    )
}

export default function Sponsors() {
    const { width, height } = displaySize() as SizeProps

	return (
		<div className="flex h-full items-center flex-col px-5 overflow-y-scroll">
            <div className={`pt-5 font-light text-gray-600 ${width > 1100 ? 'text-4xl' : 'text-[7dvw]'}`}>Our Amazing Sponsors</div>
            {width > 1100 ? (
                <div className='flex flex-grow items-center pb-10'>
                    <Sponsor imgSrc='stckme.png' imgAlt='stck.me logo' description='The best place for writers to earn money from their fans. Start selling your stories, e-books, essays, poetry, and more!' text="They're sponsoring each participant with a ₹5000 giftable stck.me pro membership!" />
                    <Sponsor imgSrc='interviewcake.svg' imgAlt='Interview Cake logo' description='Interview Cake is a study tool that preps software engineering candidates for programming interviews.' text="They're sponsoring each participant with a $249 Interview Cake full course!" />
                    <Sponsor imgSrc='github.svg' imgAlt='GitHub logo' description="GitHub, Inc is a platform and cloud-based service for software development and version control using Git." text="They're providing each participant with a GitHub sticker!" />
                </div>
            ) : (
                <div className='flex flex-grow items-center pb-10 max-w-lg flex-col'>
                    <div className='py-5'><Sponsor imgSrc='stckme.png' imgAlt='stck.me logo' description='The best place for writers to earn money from their fans. Start selling your stories, e-books, essays, poetry, and more!' text="They're sponsoring each participant with a ₹5000 giftable stck.me pro membership!" /></div>
                    <div className='py-5'><Sponsor imgSrc='interviewcake.svg' imgAlt='Interview Cake logo' description='Interview Cake is a study tool that preps software engineering candidates for programming interviews.' text="They're sponsoring each participant with a $249 Interview Cake full course!" /></div>
                    <div className='py-5'><Sponsor imgSrc='github.svg' imgAlt='GitHub logo' description="GitHub, Inc is a platform and cloud-based service for software development and version control using Git." text="They're providing each participant with a GitHub sticker!" /></div>
                </div>
            )}
		</div>
	)
}