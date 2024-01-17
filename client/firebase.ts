import { initializeApp } from 'firebase/app'
import { collection, getDoc, getFirestore, onSnapshot, doc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
}
 
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export async function getMessages() {
    const docRef: any = doc(db, "chats", "R9k98M3bRw8cVmVX7nqc")
    const chatDoc = await getDoc(docRef)
    const results: any = chatDoc.data()
    return results.messages
}

export function getMessagesSnapshot(callback: Function) {
    if (typeof callback != "function") {
        console.log("cb is not a func")
        return;
    }

    let colRef = collection(db, "chats")

    const mesSnap = onSnapshot(colRef, (snap) => {
        const results = snap.docs.map(doc => {
            return {id: doc.id, ...doc.data()}
        })

        callback(results)
    })

    return mesSnap
}



