import { useEffect, useState } from 'react'
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import Deck from '@/components/deck'
import Header from '@/components/header'
import PokerDesk from '@/components/poker-desk'

import SessionDialog from '@/components/dialogs/session-dialog'
import '@/App.css'

const app = initializeApp({
  apiKey: "AIzaSyCqFR6EqpSAB-DWH71JbKIpd-8aBrZoxEU",
  authDomain: "planning-poker-8f949.firebaseapp.com",
  projectId: "planning-poker-8f949",
  storageBucket: "planning-poker-8f949.appspot.com",
  messagingSenderId: "1010743575662",
  appId: "1:1010743575662:web:586550692a56366160927f",
  measurementId: "G-L6P8RTWEQ5"
})

const db = getFirestore(app);

export default function Home() {
  const [cardSelected, setCardSelected] = useState<number>()
  const [open, setOpen] = useState(false);

  function onSelectCard(value?: number) {
    setCardSelected(value)
  }

  function getData() {
    const sessionId = localStorage.getItem('@planning-poker:sessionId')

    if (!sessionId) {
      setOpen(true)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <main className="w-screen h-screen flex flex-col justify-between">
      <Header />

      <PokerDesk />

      <Deck cardSelected={cardSelected} onSelectCard={onSelectCard} />

      <SessionDialog isOpen={open} onClose={() => setOpen(false)} />
    </main>
  )
}
