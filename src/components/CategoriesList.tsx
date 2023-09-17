import { useEffect, useState } from 'react'
import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

type CategoriesListProps = {
  categories: Array<string>,
  selectCategory: (category: string) => void,
  selectedCategory: string | null,
}

const CategoriesList: React.FC<CategoriesListProps> = ({ categories, selectCategory, selectedCategory }) => {
  // Set the initial state based on the window width (sm screens upwards: isOpen=true, others: isOpen=false)
  const [isOpen, setIsOpen] = useState<boolean>(window.innerWidth >= 640);

  // Update isOpen state based on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 640);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.aside
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className={`${isOpen ? 'h-auto max-h-96 pb-8' : 'h-14'} transition duration-200 space-y-4 overflow-hidden sticky top-[5.2rem] py-1 sm:pb-20 sm:top-24 sm:h-[85vh] bg-white z-20`}
    >
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex justify-between items-center cursor-pointer border py-2 px-5 rounded-3xl bg-white'
      >
        <h3 className='text-xl font-semibold'>Categories</h3>
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 }
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <svg width="15" height="15" viewBox="0 0 20 20">
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </motion.div>
      </motion.button>
      <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05
            }
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3
            }
          }
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        className="max-h-80 sm:block h-auto overflow-scroll p-2 border rounded-3xl bg-white space-y-2"
      >
        <motion.li variants={itemVariants}>
          <button
            onClick={() => selectCategory('')}
            className="w-full text-left block py-1.5 px-4 text-lg capitalize transition duration-200 rounded-3xl active:font-bold hover:bg-primary/20 hover:text-primary active:text-primary"
          >
            All Categories
          </button>
        </motion.li>
        {
          categories?.map((category) => (
            <motion.li key={category} variants={itemVariants}>
              <button
                onClick={() => selectCategory(category)}
                className={`w-full text-left block py-1.5 px-4 text-lg capitalize transition duration-200 rounded-3xl active:font-bold ${selectedCategory === category ? 'bg-primary/20 text-primary font-semibold' : 'hover:bg-primary/20 hover:text-primary active:text-primary'}`}
              >
                {category}
              </button>
            </motion.li>
          ))
        }

      </motion.ul>
    </motion.aside>
  )
}

export default CategoriesList