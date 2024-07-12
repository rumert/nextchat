"use server"
import { cookies } from "next/headers";
import { sendMessage } from "../../lib/firebase/firestore";
import { redirect } from "next/navigation";

export async function setCookie(name: string, value: string) {
    cookies().set(name, value)
}

export async function removeCookie(name: string) {
    cookies().delete(name)
}

export async function handleSending(username: string, chatId: string, formData: FormData) {

    const message = formData.get("message") as string
    let redirectPath: string | null;;
    if (message.trim() != '') {
      try {
        await sendMessage(username, message, chatId)
        redirectPath=`/${chatId}`
      } catch (err: any) {
        console.error( err );
        redirectPath=`/${chatId}?message=${message}`
      }
      redirect(redirectPath)
    }

}