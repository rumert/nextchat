'use client'
import MessagesList from "@/components/MessagesList"
import { getMessages } from "../../../lib/firebase/firestore";
import SendMessage from "@/components/SendMessage";
import { useEffect, useState } from "react";
import Circles from "@/components/Circles";

export default function page({ params }: any) {
  
  const chatId = params.chat
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages(chatId);
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);
  
  return (

    <div className='flex-grow flex flex-col h-[88vh]'>
        <Circles />
        <div className='flex-grow flex flex-col'>
          <MessagesList initialMessages={messages} chatId={chatId} />
          <SendMessage chatId={chatId} />
        </div>
    </div>
    
    
    
  )
}