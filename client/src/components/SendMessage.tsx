'use client'
import { useAuthContext } from '@/context/AuthContext';
import React, { useState } from 'react'

function SendMessage({ chatId }: any) {

  const { user }: any = useAuthContext();
  const currentUserName = user.displayName
  const [inputVal, setInputVal] = useState('')

  async function handleSubmit(e: any){
    e.preventDefault()
    const text = inputVal
    setInputVal('')  
    if (text.trim() != '') {
      const res = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json', 
        },
        body: JSON.stringify({ currentUserName, text, chatId })
      })
    }
    
  }
  return (
    <form onSubmit={handleSubmit} className='h-[10%] flex'>
      <input 
          type="text" 
          className='h-full w-[80%] border-2 bg-base-color-2'
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
      /> 
      <button type='submit' className='flex-grow border-2 rounded-2xl bg-[#262045]'>SEND</button>
    </form>
  )
}

export default SendMessage