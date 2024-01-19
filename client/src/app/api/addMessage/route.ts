import { db } from "../../../../lib/firebase/firebase";
import { arrayUnion, collection, doc, query, updateDoc } from "firebase/firestore"; 

const colRef: any = collection(db, "chats")
//const q = query(colRef, where("messages", "array-contains", {"text": "a", "sender": "sender"}))

export async function POST(req: Request) {
    const docRef: any = doc(db, "chats", "r5vcum1IsYJaDR6raOKK")
    try {
        const res = await req.json()
        const message = res.message
        await updateDoc(docRef, { messages: arrayUnion(message) });
        return Response.json('OK')
    } catch (err) {
        console.error('firebase error:', err);
    }
}










