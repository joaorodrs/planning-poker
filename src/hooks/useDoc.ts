import { DatabaseContext } from "@/contexts/database"
import { doc as firestoreDoc } from "firebase/firestore"
import { useContext } from "react"

function useDoc(collectionName: string) {
  const context = useContext(DatabaseContext)

  function doc(...segmentPath: string[]) {
    return firestoreDoc(context.db, collectionName, ...segmentPath)
  }

  return { docRef: firestoreDoc(context.db, collectionName), getDocRef: doc }
}

export default useDoc
