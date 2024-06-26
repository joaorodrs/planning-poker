import { FormEvent, useCallback, useEffect } from 'react'
import { addDoc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import 'firebase/auth'
import 'firebase/firestore'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useCollection from '@/hooks/useCollection'
import useAuth from '@/hooks/useAuth'


import '@/App.css'
import { GithubIcon } from 'lucide-react'

type FormValues = {
  username: { value: string };
}

export default function Home() {
  const navigate = useNavigate()
  const { collectionRef } = useCollection("user")
  const { user, getUser } = useAuth()

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

      await getUser()
      getData();
    } catch (err) {
      console.error(err)
    }
  }

  const getData = useCallback(async () => {
    if (user?.id) {
      navigate('/session', { replace: false })
    }
  }, [user, navigate])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <main className="w-screen h-screen flex flex-col justify-between">
      <Card className="border-none my-auto mx-4 md:mx-auto md:w-[350px]">
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>Novo por aqui?</CardTitle>
          </CardHeader>
          <CardContent>
            <Input name="username" placeholder="Qual o seu nome?" />
          </CardContent>
          <CardFooter className="flex-col">
            <Button
              className="bg-primary-400 text-black mt-1 w-full"
              size="sm"
              type="submit"
            >
              Enviar
            </Button>
            <a
              aria-label="Github"
              href="https://github.com/joaorodrs/planning-poker"
              target='_blank'
              className="mx-auto mt-8 text-white p-4 m-2 rounded-xl hover:text-primary-500 hover:bg-white/10"
            >
              <GithubIcon />
            </a>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
