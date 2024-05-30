import React from 'react'
import { SubmitButton } from './SubmitButton'
import { sendMessage } from '../../lib/firebase/firestore'

export default function SendMessage({ chatId, currentUser }: any) {

  async function handleSending(formData: FormData){
    "use server"
    const message = formData.get("message") as string
    if (message.trim() != '') {
      try {
        await sendMessage(currentUser.displayName, message, chatId)
      } catch (err: any) {
        console.error( err );
      }
    }
    
  }
  return (
    <form className='h-[10vh] flex'>
      <input 
        type="text" 
        name='message'
        className='h-full w-[80%]'
        required
      />
      <SubmitButton
        formAction={handleSending}
        className='flex-grow rounded-2xl'
        pendingText="Sending..."
      >
        SEND
      </SubmitButton> 
    </form>
  )
}