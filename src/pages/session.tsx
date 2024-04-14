import { useState } from 'react'

import Deck from "@/components/deck"
import Header from "@/components/header"
import PokerDesk from "@/components/poker-desk"
import NoSessionDialog from '@/components/dialogs/no-session-dialog'
import { useNavigate } from 'react-router-dom'

export default function Session() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(true);
  const [cardSelected, setCardSelected] = useState<number>()

  function onSelectCard(value?: number) {
    setCardSelected(value)
  }

  async function onNewSession() { }

  function onOpenSession(url?: string) {
    if (!url) {
      return onNewSession()
    }

    navigate(url, { replace: true })
  }

  return (
    <main className="w-screen h-screen flex flex-col justify-between">
      <Header onAction={() => setIsOpen(true)} />

      <PokerDesk />

      <Deck cardSelected={cardSelected} onSelectCard={onSelectCard} />

      <NoSessionDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpenSession={onOpenSession}
      />
    </main>
  )
}

