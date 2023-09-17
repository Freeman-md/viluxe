import { ReactNode } from 'react'
import { ReactComponent as InformationCircle } from '../assets/svgs/information-circle.svg'

type InfoCardProps = {
    title?: string,
    children?: ReactNode
}

const InfoCard: React.FC<InfoCardProps> = ({ title = 'Information', children }) => {
    return (
        <div className='space-y-2 bg-blue-300/50 text-blue-800 p-2'>
            <div className='flex space-x-2 items-center'>
                <InformationCircle />
                <h6 className='font-semibold'>{title}</h6>
            </div>

            {children}
        </div>
    )
}

export default InfoCard