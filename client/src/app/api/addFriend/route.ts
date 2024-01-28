import { db } from "../../../../lib/firebase/firebase";
import { addDoc, arrayUnion, collection, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore"; 

export async function POST(req: Request) {
    try {
        const { user, friendName } = await req.json()
        const usersRef: any = collection(db, "users")
        const chatsRef: any = collection(db, "chats")

        const friendQ = query(usersRef, where("nickname", "==", friendName))
        const friendSnap = await getDocs(friendQ)
        if(friendSnap.empty) {
            return Response.json('There is no user with this name')
        }

        const userQ = query(usersRef, where("uid", "==", user.uid))
        const userSnap = await getDocs(userQ)
        const userRef = userSnap.docs[0].ref
        const friendRef = friendSnap.docs[0].ref
        await updateDoc(userRef, {friends: arrayUnion(friendName)})
        await updateDoc(friendRef, {friends: arrayUnion(user.displayName)})

        
        const doc = await addDoc(chatsRef, {
            participants: arrayUnion(user.displayName, friendName),
            createdAt: serverTimestamp(),
            id: '',
        })
        updateDoc(doc, {id: doc.id})
        //const messagesRef = collection(doc, 'messages')

        return Response.json({message: 'added', chatId: doc.id})
    } catch (err: any) {
        console.error('Error in POST handler:', err);
        return Response.json(err.message);
    }
}