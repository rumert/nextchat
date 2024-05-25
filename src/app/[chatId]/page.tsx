import { redirect } from 'next/navigation';
import React from 'react'
import { getAuthenticatedAppForUser } from '../../../lib/firebase/serverApp';
import { getMessages } from '../../../lib/firebase/firestore';
import SkeletonMessages from '@/components/SkeletonMessages';

export default async function page({ params }: any) {
  const { currentUser } = await getAuthenticatedAppForUser();

  if (!currentUser) {
    return redirect('/login')
  } 

  let messagesOfChat = null
  try {
    messagesOfChat = await getMessages( currentUser?.displayName, params.chatId )
  } catch (err: any) {
    console.error( err );
  } finally {
    if (!messagesOfChat) {
      return redirect('/')
    }
  }

  return (
    <div className='flex flex-col bg-chat_background bg-no-repeat bg-cover'>   
      <div>
        {!messagesOfChat && <div className="h-[80vh]"><SkeletonMessages amount="7" /></div>}
        {messagesOfChat && messagesOfChat.map((message: any, index: any) => {
          return(
            <h1 key={index}>{message.text}</h1>
          )
        })}
      </div>
    </div>
  )
}
