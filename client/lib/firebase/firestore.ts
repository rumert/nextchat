import { addDoc, collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from './firebase'

export async function getMessages(chatId: any) {
    const colRef: any = collection(db, "chats", chatId, "messages")
    const q = query( colRef, orderBy("createdAt") )
    const snap: any = await getDocs(q)
    let messages: any = []
    snap.forEach((doc: any) => {
        const data = doc.data()
        messages.push(data);
    })
    return messages
}

export async function getMessagesSnapshot(callback: Function, chatId: any) {

    const colRef: any = collection(db, "chats", chatId, "messages")
    //const a = await getDocs(colRef)
    //if (!a.docs[0]) {await addDoc(colRef, {})}
    const q = query( colRef, orderBy('createdAt') )
    const mesSnap = onSnapshot(q, (snap: any) => {
        const results = snap.docs.map((doc: any) => {
            const data = doc.data()
            return data;
        })
        callback(results)
    })

    return mesSnap
}

export async function getCircles(username: any) {
    const result: any = []
    const colRef: any = collection(db, "chats")
    const q = query( colRef, where("participants", "array-contains", username) )
    const snap: any = await getDocs(q)
    snap.forEach((doc: any) => {
        const data = doc.data()
        for(const name of data.participants) {
            if (name != username) {result.push({name: name, id: doc.id})}
        }
    })
    return result 
}
