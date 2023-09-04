import React from 'react';

import { ReactComponent as StarSolid } from '../assets/svgs/star-solid.svg'
import { ReactComponent as StarOutline } from '../assets/svgs/star-outline.svg'

type RatingStarsProps = {
    rating: number;
};

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars.push(<StarSolid className='w-4 fill-primary' />)
        } else {
            stars.push(<StarOutline className='w-4 stroke-primary' />)
        }
    }

    return <div className='inline-flex items-center'>{stars}</div>;
};

export default RatingStars;
