import { useState } from 'react'

import Deck from './components/deck'
import Header from './components/header'
import PokerDesk from './components/poker-desk'

import './App.css'

function App() {
  const [cardSelected, setCardSelected] = useState<number>()
  const [isOpen, setIsOpen] = useState(false)

  function onSelectCard(value?: number) {
    setCardSelected(value)
  }

  return (
    <main className="w-screen h-screen flex flex-col justify-between">
      <Header />

      <button onClick={() => setIsOpen(true)}>open</button>
      <PokerDesk />

      <Deck cardSelected={cardSelected} onSelectCard={onSelectCard} />

      <dialog open={isOpen}>
        <h1>Dialog!</h1>
      </dialog>
    </main>
  )
}

export default App
