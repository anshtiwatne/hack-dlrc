'use client'

import Image from 'next/image'
import { displaySize } from '@/lib/utils/size'
import { SizeProps } from '@/lib/utils/types'
// import { Main } from '@/components/Main'

function Sponsor({ imgSrc, imgAlt, description, text }: { imgSrc: string, imgAlt: string, description:string, text: string }) {
    const { isMobile } = displaySize() as SizeProps
    
    return (
        <div className="flex w-full flex-col items-center">
            <div className="relative h-12 w-full mr-2">
                <Image
                    src={imgSrc}
                    alt={imgAlt}
                    fill
                    style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 0 }}
                />
            </div>
            <div className={`font-medium ${isMobile ? 'px-2' : 'px-[3dvw]'} py-2 text-gray-600`}>
                {description}
            </div>
            <div className={`font-medium ${isMobile ? 'px-2' : 'px-[3dvw]'} py-2 text-gray-600`}>
                {text}
            </div>
        </div>
    )
}

export default function Sponsors() {
    const { isMobile } = displaySize() as SizeProps

	return (
		<main className="flex flex-grow items-center flex-col px-5 overflow-y-scroll">
            <div className={`pt-5 font-light text-gray-600 ${!isMobile ? 'text-4xl' : 'text-[7dvw]'}`}>Our Amazing Sponsors</div>
            {!isMobile ? (
                <div className='flex flex-grow items-center flex-col justify-evenly pt-5 pb-8'>
                    <div className='flex w-full py-5'>
                        <Sponsor imgSrc='stckme.png' imgAlt='stck.me logo' description='The best place for writers to earn money from their fans. Start selling your stories, e-books, essays, poetry, and more!' text="They're sponsoring each participant with a ₹5000 giftable stck.me pro membership!" />
                        <Sponsor imgSrc='interviewcake.svg' imgAlt='Interview Cake logo' description='Interview Cake is a study tool that preps software engineering candidates for programming interviews.' text="They're sponsoring each participant with a $249 Interview Cake full course!" />
                    </div>
                    <div className='flex w-full py-5'>
                        <Sponsor imgSrc='github.svg' imgAlt='GitHub logo' description="GitHub, Inc is a platform and cloud-based service for software development and version control using Git." text="They're providing each participant with a GitHub sticker!" />
                        <Sponsor imgSrc='aops.webp' imgAlt='AoPS logo' description="Art of Problem Solving (AoPS) develops educational opportunities for many of the most eager students in the world." text="They're providing the top 4 winners with a $25 AoPS giftcard!" />
                    </div>
                </div>
            ) : (
                <div className='flex flex-grow items-center pb-10 max-w-lg flex-col'>
                    <div className='py-5'><Sponsor imgSrc='stckme.png' imgAlt='stck.me logo' description='The best place for writers to earn money from their fans. Start selling your stories, e-books, essays, poetry, and more!' text="They're sponsoring each participant with a ₹5000 giftable stck.me pro membership!" /></div>
                    <div className='py-5'><Sponsor imgSrc='interviewcake.svg' imgAlt='Interview Cake logo' description='Interview Cake is a study tool that preps software engineering candidates for programming interviews.' text="They're sponsoring each participant with a $249 Interview Cake full course!" /></div>
                    <div className='py-5'><Sponsor imgSrc='github.svg' imgAlt='GitHub logo' description="GitHub, Inc is a platform and cloud-based service for software development and version control using Git." text="They're providing each participant with a GitHub sticker!" /></div>
                    <div className='py-5'><Sponsor imgSrc='aops.webp' imgAlt='AoPS logo' description="Art of Problem Solving (AoPS) develops educational opportunities for many of the most eager students in the world." text="They're providing the top 4 winners with a $25 AoPS giftcard!" /></div>
                </div>
            )}
		</main>
	)
}
