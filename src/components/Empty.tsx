import { Link } from 'react-router-dom';

import { ReactComponent as EmptyCart } from '../assets/svgs/empty-cart.svg'

type EmptyProps = {
   text: string, 
}

const Empty : React.FC<EmptyProps> = ({ text }) => {
    return (
        <div className='flex flex-col space-y-4 justify-center items-center w-full h-96'>
                    <EmptyCart className='w-60' />
                    <h3 className='text-2xl'>{ text }</h3>
                    <Link className='btn btn-primary' to="/">View products</Link>
                </div>
    )
}

export default Empty