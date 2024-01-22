import { signUpEmPass } from "../../../../lib/firebase/auth";

export async function POST(req: Request) {

    try {
        const data = await req.json()
        signUpEmPass(data.emaill, data.passwordd)
        return Response.json( 'User created. Verification email sent!' )
    } catch (error: any) {
        console.error('firebase error:', error);
        return Response.json(error.code);
    }         
}