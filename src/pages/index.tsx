import { FormEvent, useCallback, useEffect } from 'react'
import { addDoc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import 'firebase/auth'
import 'firebase/firestore'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import '@/App.css'
import useCollection from '@/hooks/useCollection'
import useDoc from '@/hooks/useDoc'

type FormValues = {
  username: { value: string };
}

export default function Home() {
  const navigate = useNavigate()
  const { collectionRef } = useCollection("user")
  const { getDocRef } = useDoc("user")

  async function onSubmit(event: FormEvent) {
    try {
      event.preventDefault()

      const values = event.target as unknown as FormValues;

      const body = {
        name: values.username?.value,
      }

      const doc = await addDoc(collectionRef, body);

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

    const docSnap = await getDoc(getDocRef(user.id))

    if (docSnap.id) {
      navigate('/session', { replace: false })
    }
  }, [navigate, getDocRef])

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
