'use client'
import React, { useState } from 'react'

export default function Chats() {

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    if (message.trim() !== '') {
      const res = await fetch('/api/messages', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ message })
      })
    }
    setIsLoading(false)
  }
  
  return (
    <div className='flex-grow flex flex-col'>
        <div className='h-[11vh] border-2 rounded-2xl flex gap-2 pl-4 items-center'>
          <div className='h-[10vh] w-[10vh] bg-gray-800 rounded-full'>a</div>
          <div className='h-[10vh] w-[10vh] bg-gray-800 rounded-full'>b</div>
        </div> {/* chats navbar */}
        <div className='flex-grow flex flex-col'>
          <div className='flex-grow'></div> {/* conversation */}
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