import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase/firebase";


export async function POST(req: Request) {
    const docRef: any = doc(db, "chats", "r5vcum1IsYJaDR6raOKK")
    try {
        const m = await req.json()
        await updateDoc(docRef, {
            messages: arrayRemove(m.m.m)
        })
        return Response.json('OK')
    } catch (err) {
        console.error('firebase error:', err);
    }
}