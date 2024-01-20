import { initializeApp, getApps } from 'firebase/app'
import { collection, getDocs, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
 
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app)

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



