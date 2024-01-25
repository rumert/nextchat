import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut as _signOut} from 'firebase/auth';
import { auth } from './firebase';

export default async function signInEmPass(email: string, password: string) {
    let result = null, // Variable to store the sign-in result
     error = null; // Variable to store any error that occurs
  
    try {
      result = await signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
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
    const user = cred.user;
    await sendEmailVerification(auth.currentUser)
}