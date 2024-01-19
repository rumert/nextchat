'use client'
import React from 'react'
import { MdDelete } from "react-icons/md";


export async function handleDelete(m: any) {
    const res = await fetch('/api/deleteMessage', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json', 
      },
      body: JSON.stringify({ m })
    })
    
}

function DeleteMessage(m: any) {
  return (
    <button onClick={() => handleDelete(m)} className='inline text-xl'><MdDelete /></button>
  )
}

export default DeleteMessage