export const fadeInList = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  }

  export const fadeInListItem = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }
  
  export const slideInListItem = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
  }
  