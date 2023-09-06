import { motion } from "framer-motion";

import { ReactComponent as Heart } from '../assets/svgs/heart.svg'

type FavouriteButtonProps = {
    isFavourited?: boolean;
    toggleFavourite: () => void
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ isFavourited, toggleFavourite }) => {
    return <motion.button
        className="absolute top-4 right-2"
        initial={{ opacity: 0.6 }}
        whileTap={{ scale: 1.5 }}
        whileInView={{ opacity: 1 }}
        onClick={toggleFavourite}
    >
        <Heart className={`${isFavourited ? 'fill-red-500 stroke-transparent' : 'fill-transparent'} w-6`} />
    </motion.button>
}

export default FavouriteButton