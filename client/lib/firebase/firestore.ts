import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { db } from './firebase'

export const usersRef: any = collection(db, "users")
export const chatsRef: any = collection(db, "chats")

export async function getSnap(nickname: any) {
    const q: any = query(usersRef, where("nickname", "==", nickname))
    return await getDocs(q)
}

export async function getUserData(snap: any) {
    let data = {}
    snap.forEach((doc: any) => {data = doc.data()})
    return data
}

export async function getMessages({ currentUserName, chatId }: any) {
    const docRef: any = doc(chatsRef, chatId)
    const chatDoc: any = await getDoc(docRef)
    const p = chatDoc.data().participants
    if (currentUserName != p[0] && currentUserName != p[1] ) {return 'no access'}

    const q = query( collection(docRef, "messages"), orderBy("createdAt") )
    const snap: any = await getDocs(q)
    
    let messages: any = []
    snap.forEach(async (doc: any) => {
        if (doc.data().sender != currentUserName) {
            await updateDoc(doc.ref, { status: 'delivered' })
        }       
        const data = doc.data()
        messages.push(data);
    })
    return messages
}

export async function getMessagesSnapshot(callback: Function, chatId: any, currentUserName: any) {

    const colRef: any = collection(chatsRef, chatId, "messages")
    const q = query( colRef, orderBy('createdAt') )
    const mesSnap = onSnapshot(q, (snap: any) => {
        const isThereSentStatus = snap.docs.some((doc: any) => 
          ( doc.data().sender != currentUserName ) && ( doc.data().status == 'sent' )
        )
        if (isThereSentStatus) {
            snap.docs.map(async (doc: any) => {
                await updateDoc(doc.ref, { status: 'delivered' }) 
            }) 
        } else {
            const results = snap.docs.map((doc: any) => {
                const data = doc.data()
                return data;
            })
            callback(results)
        }    
    })
    
    return mesSnap
}

export async function getCircles(username: any) {
    const result: any = []
    const q = query( chatsRef, where("participants", "array-contains", username) )
    const snap: any = await getDocs(q)
    snap.forEach((doc: any) => {
        const data = doc.data()
        for(const name of data.participants) {
            if (name != username) {result.push({name: name, id: doc.id})}
        }
    })
    return result 
}

export async function isUserAlreadyFriend(currentUserData: any, friendName: any){
    return currentUserData.friends.some((user: any) => user == friendName)
}

export async function addFriend({ currentUserSnap, currentUserName, friendSnap, friendName }: any) {
    const currentUserRef = currentUserSnap.docs[0].ref
    const friendRef = friendSnap.docs[0].ref
    await updateDoc(currentUserRef, {friends: arrayUnion(friendName)})
    await updateDoc(friendRef, {friends: arrayUnion(currentUserName)})
    const doc = await addDoc(chatsRef, {
        participants: arrayUnion(currentUserName, friendName),
        createdAt: serverTimestamp(),
        id: '',
    })
    updateDoc(doc, {id: doc.id})
    return doc.id
}