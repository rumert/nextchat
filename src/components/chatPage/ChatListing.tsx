'use client'
import React, { useEffect, useState } from 'react'
import { getUpdatedMessages } from '../../../lib/firebase/firestore'
import { useUserSession } from '../../../lib/getUser';
import Message from './Message';
import type { MessageType } from '@/app/[chatId]/page';
import type { Unsubscribe, User } from 'firebase/auth';

interface Props {
    initialMessages: MessageType[]
    chatId: string
    initialUser: User | {}
}

export default function ChatListing({initialMessages, chatId, initialUser}: Props) {

    const user = useUserSession(initialUser)
    const currentUserName = user?.displayName
    const [messages, setMessages] = useState(initialMessages)
    
    useEffect((): (() => void) => {
        const unsub: Promise<Unsubscribe> = getUpdatedMessages(setMessages, chatId, user?.displayName!)        
        return () => unsub
    }, [])
    
  return (
    <div className="space-y-4">
        {messages?.length > 0 && messages.map((m, index) => (
            <Message
                key={index}
                message={m}
                isCurrentUserSender={m.sender === currentUserName}
                chatId={chatId}
            />
        ))}
    </div>
  )
}