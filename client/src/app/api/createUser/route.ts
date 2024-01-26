import { updateProfile } from "firebase/auth";
import { db } from "../../../../lib/firebase/firebase";
import { addDoc, collection, getDocs, query, serverTimestamp, where} from "firebase/firestore";
import { signUpEmPass } from "../../../../lib/firebase/auth";

export async function POST(req: Request) {
    const colRef: any = collection(db, "users")
    let isNicknameExist = false
    try {
        const data = await req.json()
        const q = query(colRef, where("nickname", "==", data.nickname))
        const snap: any = await getDocs(q)
        snap.forEach((doc: any) => {
            if (doc.data()) {isNicknameExist = true}
        })
        if(isNicknameExist) {return Response.json( 'Nickname already in use' )}
        const user: any = await signUpEmPass(data.email, data.password)
        const uid = user.uid
        await updateProfile(user, {displayName: data.nickname})
        const docRef = await addDoc(colRef, {
            nickname: data.nickname,
            email: data.email,
            createdAt: serverTimestamp(),
            uid: uid,
            lastLogin: 'never'
        })
        return Response.json( 'User created. Verification email sent!' )
    } catch (error: any) {
        console.error('firebase error:', error);
        return Response.json(error.message);
    }         
}