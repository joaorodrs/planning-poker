import { useState, useEffect, useCallback, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addDoc, arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'

import Deck from "@/components/deck"
import Header from "@/components/header"
import PokerDesk from "@/components/poker-desk"
import NoSessionDialog from '@/components/dialogs/no-session-dialog'
import useCollection from '@/hooks/useCollection'
import useAuth from '@/hooks/useAuth'
import { User } from '@/types'
import NoUserDialog from '@/components/dialogs/no-user-dialog'
import { DatabaseContext } from '@/contexts/database'

export default function SessionPage() {
  const navigate = useNavigate()
  const params = useParams() as { token: string }
  const { user, getUser } = useAuth()
  const { db } = useContext(DatabaseContext)
  const { collectionRef: userCollectionRef } = useCollection("user")
  const { collectionRef } = useCollection("session")
  const { collectionRef: votingCollectionRef } = useCollection("voting")

  const [isOpen, setIsOpen] = useState(false);
  const [cardSelected, setCardSelected] = useState<number>()
  const [users, setUsers] = useState<User[]>([]);
  const [loadingCreatingUser, setLoadingCreatingUser] = useState(false)

  async function onSelectCard(value?: number) {
    setCardSelected(value)

    await addDoc(votingCollectionRef,
      {
        createdAt: new Date(),
        userId: user?.id,
        sessionId: params.token,
        vote: value
      }
    );
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

  async function onCreateUser(name: string) {
    try {
      setLoadingCreatingUser(true)
      const body = { name }
      console.log(body)

      const doc = await addDoc(userCollectionRef, body);

      const data = await getDoc(doc)

      const user = {
        id: data.id,
        name: data.data()?.name
      }

      localStorage.setItem('@planning-poker:user', JSON.stringify(user))

      await getUser()
      getData();
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingCreatingUser(false)
    }
  }

  const getData = useCallback(() => {
    if (!params.token) {
      setIsOpen(true)
      return
    }

    const unsub = onSnapshot(collectionRef, async (doc) => {
      let usersList: User[] = []

      doc.forEach(async (item) => {
        if (item.id !== params.token) return;
        usersList = item.data()?.users;
      })

      setUsers(usersList)
    })

    return unsub
  }, [params.token])

  useEffect(() => {
    if (!user) return;

    const unsub = getData()

    if (!unsub) return;

    return () => unsub()
  }, [getData, user])

  useEffect(() => {
    if (!user || !users.length) return;

    if (users.map(item => item?.id).includes(user?.id)) return;

    (async () => {
      await updateDoc(doc(db, "session", params.token), {
        users: arrayUnion(user)
      })
    })()
  }, [users, user, db, params.token])

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

      <NoUserDialog
        isOpen={user === null}
        onClose={() => undefined}
        onCreateUser={onCreateUser}
        loading={loadingCreatingUser}
      />
    </main>
  )
}

