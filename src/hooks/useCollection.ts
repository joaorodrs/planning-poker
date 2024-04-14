import { DatabaseContext } from "@/contexts/database";
import { collection as firestoreCollection } from "firebase/firestore";
import { useContext } from "react";

function useCollection(collectionName: string) {
  const context = useContext(DatabaseContext)

  function collection(...segmentPath: string[]) {
    return firestoreCollection(context.db, collectionName, ...segmentPath)
  }

  return {
    collectionRef: firestoreCollection(context.db, collectionName),
    getCollectionRef: collection
  }
}

export default useCollection
