import { redirect } from 'next/navigation';
import React from 'react'
import { getAuthenticatedAppForUser } from '../../../lib/firebase/serverApp';
import { getMessages } from '../../../lib/firebase/firestore';
import ChatListing from '@/components/chatPage/ChatListing';
import SendMessage from '@/components/chatPage/SendMessage';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

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
    <div className='h-[calc(100vh-84px)] md:h-screen md:w-[calc(100vw-92px)] md:ml-auto md:p-8 flex justify-center items-center'> 
      <Card className='flex flex-col h-full w-full p-4'>
        <CardContent className='overflow-y-scroll px-1 h-full'>
          { messagesOfChat && currentUser && 
            <ChatListing chatId={params.chatId} initialUser={currentUser?.toJSON()} initialMessages={JSON.parse(JSON.stringify(messagesOfChat))} />
          }
        </CardContent>
        <CardFooter>
          { currentUser && <SendMessage chatId={params.chatId} currentUser={currentUser?.toJSON()} /> }
        </CardFooter>  
      </Card>
    </div>
  )
}
