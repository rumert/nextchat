'use client'
import { useChatContext } from '@/app/[chatId]/ChatContext'
import Image from 'next/image'
import React, { FormEvent, useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '../ui/input'
import { SubmitButton } from '../SubmitButton'
import { Send } from 'lucide-react'
import { handleSending } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { FaFile } from 'react-icons/fa6'
  
interface Props {
    chatId: string
    userId: string
}

export default function FileWithDescription({ chatId, userId }: Props) {

    const { isFileWithDescActive, setIsFileWithDescActive, fileToSend }: any = useChatContext()
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
    const handleSendingWithProps = handleSending.bind(null, chatId, userId)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (fileToSend && !fileToSend.type.startsWith('application/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(fileToSend);
        }
    }, [fileToSend])

    async function handleSubmission(e: FormEvent) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append('file', fileToSend);
        const result = await handleSendingWithProps(formData);
        if (result.status === 'success') {
            setIsFileWithDescActive(false)
            router.refresh()
        } else {
            setError(result.status)
        }
    }

  return (
    <Dialog open={isFileWithDescActive} onOpenChange={setIsFileWithDescActive}>
      <DialogContent>
        <DialogTitle>
            Send File
        </DialogTitle>
        {preview && fileToSend && fileToSend.type.startsWith('image/') && (
            <div className='mt-5 h-[50vh] relative'>
                <Image
                    src={preview as string}
                    alt='preview'
                    fill
                    className="rounded-md object-contain"
                />
            </div>
        )}
        {preview && fileToSend && fileToSend.type.startsWith('video/') && (
            <div className='mt-5 h-[50vh] relative'>
                <video
                    controls
                    className="rounded-md object-contain h-full w-full"
                >
                    <source src={preview as string} type={fileToSend.type} />
                    Your browser does not support the video tag.
                </video>
            </div>
        )}
        {!preview && fileToSend && fileToSend.type.startsWith('application/') && (
            <div className='mt-5 h-[50vh] relative flex justify-around items-center break-words'>
                <FaFile className='text-6xl' />
                <h1 className='text-xl max-w-[60%]'>{fileToSend.name}</h1>
            </div>
        )}
        <form onSubmit={handleSubmission} className='flex w-full space-x-2'>
            <Input
              type="text" 
              name='message'
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
      </DialogContent>
    </Dialog>
  )
}
