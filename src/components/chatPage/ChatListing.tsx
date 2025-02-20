'use client'
import React, { useEffect, useState } from 'react'
import { getUpdatedMessages } from '../../../lib/firebase/firestore'
import { useUserSession } from '../../../lib/getUser';
import Message from './Message';
import type { MessageType } from '@/app/[chatId]/page';
import type { Unsubscribe, User } from 'firebase/auth';
import { useChatContext } from '@/app/[chatId]/ChatContext';
import FileWithDescription from './FileWithDescription';

interface Props {
    initialMessages: MessageType[]
    chatId: string
    initialUser: User | null
}

export default function ChatListing({initialMessages, chatId, initialUser}: Props) {

    const user = useUserSession(initialUser)
    const currentUserId = user?.uid
    const [messages, setMessages] = useState(initialMessages)
    const { isFileWithDescActive }: any = useChatContext()
    
    useEffect((): (() => void) => {
        const unsub: Promise<Unsubscribe> = getUpdatedMessages(setMessages, chatId, user?.uid!)        
        return () => unsub
    }, [])
    
  return (
    <div className="space-y-4">
        { isFileWithDescActive && 
            <FileWithDescription chatId={chatId} userId={user!.uid}/>
        }
        { !isFileWithDescActive && messages?.length > 0 && 
            messages.map((m, index) => (
            <Message
                key={index}
                message={m}
                isCurrentUserSender={m.sender === currentUserId}
                chatId={chatId}
            />
        ))}
    </div>
  )
}