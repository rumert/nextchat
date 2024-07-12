
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  NextOrObserver,
  User,
} from 'firebase/auth';
import { auth } from "./clientApp";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signInEmPass(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password)
}

export function signOut() {
  auth.signOut();
}

export async function signUpEmPass(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  await sendEmailVerification(auth.currentUser!)
  return cred.user
}