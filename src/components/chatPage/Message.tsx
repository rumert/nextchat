import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FaArrowDown, FaCheck, FaCheckDouble } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { deleteMessage } from '../../../lib/firebase/firestore';
import { MessageType } from '@/app/[chatId]/page';

interface Props {
  message: MessageType
  isCurrentUserSender: boolean
  chatId: string
}

export default function Message({ message, isCurrentUserSender, chatId }: Props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowed, setIsOverflowed] = useState(false)
    const messageRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
      checkOverflow();
    }, [])
    
    useEffect(() => {
      checkOverflow();
    }, [message])

    function checkOverflow () {
      const ref = messageRef!.current;
      setIsOverflowed(ref?.scrollHeight !== ref?.clientHeight);
    };

    async function handleDelete() {
      await deleteMessage(message.id, chatId)
    }

    const date = new Date(message.createdAt.seconds * 1000 + message.createdAt.nanoseconds / 1000000);
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

  return (
    <div className={`text-sm md:text-base group w-max flex items-start ${isCurrentUserSender && 'ml-auto pl-4'}`}>
      { isCurrentUserSender && 
      <button onClick={handleDelete} className='hidden group-hover:flex items-center justify-center text-xl h-7 aspect-square rounded-full mr-2'>
        <MdDelete />
      </button>
      }
      <div className={`max-w-[40vw] md:max-w-[20vw] flex flex-col gap-1 rounded-lg px-3 py-2 break-words ${isCurrentUserSender ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}`}>
        <p ref={messageRef} className={`overflow-y-hidden ${isExpanded ? 'max-h-full' : 'max-h-28 md:max-h-40'} `}>
          {message.message}
        </p>
        { !isExpanded && isOverflowed && 
          <button onClick={() => setIsExpanded(true)} className={`${isCurrentUserSender ? 'bg-muted' : 'bg-primary'} rounded-lg pl-2 pr-1 ml-auto flex items-center gap-1 text-xs md:text-sm`}>
            Read More
            <FaArrowDown />
          </button>
        }
        <div className='flex gap-2 ml-auto w-fit'>
          <p className='text-xs'>{`${hour} : ${minute}`}</p>
          {message.status == 'sent' && isCurrentUserSender && <FaCheck className='text-muted text-base my-auto' />}
          {message.status == 'delivered' && isCurrentUserSender && <FaCheckDouble className='text-green-500 my-auto' />}
        </div>
      </div>
    </div>
  )
}
