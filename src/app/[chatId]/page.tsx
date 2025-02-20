import { redirect } from 'next/navigation';
import { getAuthenticatedAppForUser } from '../../../lib/firebase/serverApp';
import { getMessages } from '../../../lib/firebase/firestore';
import ChatListing from '@/components/chatPage/ChatListing';
import SendMessage from '@/components/chatPage/SendMessage';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { ChatContextProvider } from './ChatContext';

export type MessageType = {
  id: string
  message: string
  file: string
  sender: string
  status: string
  createdAt: Timestamp
}

export default async function page({ params }: { params: { chatId: string }}) {
  const { chatId } = await params;
  const { currentUser }: { currentUser: User | null } = await getAuthenticatedAppForUser();

  if (!currentUser) {
    return redirect('/login')
  } 

  let messagesOfChat = null
  try {
    messagesOfChat = await getMessages( currentUser.uid, chatId )
  } catch (err: any) {
  } finally {
    if (!messagesOfChat) {
      return redirect('/')
    }
  }

  return (
    <ChatContextProvider>
      <div className='h-[calc(100vh-84px)] md:h-screen md:w-[calc(100vw-92px)] md:ml-auto md:p-8 flex justify-center items-center'> 
        <Card className='flex flex-col h-full w-full'>
          <CardContent className='overflow-y-scroll p-4 h-full'>
            { messagesOfChat && currentUser &&
              <ChatListing chatId={chatId} initialUser={currentUser?.toJSON()} initialMessages={JSON.parse(JSON.stringify(messagesOfChat))} />
            }
          </CardContent>
          <CardFooter>
            { currentUser && <SendMessage chatId={chatId} userId={currentUser.uid!} /> }
          </CardFooter>  
        </Card>
      </div>
    </ChatContextProvider>
  )
}
