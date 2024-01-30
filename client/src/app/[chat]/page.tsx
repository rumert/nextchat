'use client'
import MessagesList from "@/components/MessagesList"
import { getMessages } from "../../../lib/firebase/firestore";
import SendMessage from "@/components/SendMessage";
import { useEffect, useState } from "react";
import Circles from "@/components/Circles";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function page({ params }: any) {
  
  const chatId = params.chat
  const { user }: any = useAuthContext();
  const router = useRouter()
  const [messages, setMessages] = useState([]);
  const [haveAccess, setHaveAccess] = useState(false)

  if (!user) {router.push('/')}

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages({ user, chatId });
        if (data == 'no access') {
          router.push('/')
        } else {
          setHaveAccess(true)
          setMessages(data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);
  
  return (

    <div className='flex-grow flex flex-col h-[88vh]'>
        <Circles />
        { haveAccess &&
        <div className='flex-grow flex flex-col'>
          <MessagesList initialMessages={messages} chatId={chatId} />
          <SendMessage chatId={chatId} />
        </div>
        }
        
    </div>
    
    
    
  )
}