'use client'
import React from 'react'
import { SubmitButton } from '../SubmitButton';
import { Input } from '../ui/input';
import { Send } from 'lucide-react';
import { Button } from '../ui/button';
import { FaFileImage, FaPaperclip } from 'react-icons/fa6';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { handleSending } from '@/app/actions';

interface Props {
  chatId: string
  username: string
}

export default function SendMessage({ chatId, username }: Props) {

  const handleSendingWithProps = handleSending.bind(null, chatId, username)

  return (
    
    <div className="w-full flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='ghost'>
            <FaPaperclip className='text-lg' />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className='flex items-center gap-1'>
            <FaFileImage />
            Upload Image
          </div>
          <div className='flex items-center gap-1'>
            <FaFileImage />
            Upload Image
          </div>
          <div className='flex items-center gap-1'>
            <FaFileImage />
            Upload Image
          </div>
        </PopoverContent>
      </Popover>
      <form action={handleSendingWithProps} className='flex w-full space-x-2'>
        <Input
          name='message'
          type="text" 
          placeholder="Type your message..."
          className='flex-1'
        />
        <SubmitButton
          className='rounded-lg text-xl'
          pendingText="Sending..."
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </SubmitButton> 
      </form>
    </div>
  )
}