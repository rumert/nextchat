import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FaArrowDown, FaCheck, FaCheckDouble, FaFile } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { deleteMessage } from '../../../lib/firebase/firestore';
import { MessageType } from '@/app/[chatId]/page';
import Image from 'next/image';
import Link from 'next/link';

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
      await deleteMessage(message.id, chatId, message.file)
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
      <div className={`max-w-[40vw] md:max-w-[20vw] flex flex-col gap-1 rounded-lg py-2 break-words ${isCurrentUserSender ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}`}>
        
        {message.file.length > 0 && message.file.includes('IMG') &&
        <div className='w-[40vw] md:w-[10vw] aspect-square relative'>
          <Image
          src={message.file}
          alt='image'
          fill
          className="rounded-md object-contain px-2"
          />
        </div>}
        
        {message.file.length > 0 && message.file.includes('VID') &&
        <div className='w-[40vw] md:w-[20vw] py-4'>
          <iframe 
          src={message.file}
          allowFullScreen={true}
          className='w-4/5 aspect-video mx-auto'
          />
        </div>
        }

        {message.file.length > 0 && message.file.includes('DOC') &&
        <Link href={message.file} target='_blank' className='rounded-xl hover:bg-secondary w-[40vw] md:w-[15vw] py-4 flex justify-around items-center break-words'>
          <FaFile className='text-6xl' />
          <h1 className='text-xl max-w-[60%]'>
            {decodeURIComponent(message.file).split('/').pop()!.split('?')[0].split('/').pop()} {/* name of the file extracted from the url */}
          </h1>
        </Link>
        }

        <p ref={messageRef} className={`overflow-y-hidden mx-3 ${isExpanded ? 'max-h-full' : 'max-h-28 md:max-h-40'} `}>
          {message.message}
        </p>

        { !isExpanded && isOverflowed && 
          <button onClick={() => setIsExpanded(true)} className={`${isCurrentUserSender ? 'bg-muted' : 'bg-primary'} rounded-lg mx-3 pl-2 pr-1 ml-auto flex items-center gap-1 text-xs md:text-sm`}>
            Read More
            <FaArrowDown />
          </button>
        }

        <div className='flex gap-2 ml-auto w-fit px-3'>
          <p className='text-xs'>{`${hour} : ${minute}`}</p>
          {message.status == 'sent' && isCurrentUserSender && <FaCheck className='text-muted text-base my-auto' />}
          {message.status == 'delivered' && isCurrentUserSender && <FaCheckDouble className='text-green-500 my-auto' />}
        </div>

      </div>
    </div>
  )
}
