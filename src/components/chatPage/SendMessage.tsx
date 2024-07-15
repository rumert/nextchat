'use client'
import React, { FormEvent, useState } from 'react'
import { SubmitButton } from '../SubmitButton';
import { Input } from '../ui/input';
import { Send } from 'lucide-react';
import { Button } from '../ui/button';
import { FaFileLines, FaImages, FaPaperclip, FaVideo } from 'react-icons/fa6';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { handleSending } from '@/app/actions';
import { LabelForFile } from '../ui/labelForFile';
import { useChatContext } from '@/app/[chatId]/ChatContext';
import { useRouter } from 'next/navigation';

interface Props {
  chatId: string
  username: string
}

export default function SendMessage({ chatId, username }: Props) {

  const handleSendingWithProps = handleSending.bind(null, chatId, username)
  const { setIsFileWithDescActive, setFileToSend }: any = useChatContext()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [message, setMessage] = useState('')

  async function handleSubmission(e: FormEvent) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const result = await handleSendingWithProps(formData);
    if (result.status === 'success') {
      setIsFileWithDescActive(false)
      setMessage('')
      router.refresh()
    } else {
      setError(result.status)
    }
  }

  async function handleFileSubmission(e: FormEvent) {
    e.preventDefault()
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      setIsFileWithDescActive(true)
      setFileToSend(file)
    }
  }

  return (
    
    <div className="w-full flex items-center">
      <form onChange={handleFileSubmission}>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='ghost'>
              <FaPaperclip className='text-lg' />
            </Button>
          </PopoverTrigger>
          <PopoverContent>

            <LabelForFile>
              <input type="file" accept="image/*" className="hidden" />
              <FaImages />
              Photo
            </LabelForFile>

            <LabelForFile>
              <input type="file" accept="video/*" className="hidden" />
              <FaVideo />
              Video
            </LabelForFile>

            <LabelForFile>
              <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
              <FaFileLines />
              Document
            </LabelForFile>

          </PopoverContent>
        </Popover>
      </form>
      <form onSubmit={handleSubmission} className='flex w-full space-x-2'>
        <Input
          name='message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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