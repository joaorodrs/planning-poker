import { useCallback, useMemo, useEffect, useState } from "react"
import { AnimatePresence, motion } from 'framer-motion'
import useAuth from "@/hooks/useAuth"
import useCollection from "@/hooks/useCollection"
import { User, Voting } from "@/types"
import { onSnapshot } from "firebase/firestore"
import { useParams } from "react-router-dom"
import Card from "./card"

type Props = {
  users: User[]
  showCards?: boolean;
  onToggleShowCards(reveal: boolean): void;
  creator?: string;
}

const PokerDesk = ({ users = [], showCards = false, creator, onToggleShowCards }: Props) => {
  const params = useParams() as { token: string }
  const { user } = useAuth()
  const { collectionRef } = useCollection("voting")
  const [votings, setVotings] = useState<Voting[]>([])

  const firstFiveUsers = users.slice(0, 5)
  const lastFiveUsers = users.slice(6, 10)

  const getVote = useCallback((userId: string) => {
    return votings.find(item => item.userId === userId)?.vote
  }, [votings])

  const uniqueVotings = useMemo(() => {
    return votings.filter((item, idx, array) => array.findIndex(v => v.userId === item.userId) === idx)
  }, [votings])

  const uniqueCardsVotings = useMemo(() => {
    return uniqueVotings.filter((item, idx, array) => array.findIndex(v => v.vote === item.vote) === idx)
  }, [uniqueVotings])

  const getData = useCallback(() => {
    const unsub = onSnapshot(collectionRef, async (doc) => {
      let votingsList: Voting[] = []

      doc.forEach(async (item) => {
        if (item.data().sessionId !== params.token) return;
        votingsList = [...votingsList, item.data() as Voting];
      })

      setVotings(votingsList.sort((a, b) => b.createdAt - a.createdAt))
    })

    return unsub
  }, [params.token])

  useEffect(() => {
    if (!params.token) return;

    const unsub = getData()

    if (!unsub) return;

    return () => unsub()
  }, [getData, params.token])

  return (
    <div className="absolute px-10 top-[30%] w-full max-w-[550px] mx-auto left-0 right-0">
      <div className="flex justify-between">
        {firstFiveUsers.map(user => (
          <div key={user?.id} className="w-fit mx-auto">
            <span className="text-gray-300">{user?.name?.split(' ')?.[0] || user?.name}</span>
            <div data-hasVote={getVote(user?.id) !== undefined} className="bg-gray-200 rounded-full size-10 mt-1 flex justify-center align-center data-[hasVote=true]:bg-primary-300">
              {showCards && <span className="m-auto text-slate-800 text-xl font-medium">{getVote(user?.id) || '?'}</span>}
            </div>
          </div>
        ))}
      </div>

      <motion.div className="bg-primary-300 h-24 w-full my-5 rounded-lg flex align-center justify-center md:h-40">
        {creator === user?.id && (
          <button
            className="bg-primary-600 h-fit px-5 py-2 text-sm rounded-lg m-auto font-medium md:text-lg"
            onClick={() => onToggleShowCards(!showCards)}
          >
            {showCards ? 'Esconder' : 'Revelar'} cartas
          </button>
        )}
      </motion.div>

      <div className="flex justify-between">
        {lastFiveUsers.map(user => (
          <div key={user?.id} className="w-fit mx-auto">
            <span className="text-gray-300">{user?.name?.split(' ')?.[0] || user?.name}</span>
            <div data-hasVote={getVote(user?.id) !== undefined} className="bg-gray-200 rounded-full size-10 mt-1 flex justify-center align-center data-[hasVote=true]:bg-primary-300">
              {showCards && <span className="m-auto text-slate-800 text-xl font-medium">{getVote(user?.id) || '?'}</span>}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showCards && (
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
                  value={parseFloat((uniqueVotings.reduce((prev, curr) => prev + curr.vote, 0) / uniqueVotings.length).toFixed(1))}
                  onSelectCard={() => undefined}
                />
              </div>
            </div>
            <div className="flex flex-wrap align-center justify-center w-full">
              {uniqueCardsVotings.map(vote => (
                <div key={vote.id}>
                  <Card
                    isSelected={false}
                    value={vote.vote}
                    isDisabled={false}
                    onSelectCard={() => undefined}
                    className="cursor-none"
                  />
                  <span>{uniqueVotings.filter(item => item.vote === vote.vote).length} voto{uniqueVotings.filter(item => item.vote === vote.vote).length > 1 ? 's' : ''}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PokerDesk
