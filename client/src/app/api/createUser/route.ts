import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../lib/firebase/firebase";

export async function POST(req: Request) {
    
    const data = await req.json()
    createUserWithEmailAndPassword(auth, data.emaill, data.passwordd)
        .then((cred) => {
            const user = cred.user;
            return Response.json('OK')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, ":", errorMessage)
        }); 
}