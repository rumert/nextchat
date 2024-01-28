import { collection, deleteDoc, doc} from "firebase/firestore";
import { db } from "../../../../lib/firebase/firebase";


export async function POST(req: Request) {
    
    
    try {
        const  { mId, chatId }  = await req.json()
        const colRef: any = collection(db, "chats", chatId, "messages")
        await deleteDoc(doc(colRef, mId))
        return Response.json('OK')
    } catch (err) {
        console.error('firebase error:', err);
    }
}