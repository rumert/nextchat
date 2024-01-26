import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut as _signOut, updateProfile} from 'firebase/auth';
import { auth, db } from './firebase';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';

export default async function signInEmPass(email: string, password: string) {
    let result: any = null, // Variable to store the sign-in result
     error = null; // Variable to store any error that occurs
    
  
    try {
      result = await signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
      
      const q: any = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid))
      const snap: any = await getDocs(q)
      const docRef = snap.docs[0].ref
      await updateDoc(docRef, {lastLogin: auth.currentUser.metadata.lastSignInTime})
    } catch (e) {
      error = e; // Catch and store any error that occurs during sign-in
    }
  
    return { result, error }; // Return the sign-in result and error (if any)
}

export async function signOut() {
    return auth._signOut();
}

export async function signUpEmPass(email: any, password: any) {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await sendEmailVerification(auth.currentUser)
    return cred.user
}