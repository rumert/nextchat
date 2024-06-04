import { redirect } from 'next/navigation';
import React from 'react'
import { getAuthenticatedAppForUser } from '../../../lib/firebase/serverApp';
import { getMessages } from '../../../lib/firebase/firestore';
import SkeletonMessages from '@/components/chatPage/SkeletonMessages';
import ChatListing from '@/components/chatPage/ChatListing';
import SendMessage from '@/components/chatPage/SendMessage';

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
    <div className='flex flex-col h-[calc(100vh-84px)] md:h-screen md:w-[calc(100vw-92px)] md:ml-auto bg-chat_background bg-no-repeat bg-cover'>   
      {!messagesOfChat && <div className="h-[80vh]"><SkeletonMessages amount="7" /></div>}
      { messagesOfChat && currentUser && 
        <ChatListing chatId={params.chatId} initialUser={currentUser?.toJSON()} initialMessages={JSON.parse(JSON.stringify(messagesOfChat))} />
      }
      { currentUser && <SendMessage chatId={params.chatId} currentUser={currentUser?.toJSON()} /> }
    </div>
  )
}
