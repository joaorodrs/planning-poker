import { motion } from 'framer-motion'

import Card from "./card"

type Props = {
  cardSelected?: number;
  onSelectCard(value?: number): void;
  isDisabled: boolean;
  showCards: boolean;
}

const variants = {
  hidden: {
    transition: {
      stiffness: 100
    }
  },
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  },
}

const card = {
  hidden: { opacity: 0.7, rotateY: '90deg' },
  visible: { opacity: 1, rotateY: '0deg' }
}

const Deck = ({ cardSelected, isDisabled, showCards, onSelectCard }: Props) => {
  return (
    <motion.div
      className="absolute mt-20 pb-10 top-[60%] left-0 right-0 md:bottom-0 md:top-auto"
    >
      {!showCards && <h1 className="mb-4">Escolha sua carta</h1>}

      <motion.div
        className="flex flex-wrap justify-center"
        variants={variants}
        animate={!showCards ? 'visible' : 'hidden'}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30].map(item => (
          <motion.div
            key={String(item)}
            initial={{ rotateY: '90deg' }}
            variants={card}
          >
            <Card
              value={item}
              isSelected={item === cardSelected}
              onSelectCard={onSelectCard}
              isDisabled={isDisabled}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Deck
