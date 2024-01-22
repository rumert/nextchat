import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from './firebase'

export async function getMessages() {
    const colRef: any = collection(db, "chats", "r5vcum1IsYJaDR6raOKK", "messages")
    const q = query( colRef, orderBy('createdAt') )
    const chatDocs = await getDocs(q)
    let messages: any = []
    chatDocs.forEach((doc: any) => {
        const data = doc.data()
        delete data.createdAt
        messages.push(data);
    })
    return messages
}

export async function getMessagesSnapshot(callback: Function) {

    const colRef: any = collection(db, "chats", "r5vcum1IsYJaDR6raOKK", "messages")
    const q = query( colRef, orderBy('createdAt') )

    const mesSnap = onSnapshot(q, (snap: any) => {
        const results = snap.docs.map((doc: any) => {
            const data = doc.data()
            delete data.createdAt
            return data;
        })
        callback(results)
    })

    return mesSnap
}