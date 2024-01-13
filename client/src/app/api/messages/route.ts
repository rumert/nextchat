import { db } from "@/app/firebase"
import { arrayUnion, doc, updateDoc, getDoc, onSnapshot} from "firebase/firestore"; 

const chatRef = doc(db, "chats", "r5vcum1IsYJaDR6raOKK")

export async function POST(req: Request) {
    
    const text = await req.json()

    try {
        const message = {
            sender: "sender",
            text: text
        }
        await updateDoc(chatRef, {
            messages: arrayUnion(message)
        });
    } catch (err) {
      console.error('firebase error:', err);
    }
    
    return Response.json('OK') 
}

export async function GET() {
    const docSnap = await getDoc(chatRef)
    const data = docSnap.data()
    return Response.json( data )
}

const changedData = () => onSnapshot(chatRef, (snapshot) => {
    console.log('data received: ', snapshot)
    let chats: any = []
    const dataa: any = snapshot.data()
    const messagess = dataa.messages
    messagess.map((message: any) => chats.push(message.text))
    
    return () => changedData()
    //setMessages(doc.data().messages);
})



