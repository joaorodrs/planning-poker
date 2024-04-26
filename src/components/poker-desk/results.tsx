import { motion } from 'framer-motion'

import Card from '@/components/deck/card'
import { Voting } from '@/types'
import { useMemo } from 'react'

type Props = {
  votings: Voting[]
}

function Results({ votings }: Props) {
  const average = parseFloat((votings.reduce((prev, curr) => prev + curr.vote, 0) / votings.length).toFixed(1))

  const uniqueCardsVotings = useMemo(() => {
    return votings.filter((item, idx, array) => array.findIndex(v => v.vote === item.vote) === idx)
  }, [votings])

  return (
    <motion.div
      key="results"
      className="mt-8 flex justify-between px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <h1 className="text-lg">Média:</h1>
        <div className="m-auto w-fit mt-4">
          <Card
            isSelected
            isDisabled
            value={average}
            onSelectCard={() => undefined}
          />
        </div>
      </div>
      <div className="flex flex-wrap align-center justify-center w-full">
        <CardResult votings={uniqueCardsVotings} />
      </div>
    </motion.div>
  )
}

type CardResultProps = {
  votings: Voting[];
}

function CardResult({ votings }: CardResultProps) {
  function getVotesAmount(vote: number) {
    return votings.filter(item => item.vote === vote).length
  }

  return votings.map(vote => (
    <div>
      <Card
        isSelected={false}
        value={vote.vote}
        isDisabled={false}
        onSelectCard={() => undefined}
        className="cursor-none"
      />
      <span>{getVotesAmount(vote.vote)} voto{getVotesAmount(vote.vote) > 1 ? 's' : ''}</span>
    </div>
  ))
}

export default Results
