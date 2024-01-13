'use client'
import React, { useEffect, useState } from 'react'

interface MessageObject {
  sender: string;
  text: string;
}

export default function Chats() {

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<MessageObject[]>([])

  useEffect ( () => {
    async function fetchData() {
      setIsLoading(true)
      const res = await fetch('/api/messages')
      const initialData = await res.json()
      setMessages(initialData.messages)
      setIsLoading(false)
    }
    fetchData()
  }, []) 
  
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (message.trim() !== '') {
      const res = await fetch('/api/messages', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify( message )
      })
    }
    console.log('data sent!')
  }
  return (
    <div className='flex-grow flex flex-col'>
        <div className='h-[11vh] border-2 rounded-2xl flex gap-2 pl-4 items-center'>
          <div className='h-[10vh] w-[10vh] bg-gray-800 rounded-full'>a</div>
          <div className='h-[10vh] w-[10vh] bg-gray-800 rounded-full'>b</div>
        </div> {/* chats navbar */}
        <div className='flex-grow flex flex-col'>
          <div className='flex-grow flex flex-col gap-1'>
            {messages.length != 0 && 
              messages.map( (m: MessageObject, index: number) => {
                return <div key={index}>{m.text}</div>
            })}
          </div> {/* conversation */}
          <form onSubmit={handleSubmit} className='h-[15%] flex'>
            <input 
              type="text" 
              className='h-full w-[80%] border-2'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button type='submit' className='flex-grow border-2'></button>
          </form> {/* typing field*/}
        </div>
    </div>
  )
}