'use client'
import React, { useEffect, useState } from 'react'
import { getMessagesSnapshot } from '../../../lib/firebase/firestore';
import DeleteMessage from './DeleteMessage';


function MessagesList({ initialMessages }: any) {

    const [messages, setMessages] = useState(initialMessages)

    useEffect(() => {
        const unsub: any = getMessagesSnapshot( (mes: any) => {
            if (mes) {
                setMessages(mes);
            } else {
                console.log("no data")
            }
        })

        return () => unsub
    }, [])

  return (
    <div className='flex-grow flex flex-col pt-4 gap-2'>
        {messages.length != 0 && 
            messages.map( (m: any, index: number) => {
            return <div className='ml-auto flex' key={index} >
                    <DeleteMessage id={m.id} />
                    <div 
                        className='border-2 rounded-xl w-fit px-2'
                    >
                    {m.text}
                    </div>
                   </div>
            })}
    </div>
  )
}

export default MessagesList