import { db } from "../../../../lib/firebase/firebase";
import { addDoc, collection, documentId, serverTimestamp, updateDoc } from "firebase/firestore"; 

export async function POST(req: Request) {
    const colRef: any = collection(db, "chats", "r5vcum1IsYJaDR6raOKK", "messages")
    try {
        const text = await req.json()
        const docRef = await addDoc(colRef, {
            sender: "sender",
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