type RatingStarsProps = {
    rating: number
}

const RatingStars : React.FC<RatingStarsProps> = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(5);

    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={i} className="text-yellow-500">★</span>);
    }

    if (rating - fullStars >= 0.5) {
        stars.push(<span key="half" className="text-yellow-500">½</span>);
    }

    return <>
        {stars}
    </>;
}

export default RatingStars