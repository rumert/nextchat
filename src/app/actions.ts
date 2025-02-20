"use server"
import { cookies } from "next/headers";
import { sendMessage } from "../../lib/firebase/firestore";

export async function setCookie(name: string, value: string) {
  (await cookies()).set(name, value)
}

export async function removeCookie(name: string) {
  (await cookies()).delete(name)
}

export async function handleSending(chatId: string, userId: string, formData: FormData) {

  const message = formData.get("message") as string
  const file = formData.get("file") as File | null;
  //let redirectPath: string = `/${chatId}`
  
  try {
    await sendMessage(userId, chatId, message, file)
    return { status: 'success' }
  } catch (err: any) {
    return {status: 'An error occured'}
  }

}