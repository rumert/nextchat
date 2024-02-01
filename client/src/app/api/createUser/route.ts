import { updateProfile } from "firebase/auth";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { signUpEmPass } from "../../../../lib/firebase/auth";
import { getSnap, usersRef } from "../../../../lib/firebase/firestore";

export async function POST(req: Request) {
    
    try {
        const data = await req.json()

        const snap: any = getSnap(data.nickname)
        if(!snap.empty) {return Response.json( 'Nickname already in use' )}

        const user: any = await signUpEmPass(data.email, data.password)
        await updateProfile(user, {displayName: data.nickname})

        await addDoc(usersRef, {
            nickname: data.nickname,
            email: data.email,
            createdAt: serverTimestamp(),
            uid: user.uid,
            lastLogin: 'never',
            friends: [],
            chats: [],
        })
        return Response.json( 'User created. Verification email sent!' )
    } catch (error: any) {
        console.error('firebase error:', error);
        return Response.json(error.message);
    }         
}