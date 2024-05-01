import { useCallback, useMemo, useEffect, useState } from "react"
import { AnimatePresence, motion } from 'framer-motion'
import { onSnapshot } from "firebase/firestore"
import { useParams } from "react-router-dom"

import useAuth from "@/hooks/useAuth"
import useCollection from "@/hooks/useCollection"
import { User, Voting } from "@/types"
import Avatar from "./avatar"
import Results from "./results"

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
          <Avatar vote={getVote(user?.id)} user={user} showCards={showCards} />
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
          <Avatar vote={getVote(user?.id)} user={user} showCards={showCards} />
        ))}
      </div>

      <AnimatePresence>
        {showCards && (
          <Results votings={uniqueVotings} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default PokerDesk
