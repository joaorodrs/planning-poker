import { useCallback, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { DatabaseContext } from "@/contexts/database";
import { User } from "@/types";

function useAuth() {
  const context = useContext(DatabaseContext)
  const [user, setUser] = useState<User | null>(null)

  const getUser = useCallback(async () => {
    const stringUser = localStorage.getItem('@planning-poker:user')

    if (!stringUser) return

    const parsedUser = JSON.parse(stringUser)

    const docSnap = await getDoc(doc(context.db, "user", parsedUser.id))

    setUser({
      id: docSnap.id,
      name: docSnap.data()?.name
    });
  }, [context.db])

  useEffect(() => {
    getUser()
  }, [getUser])

  return { user, getUser }
}

export default useAuth
