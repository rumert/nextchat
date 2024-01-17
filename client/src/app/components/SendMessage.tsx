'use client'
import React, { useState } from 'react'

function SendMessage() {

  const [inputVal, setInputVal] = useState('')

  async function handleSubmit(e: any){
      e.preventDefault()
      if (inputVal.trim() != '') {
        const text = inputVal
        const message = { sender: "sender", text: text }
        const res = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json', 
          },
          body: JSON.stringify({ message })
        })
      }
      
  }
  return (
    <form onSubmit={handleSubmit} className='h-[15%] flex'>
      <input 
          type="text" 
          className='h-full w-[80%] border-2'
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
      /> 
      <button type='submit' className='flex-grow border-2'></button>
    </form>
  )
}

export default SendMessage