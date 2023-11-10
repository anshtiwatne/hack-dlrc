import MailIcon from '@mui/icons-material/MailRounded'
import PhoneIcon from '@mui/icons-material/PhoneRounded'
import Link from 'next/link'
import { displaySize } from '@/lib/utils/size'

interface SizeProps {
    width: number
    height: number
}

function Contact({name, email, phone}: {name: string, email: string, phone: string}) {
    return (
        <div className="flex flex-col items-center px-4">
            <div className='font-semibold text-xl text-gray-600'>{name}</div>
            <div className='flex flex-col items-center font-light text-lg text-gray-800'>
                <Link href={`mailto:${email}`}><MailIcon className='mx-2' />{email}</Link>
                <Link href={`tel:${phone}`}><PhoneIcon className='mx-2' />{phone}</Link>
            </div>
        </div>
    )
}

export default function Help() {
    const { width } = displaySize() as SizeProps
    return (
        <div className="flex flex-col justify-center items-center h-full px-6 py-4">
            <div className="text-xl text-gray-800">In case you run into any issues during the hackathon, feel free to contact one of us using the details below</div>
            {width > 1100 ? (
                <div className="flex pt-10">
                    <Contact name='Ansh' email='ansh.tiwatne@gmail.com' phone='+91 9075055300'/>
                    <Contact name='Aneesh' email='aneesh1701@gmail.com' phone='+91 9146196969'/>
                </div>
            ) : (
                <div className="flex flex-col pb-10 flex-grow justify-evenly">
                    <div className=''><Contact name='Ansh' email='ansh.tiwatne@gmail.com' phone='+91 9075055300'/></div>
                    <div className=''><Contact name='Aneesh' email='aneesh1701@gmail.com' phone='+91 9146196969'/></div>
                </div>
            )}
            
        </div>
    )
}