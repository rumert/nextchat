import { db } from "../../../../lib/firebase/firebase";
import { addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore"; 

export async function POST(req: Request) {
    try {
        const {currentUserName, text, chatId} = await req.json()
        const colRef: any = collection(db, "chats", chatId, "messages")
        const docRef = await addDoc(colRef, {
            sender: currentUserName,
            text: text,
            createdAt: serverTimestamp(),
            id: ''
        })
        const generatedId = docRef.id
        await updateDoc(docRef, { id: generatedId })
        return Response.json('OK')
    } catch (err) {
        console.error('firebase error:', err);
    }
}