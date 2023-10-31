import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../firebase/firebase";

export const deleteFirebaseBoardDb = async (collectionId: string) => {
    const selectDoc = doc(db, "community-board", collectionId)
    await deleteDoc(selectDoc)
}