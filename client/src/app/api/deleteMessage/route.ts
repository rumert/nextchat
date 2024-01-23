import { collection, deleteDoc, doc} from "firebase/firestore";
import { db } from "../../../../lib/firebase/firebase";


export async function POST(req: Request) {
    
    const colRef: any = collection(db, "chats", "r5vcum1IsYJaDR6raOKK", "messages")
    try {
        const idObj = await req.json()
        const id = idObj.id.id
        await deleteDoc(doc(db, "chats", "r5vcum1IsYJaDR6raOKK", "messages", id))
        return Response.json('OK')
    } catch (err) {
        console.error('firebase error:', err);
    }
}