import React from 'react';

import { ReactComponent as StarSolid } from '../assets/svgs/star-solid.svg'
import { ReactComponent as StarOutline } from '../assets/svgs/star-outline.svg'

type RatingStarsProps = {
    rating: {
        rate: number,
        count: number
    };
};

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating.rate);

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars.push(<StarSolid key={i} className='w-4 fill-primary' />)
        } else {
            stars.push(<StarOutline key={i} className='w-4 stroke-primary' />)
        }
    }

    return <div className='flex items-center'>
        <div className='inline-flex items-center'>{stars}</div>
        <span className="text-gray-500 font-medium ml-1">({rating.count})</span>
    </div>;
};

export default RatingStars;
