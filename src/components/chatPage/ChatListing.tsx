'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getUpdatedMessages } from '../../../lib/firebase/firestore'
import { useUserSession } from '../../../lib/getUser';
import Message from './Message';

export default function ChatListing({initialMessages, chatId, initialUser}: any) {

    const user = useUserSession(initialUser)
    const currentUserName = user?.displayName
    const [messages, setMessages] = useState(initialMessages)
    const messageRefs: any = useRef([]);
    const [isOverflowed, setIsOverflowed]: any = useState([])
        
    useLayoutEffect(() => {
        checkOverflow();
    }, [])
    
    useEffect(() => {
        checkOverflow();
    }, [messages])
    
    useEffect(() => {
        const unsub: any = getUpdatedMessages(setMessages, chatId, user.displayName)        
        return () => unsub
    }, [])

    function checkOverflow () {
        const refs = messageRefs.current;
        const arr = refs.map((ref: any) => ref?.scrollHeight !== ref?.clientHeight);
        setIsOverflowed(arr);
    };
    
  return (
    <div className="space-y-4">
        {messages?.length > 0 && messages.map((m: any, index: any) => (
            <Message
                key={index}
                message={m}
                isCurrentUserSender={m.sender === currentUserName}
                messageRef={(ref: any) => (messageRefs.current[index] = ref)}
                isOverflowed={isOverflowed[index]}
                chatId={chatId}
            />
        ))}
    </div>
  )
}

{/* <div className='h-[90%] flex flex-col gap-2 p-4 drop-shadow-4xl overflow-y-scroll'>
       
       {messages?.length != 0 &&
           messages.map( (m: any, index: number) => {       
           return  (<div className = {isCurrentUserSender ? 'ml-auto w-fit flex justify-end relative group gap-4' : 'mr-auto flex'} key={index} >
                               
                       { isCurrentUserSender && buttonsVisibility[m.id] && 
                       <DeleteMessage mId={m.id} chatId={chatId} />}
   
                       { isCurrentUserSender && !buttonsVisibility[m.id] &&
                       <div className='h-full w-7'></div>
                       }
   
                       <div>
                           <div className={`py-1 px-2 rounded-lg max-w-[40vw] break-words ${isCurrentUserSender ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                               <p ref={(ref) => (messageRefs.current[index] = ref)} className={`${isExpanded ? 'max-h-full' : 'max-h-28'} overflow-y-hidden`}>{m.message}</p>
                               <div className='flex gap-2 ml-auto w-fit'>
                                   <p className={`${isCurrentUserSender ? 'text-gray-1' : 'text-gray-2'} text-base`}>{`${hour} : ${minute}`}</p>
                                   {m.status == 'sent' && isCurrentUserSender && <FaCheck className='text-gray-1 text-base my-auto' />}
                                   {m.status == 'delivered' && isCurrentUserSender && <FaCheckDouble className='text-action-color-1 my-auto' />}
                               </div>    
                           </div>
                               
                           { !isExpanded && isOverflowed[index] && 
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
   </div> */}