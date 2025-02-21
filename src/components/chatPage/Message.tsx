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
    }, []);
    
    useEffect(() => {
      checkOverflow();
    }, [message]);

    function checkOverflow() {
      const ref = messageRef!.current;
      setIsOverflowed(ref?.scrollHeight !== ref?.clientHeight);
    };

    async function handleDelete() {
      await deleteMessage(message.id, chatId, message.file);
    }

    const date = new Date(message.createdAt.seconds * 1000 + message.createdAt.nanoseconds / 1000000);
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

  return (
    <div className={`text-sm md:text-base group w-max flex items-start ${isCurrentUserSender && 'ml-auto pl-4'}`}>
      {isCurrentUserSender && 
      <button onClick={handleDelete} className='hidden group-hover:flex items-center justify-center text-xl h-7 aspect-square rounded-full mr-2'>
        <MdDelete />
      </button>
      }

      {/* Main Message Container */}
      <div className={`max-w-[60vw] md:max-w-[40vw] flex flex-col gap-2 rounded-lg p-2 ${isCurrentUserSender ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}`}>
        
        {/* Image Display with Dynamic Sizing */}
        {message.file.length > 0 && message.file.includes('IMG') &&
        <div className='relative w-full max-w-[100%] rounded-lg overflow-hidden'>
          <Image
            src={message.file}
            alt='Sent image'
            width={500}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>}

        {/* Video Display */}
        {message.file.length > 0 && message.file.includes('VID') &&
        <div className='w-full max-w-[100%] py-2'>
          <video controls className='w-full rounded-lg'>
            <source src={message.file} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>}

        {/* File Attachments */}
        {message.file.length > 0 && message.file.includes('DOC') &&
        <Link href={message.file} target='_blank' className='rounded-xl hover:bg-secondary w-full flex p-2 items-center gap-2'>
          <FaFile className='text-4xl' />
          <h1 className='text-lg truncate'>
            {decodeURIComponent(message.file).split('/').pop()!.split('?')[0]}
          </h1>
        </Link>}

        {/* Message Text */}
        {message.message.trim().length > 0 && 
        <p ref={messageRef} className={`overflow-hidden mx-3 ${isExpanded ? 'max-h-full' : 'max-h-28 md:max-h-40'}`}>
          {message.message}
        </p>}

        {/* "Read More" Button for Long Messages */}
        { !isExpanded && isOverflowed && 
          <button onClick={() => setIsExpanded(true)} className={`text-xs md:text-sm ${isCurrentUserSender ? 'bg-muted' : 'bg-primary'} rounded-lg mx-3 pl-2 pr-1 ml-auto flex items-center gap-1`}>
            Read More <FaArrowDown />
          </button>
        }

        {/* Timestamp & Status */}
        <div className='flex gap-2 ml-auto w-fit px-3 text-xs'>
          <p>{`${hour}:${minute}`}</p>
          {message.status === 'sent' && isCurrentUserSender && <FaCheck className='text-muted' />}
          {message.status === 'delivered' && isCurrentUserSender && <FaCheckDouble className='text-green-500' />}
        </div>

      </div>
    </div>
  )
}
