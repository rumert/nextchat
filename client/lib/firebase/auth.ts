import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut as _signOut} from 'firebase/auth';
import { auth } from './firebase';


export function onAuthChanged(cb: any) {
    return onAuthStateChanged(auth, cb);
}

export async function signInEmPass(email: any, password: any) {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    const user = cred.user;
}

export async function signOut() {
    return auth._signOut();
}

export async function signUpEmPass(email: any, password: any) {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    const user = cred.user;
    await sendEmailVerification(auth.currentUser)
}


