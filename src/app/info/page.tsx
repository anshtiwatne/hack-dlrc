'use client'

import Link from 'next/link'
import MailIcon from '@mui/icons-material/MailRounded'
import PhoneIcon from '@mui/icons-material/PhoneRounded'
import { displaySize } from '@/lib/utils/size'
import { SizeProps } from '@/lib/utils/types'

export default function Info() {
	const { isMobile } = displaySize() as SizeProps

	return (
		<div className='flex flex-col flex-grow items-center text-lg text-gray-800 py-2 px-4 overflow-y-scroll'>
			<div className='flex flex-col py-5 w-full max-w-5xl'>
				<div className='text-2xl font-medium text-gray-800 pb-2'>About</div>
				<div className='py-2'>HackDLRC is a hackathon hosted by Ansh Tiwatne and Aneesh Bhave.</div>
				<div className='py-2'>Being an online event, it is open to anyone anywhere. You can participate individually by signing in on this website or as a team through this <Link className='text-blue-600' href='https://forms.gle/RLTPQ8h9TQrzwJi5A'>Google Form</Link>.</div>
			</div>
			<div className='flex flex-col py-5 w-full max-w-5xl'>
				<div className='text-2xl font-medium text-gray-800 pb-2'>Contact Us</div>
				<div className='py-2'>At any given point in time before or during the hackathon, if you're stuck and need help, feel free to contact either one of us using the details below.</div>
				<div className={`pt-2 pb-1 flex ${isMobile ? 'flex-col' : 'items-center'}`}>
					<div className='text-xl font-medium text-gray-800'>Ansh:</div>
					<Link className='flex items-center' href='mailto:ansh.tiwatne@gmail.com'><MailIcon className={`text-gray-600 mr-1 ${isMobile ? '' : 'ml-2'}`} />ansh.tiwatne@gmail.com</Link>
					<Link className='flex items-center' href='tel:+91 9075055300'><PhoneIcon className={`text-gray-600 mr-1 ${isMobile ? '' : 'ml-2'}`} />+91 9075055300</Link>
				</div>
				<div className={`pt-2 pb-1 flex ${isMobile ? 'flex-col' : 'items-center'}`}>
					<div className='text-xl font-medium text-gray-800'>Aneesh:</div>
					<Link className='flex items-center' href='mailto:aneesh1701@gmail.com'><MailIcon className={`text-gray-600 mr-1 ${isMobile ? '' : 'ml-2'}`} />aneesh1701@gmail.com</Link>
					<Link className='flex items-center' href='tel:+91 9146196969'><PhoneIcon className={`text-gray-600 mr-1 ${isMobile ? '' : 'ml-2'}`} />+91 9146196969</Link>
				</div>
			</div>
			<div className='flex flex-col py-5 w-full max-w-5xl'>
				<div className='text-2xl font-medium text-gray-800 pb-2'>Solving Problems</div>
				<div className='py-2'>HackDLRC consists of 7 problems that get progressively harder.</div>
				<div className='py-2'>A beginner level <Link className='text-blue-600' href='/sample'>sample problem</Link> has been posted, you can also refer to the <Link className='text-blue-600' href='https://github.com/nouritsu/dlrc-hackathon-sample-solutions'>solution to the sample problem</Link> in your language.</div>
				<div className='py-2'>The input for a problem is accessed by clicking on the "Get Input" button on the page of the problem. Make sure your program does not depend on the number of lines in the input.</div>
				<div className='py-2'>In the embedded code editor this input can be pasted in the input section and read as regular STDIN through your code. In case that sounds unfamiliar, you can either save the input in a file and read from it in your own setup, or contact us for help.</div>
				<div className='py-2'>We recommend against using AI tools to earn points.</div>
			</div>
			<div className='flex flex-col py-5 w-full max-w-5xl'>
				<div className='text-2xl font-medium text-gray-800 pb-2'>Interpreting Information</div>
				<div className='py-2 pb-4'>Each problem comes with the name of the problem, the points associated with it, the description of the problem, a worked example, as well as additional information and resources that may help you solve the problem.</div>
				<div className='text-xl font-medium text-gray-800'>• Name</div>
				<div className='pl-4 pb-4'>Each problem is based on a subject taught at <Link className='text-blue-600' href='https://dlrc.in'>DLRC</Link>. The sample problem is a Math class for middle school.</div>
				<div className='text-xl font-medium text-gray-800'>• Points</div>
				<div className='pl-4 pb-4'>Solving each problem will award you a certain number of points. The <Link className='text-blue-600' href='/sample'>sample problem</Link> is worth 0 points.</div>
				<div className='text-xl font-medium text-gray-800'>• Description</div>
				<div className='pl-4 pb-4'>The description of each problem introduces the premise and provides the necessary details.</div>
				<div className='text-xl font-medium text-gray-800'>• Worked Example</div>
				<div className='pl-4 pb-4'>Participants can use the worked example to gain clarity on the structure of the question, inputs and expected answers. Note that the actual input of the problem will be much larger and unique to you.</div>
				<div className='text-xl font-medium text-gray-800'>• Additional Info</div>
				<div className='pl-4 pb-4'>This section contains information that can help programmers design their solution, like the most optimal data type to be used, assumptions that the program can make, etc.</div>
				<div className='text-xl font-medium text-gray-800'>• Resources</div>
				<div className='pl-4 pb-4'>Additional resources may be provided that allow the participant to gain clarity on keywords used in the problem. This ensures people without a computer science background but with programming knowledge can understand the problems.</div>
			</div>
			<div className='flex flex-col py-5 w-full max-w-5xl'>
				<div className='text-2xl font-medium text-gray-800 pb-2'>Supported Programming Languages</div>
				<div className='py-2'>The inbuilt text editor on the website allows a participant to use JavaScript, Python, Java, C/C++, C# and Go.</div>
				<div className='py-2'>Note that participants may choose to use their own language to solve the problem and obtain an answer. We recommend using a high level programming language that you are most comfortable with.</div>
				<div className='py-2'>However, creativity is encouraged, and we would love to feature solutions written in esoteric programming languages and ones that use non-conventional algorithms.</div>
			</div>
			<div className='flex flex-col py-5 w-full max-w-5xl'>
				<div className='text-2xl font-medium text-gray-800 pb-4'>Frequently Asked Questions</div>
				{/* <div className='py-2 pb-4'>Each problem comes with the name of the problem, the points associated with it, the description of the problem, a worked example, as well as additional information and resources that may help you solve the problem.</div> */}
				<div className='text-xl font-medium text-gray-800'>• Do I need a team to participate?</div>
				<div className='pl-4 pb-4'>No, you can participate individually or as a team of up to 4 members.</div>
				<div className='text-xl font-medium text-gray-800'>• Is there an age limit?</div>
				<div className='pl-4 pb-4'>No, the only requirement is being able to code in a language of your choice.</div>
				<div className='text-xl font-medium text-gray-800'>• The online editor does not support my language, what do I do?</div>
				<div className='pl-4 pb-4'>You need not use the online editor, the only thing that matters is obtaining the final answer and submitting it in the Answer box.</div>
				<div className='text-xl font-medium text-gray-800'>• Do I need to be a student in DLRC to participate?</div>
				<div className='pl-4 pb-4'>No, this event is open to all, including working professionals and teachers. Since it's online, programmers can participate from across the world.</div>
				<div className='text-xl font-medium text-gray-800'>• What is the requirement to get an award?</div>
				<div className='pl-4 pb-4'>Everyone who participates will get a certificate of participation along with rewards from our sponsors. You must be present and logged in on at least one of the hackathon days to be considered a participant.</div>
				<div className='text-xl font-medium text-gray-800'>• The FAQ does not include my question, what do I do?</div>
				<div className='pl-4 pb-4'>Feel free to contact us using the details above at any point in time.</div>
			</div>
		</div>
	)
}
