import useCollection from "@/hooks/useCollection"
import { User, Voting } from "@/types"
import { onSnapshot } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type Props = {
  users: User[]
  showCards?: boolean;
  onToggleShowCards(reveal: boolean): void;
}

const PokerDesk = ({ users = [], showCards = false, onToggleShowCards }: Props) => {
  const params = useParams() as { token: string }
  const { collectionRef } = useCollection("voting")
  const [votings, setVotings] = useState<Voting[]>([])

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
    <div className="px-10 w-full max-w-[550px] mx-auto">
      <div className="flex justify-between">
        {users.map(user => (
          <div key={user?.id} className="w-fit mx-auto">
            <span className="text-gray-300">{user?.name?.split(' ')?.[0] || user?.name}</span>
            <div className="bg-primary-300 rounded-full size-10 mt-1 flex justify-center align-center">
              {showCards && <span className="m-auto text-slate-800 text-xl font-bold">{votings.find(item => item.userId === user?.id)?.vote}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary-300 h-24 w-full my-5 rounded-lg flex align-center justify-center md:h-40">
        <button
          className="bg-primary-600 h-fit px-5 py-2 text-sm rounded-lg m-auto font-medium md:text-lg"
          onClick={() => onToggleShowCards(!showCards)}
        >
          {showCards ? 'Esconder' : 'Revelar'} cartas
        </button>
      </div>
    </div>
  )
}

export default PokerDesk
