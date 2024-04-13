import { FormEvent, useCallback, useEffect } from 'react'
import { getFirestore, addDoc, collection, getDoc, doc } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { useNavigate } from 'react-router-dom'
import 'firebase/auth'
import 'firebase/firestore'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import '@/App.css'

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
})

const db = getFirestore(app);

type FormValues = {
  username: { value: string };
}

export default function Home() {
  const navigate = useNavigate()

  async function onSubmit(event: FormEvent) {
    try {
      event.preventDefault()

      const values = event.target as unknown as FormValues;

      const body = {
        name: values.username?.value,
      }

      const doc = await addDoc(collection(db, "user"), body);

      const data = await getDoc(doc)

      const user = {
        id: data.id,
        name: data.data()?.name
      }

      localStorage.setItem('@planning-poker:user', JSON.stringify(user))

      getData();
    } catch (err) {
      console.error(err)
    }
  }

  const getData = useCallback(async () => {
    const stringUser = localStorage.getItem('@planning-poker:user')

    if (!stringUser) {
      return
    }

    const user = JSON.parse(stringUser);

    const docSnap = await getDoc(doc(db, "user", user.id))

    if (docSnap.id) {
      navigate('/session', { replace: false })
    }
  }, [navigate])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <main className="w-screen h-screen flex flex-col justify-between">
      <Card className="border-none my-auto mx-4">
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>Novo por aqui?</CardTitle>
          </CardHeader>
          <CardContent>
            <Input name="username" placeholder="Qual o seu nome?" />
          </CardContent>
          <CardFooter>
            <Button
              className="bg-primary-400 text-black mt-1 w-full"
              size="sm"
              type="submit"
            >
              Enviar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
