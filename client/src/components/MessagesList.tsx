'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getMessagesSnapshot } from '../../lib/firebase/firestore';
import DeleteMessage from './DeleteMessage';
import { useAuthContext } from '@/context/AuthContext';
import { FaCaretLeft } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { RiCheckDoubleFill } from "react-icons/ri";


function MessagesList({ initialMessages, chatId }: any) {

    const { user }: any = useAuthContext();
    const currentUserName = user.displayName
    const [messages, setMessages] = useState(initialMessages)
    const [buttonsVisibility, setButtonsVisibility]: any = useState({})
    const [expandedMessages, setExpandedMessages]: any = useState({})

    useEffect(() => {
        const unsub: any = getMessagesSnapshot( (mes: any) => {
            if (mes) {
                setMessages(mes);
            } else {
                console.log("no data")
            }
        }, chatId, user.displayName)        

        return () => unsub
    }, [])

    function handleToggleMesMenu(messageId: any) {
        setButtonsVisibility((prevVisibility: any) => ({           
            [messageId]: !prevVisibility[messageId]
        }))
    }

    function handleExceededMessages(messageId: any) {
        setExpandedMessages((prevExpanded: any) => ({
            ...prevExpanded,
            [messageId]: true
        }))
    }
    

  return (
    <div className='h-[80vh] flex flex-col gap-2 p-4 drop-shadow-4xl overflow-y-scroll'>
        {messages.length != 0 && 
        messages.map( (m: any, index: number) => {
            const isCurrentUserSender = (m.sender == currentUserName)
            const isExpanded = expandedMessages[m.id] || false;
            const hourr = m.createdAt.toDate().getHours().toString()
            const minutee = m.createdAt.toDate().getMinutes().toString()
            const hour = hourr.length == 1 ? '0' + hourr : hourr
            const minute = minutee.length == 1 ? '0' + minutee : minutee              
            return  (<div className = {isCurrentUserSender ? 'ml-auto w-fit flex justify-end relative group gap-4' : 'mr-auto flex'} key={index} >
                            
                        { isCurrentUserSender && buttonsVisibility[m.id] && 
                        <DeleteMessage mId={m.id} chatId={chatId} />}

                        { isCurrentUserSender && !buttonsVisibility[m.id] &&
                        <div className='h-full w-7'></div>
                        }

                        <div>
                            <div className={`py-1 px-2 rounded-xl max-w-[40vw] break-words ${isCurrentUserSender ? 'bg-base-color-1' : 'bg-primary-color'}`}>
                                <p className={`${isExpanded ? 'max-h-full' : 'max-h-28'} overflow-y-hidden`}>{m.text}</p>
                                <div className='flex gap-2 ml-auto w-fit'>
                                    <p className='text-gray-2 text-base'>{`${hour} : ${minute}`}</p>
                                    {m.status == 'sent' && isCurrentUserSender && <FaCheck className='text-gray-1 text-base' />}
                                    {m.status == 'delivered' && isCurrentUserSender && <RiCheckDoubleFill className='text-action-color-1' />}
                                </div>    
                            </div>
                            
                            {(m.text.length > 40) && !isExpanded && 
                                <button onClick={() => handleExceededMessages(m.id)} className='bg-action-color-2 rounded-lg px-2'>
                                    Read More
                                </button>
                            }
                        </div>                                          

                        { isCurrentUserSender &&
                        <button className='hidden group-hover:block absolute right-0 top-0 h-7' onClick={() => handleToggleMesMenu(m.id)}>
                            <FaCaretLeft className='rounded-xl bg-gradient-to-r from-action-color-1 to-action-color-2 text-2xl z-10' />   
                        </button>                                                             
                        }

                    </div>)
        })}
    </div>
  )
}

export default MessagesList