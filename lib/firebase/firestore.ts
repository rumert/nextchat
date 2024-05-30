import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "./clientApp"
import { signInEmPass, signUpEmPass } from "./auth"
import { updateProfile } from "firebase/auth"

export async function getAvatars(username: any) {
    try {
        const result: any = []
        const q = query( collection(db, "chats"), where("participants", "array-contains", username) )
        const snap: any = await getDocs(q)
        snap.forEach((doc: any) => {
            for(const name of doc.data().participants) {
                if (name != username) {result.push({name: name, chatId: doc.id})}
            }
        })
        return result 
    } catch (error) {
        console.error('Error getting avatars:', error);
        throw error;
    }
    
}

export async function addFriend(currentUserId: any, friendName: any) {
    
    try {
        // Check if the friend exists
        
        const friendQuery = query( collection(db, "users"), where('nickname', '==', friendName) )
        const friendSnap = await getDocs(friendQuery) 
        if (friendSnap.empty) {
            throw new Error(`User "${friendName}" does not exist.`);
        }
        // Get the friend document
        const friendData = friendSnap.docs[0].data();

        // Get the current user's username
        const currentUserDoc = await getDoc( doc(db, 'users', currentUserId) )
        const currentUserName = currentUserDoc.data()!.nickname;
    
        // Check if the friend is already a friend of the current user
        if (friendData.friends.includes(currentUserName)) {
            throw new Error(`User "${friendName}" is already your friend.`)
        }

        // Update friends lists
        await updateDoc(doc(db, 'users', currentUserId), {
            friends: arrayUnion(friendName)
        });
        await updateDoc(doc(db, 'users', friendData.uid), {
            friends: arrayUnion(currentUserName)
        });

        // Create a chat for the users
        const chatDocRef = await addDoc(collection(db, "chats"), {
            participants: [currentUserName, friendName],
            createdAt: serverTimestamp(),
            id: ''
        });

        // Update the chat document with the generated ID
        await updateDoc(chatDocRef, { id: chatDocRef.id });
        return chatDocRef.id
    } catch (error) {
        console.error('Error adding friend:', error);
        throw error;
    }
}

export async function createUser(email: any, password: any, nickname: any) {
    try {
        const userQuery = query( collection(db, 'users'), where('nickname', '==', nickname) )
        if ( !(await getDocs(userQuery)).empty ) {
          return 'Nickname already in use'
        }
        const user: any = await signUpEmPass(email, password)
        await updateProfile(user, {displayName: nickname})
        await setDoc(doc(db, "users", user.uid), {
            nickname,
            email,
            createdAt: serverTimestamp(),
            uid: user.uid,
            lastLogin: serverTimestamp(),
            friends: [],
            chats: [],
        })
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function signInUser(email: any, password: any) {
    const { user }: any = await signInEmPass(email, password)
    await updateDoc(doc(db, 'users', user.uid), {
        lastLogin: user.metadata.lastSignInTime
    })
}

export async function getMessages( currentUserName: any, chatId: any ) {
    try {
        const docRef = doc(db, "chats", chatId)
        const chatDoc = await getDoc(docRef)
        const participants = chatDoc.data()?.participants
        if ( !participants || !participants.includes(currentUserName) ) {
            throw new Error('no access');
        }

        const q = query( collection(docRef, "messages"), orderBy("createdAt") )
        const snap: any = await getDocs(q)
        let messages: any = []
        for (const doc of snap.docs) {
            if (doc.data().sender != currentUserName) {
                await updateDoc(doc.ref, { status: 'delivered' });
            }
            messages.push(doc.data());
        }
        return messages
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message)
    }
}

export async function getUpdatedMessages(callback: Function, chatId: any, currentUserName: any) {

    const colRef: any = collection(collection(db, "chats"), chatId, "messages")
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