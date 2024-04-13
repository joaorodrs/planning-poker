import { useState } from 'react'

import Deck from "@/components/deck"
import Header from "@/components/header"
import PokerDesk from "@/components/poker-desk"

export default function Session() {
  const [cardSelected, setCardSelected] = useState<number>()

  function onSelectCard(value?: number) {
    setCardSelected(value)
  }

  return (
    <main className="w-screen h-screen flex flex-col justify-between">
      <Header />

      <PokerDesk />

      <Deck cardSelected={cardSelected} onSelectCard={onSelectCard} />
    </main>
  )
}

