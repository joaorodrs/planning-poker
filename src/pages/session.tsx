import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addDoc, getDoc, onSnapshot } from 'firebase/firestore'

import Deck from "@/components/deck"
import Header from "@/components/header"
import PokerDesk from "@/components/poker-desk"
import NoSessionDialog from '@/components/dialogs/no-session-dialog'
import useCollection from '@/hooks/useCollection'
import useAuth from '@/hooks/useAuth'
import { User } from '@/types'

export default function SessionPage() {
  const navigate = useNavigate()
  const params = useParams() as { token: string }
  const { user } = useAuth()
  const { collectionRef } = useCollection("session")

  const [isOpen, setIsOpen] = useState(false);
  const [cardSelected, setCardSelected] = useState<number>()
  const [users, setUsers] = useState<User[]>([]);

  console.log({ users })

  function onSelectCard(value?: number) {
    setCardSelected(value)
  }

  async function onNewSession() {
    if (!user) return;

    const body = {
      users: [user],
      creator: user?.id
    }

    const doc = await addDoc(collectionRef, body);

    const data = await getDoc(doc)

    navigate(data.id)

    setIsOpen(false)
  }

  function onOpenSession(url?: string) {
    if (!url) {
      return onNewSession()
    }

    navigate(url, { replace: true })
  }

  function onHeaderAction(share: boolean) {
    if (!share) return setIsOpen(true)

    console.log('Share Session!')
  }

  const getData = useCallback(() => {
    if (!params.token) {
      setIsOpen(true)
      return
    }

    const unsub = onSnapshot(collectionRef, (doc) => {
      const userList: User[] = []
      doc.forEach((item) => {
        console.log(item.id)
        if (item.id !== params.token) return;
        userList.push(item.data()?.users?.[0] as User)
      })

      setUsers(userList)
    })

    return unsub
  }, [collectionRef, params.token])

  useEffect(() => {
    const unsub = getData()

    if (!unsub) return;

    return () => unsub()
  }, [getData])

  return (
    <main className="w-screen h-screen flex flex-col justify-between">
      <Header hasToken={!!params.token} onAction={onHeaderAction} />

      <PokerDesk users={users} />

      <Deck cardSelected={cardSelected} onSelectCard={onSelectCard} />

      <NoSessionDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpenSession={onOpenSession}
      />
    </main>
  )
}

