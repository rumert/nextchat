import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../lib/firebase/firebase";

export async function POST(req: Request) {

    try {
        const data = await req.json()
        createUserWithEmailAndPassword(auth, data.email, data.password)
        return Response.json( 'User created. Verification email sent!' )
    } catch (error: any) {
        console.error('firebase error:', error);
        return Response.json(error.code);
    }         
}