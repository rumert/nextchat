import React from 'react'
import { SubmitButton } from '../SubmitButton';
import { sendMessage } from '../../../lib/firebase/firestore';
import { Input } from '../ui/input';
import { Send } from 'lucide-react';
import { FaRegPaperPlane } from "react-icons/fa6";
import { redirect } from 'next/navigation';

export default function SendMessage({ chatId, currentUser }: any) {

  async function handleSending(formData: FormData){
    "use server"
    const message = formData.get("message") as string
    let redirectPath;
    if (message.trim() != '') {
      try {
        await sendMessage(currentUser.displayName, message, chatId)
        redirectPath=`/${chatId}`
      } catch (err: any) {
        console.error( err );
        redirectPath=`/${chatId}?message=${message}`
      } finally {
        return redirect(redirectPath!)
      }
    }
    
  }
  return (
    
    <form action={handleSending} className="flex w-full items-center space-x-2">
      <Input
        name='message'
        type="text" 
        placeholder="Type your message..."
        className='flex-1'
        required
      />
      <SubmitButton
        className='rounded-lg text-xl'
        pendingText="Sending..."
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Send</span>
      </SubmitButton> 
    </form>
  )
}