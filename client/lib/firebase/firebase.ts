
import { initializeApp, getApps } from 'firebase/app'
import { collection, getDoc, getFirestore, onSnapshot, doc } from 'firebase/firestore'

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
    const docRef: any = doc(db, "chats", "r5vcum1IsYJaDR6raOKK")
    const chatDoc = await getDoc(docRef)
    const results: any = chatDoc.data()
    return results.messages
}

export async function getMessagesSnapshot(callback: Function) {

    let colRef = collection(db, "chats")

    const mesSnap = onSnapshot(colRef, (snap) => {
        const results = snap.docs.map(doc => {
            return {id: doc.id, ...doc.data()}
        })
        callback(results)
    })

    return mesSnap
}



