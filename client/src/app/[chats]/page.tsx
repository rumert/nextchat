'use client'
import MessagesList from "@/components/MessagesList"
import { getMessages } from "../../../lib/firebase/firestore";
import SendMessage from "@/components/SendMessage";
import { useEffect, useState } from "react";
import Link from "next/link";

export default async function page() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesData = await getMessages();
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);
  
  return (

    <div className='flex-grow flex flex-col h-[88vh]'>
        <div className='h-[11vh] border-2 rounded-2xl flex gap-2 pl-4 items-center'>
          <Link href='/' className='h-[10vh] w-[10vh] bg-gray-800 rounded-full'>a</Link>
          <Link href='/' className='h-[10vh] w-[10vh] bg-gray-800 rounded-full'>b</Link>
        </div> {/* Friends */}
        <div className='flex-grow flex flex-col'>
          <MessagesList initialMessages={messages} />
          <SendMessage />
        </div>
    </div>
    
    
    
  )
}