'use client'
import React from 'react'
import { MdDelete } from "react-icons/md";


export async function handleDelete({ mId, chatId }: any) {
    const res = await fetch('/api/deleteMessage', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json', 
      },
      body: JSON.stringify({ mId, chatId })
    })
    
}

function DeleteMessage(id: any) {
  return (
    <button
      onClick={() => handleDelete(id)} 
      className='flex items-center justify-center text-xl h-full aspect-square rounded-full bg-action-color'
    >
      <MdDelete />
    </button>
  )
}

export default DeleteMessage