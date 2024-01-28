'use client'
import React from 'react'
import { MdDelete } from "react-icons/md";


export async function handleDelete({ mId, chatId }: any) {
    const res = await fetch('/api/deleteMessage', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json', 
      },
      body: JSON.stringify( {mId, chatId} )
    })
    
}

function DeleteMessage(id: any) {
  return (
    <button onClick={() => handleDelete(id)} className='inline text-xl'><MdDelete /></button>
  )
}

export default DeleteMessage