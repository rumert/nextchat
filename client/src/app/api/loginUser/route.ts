import { signInEmPass } from "../../../../lib/firebase/auth"


export async function POST(req: Request) {

    try {
        const data = await req.json()
        const cred = await signInEmPass(data.emaill, data.passwordd)
        return Response.json({ mes: 'OK' })
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage === 'Firebase: Error (auth/invalid-credential).') {
            return Response.json({ mes: 'Invalid email or password.' });
        }
        return Response.json({ mes: 'An error occured, please try again.'})
    }
}