import React from 'react'
import { MdDelete } from "react-icons/md";
import { deleteMessage } from '../../../lib/firebase/firestore';

export default function DeleteMessage({ mId, chatId }: any) {

  async function handleDelete() {
    await deleteMessage(mId, chatId)
  }

  return (
    <button onClick={handleDelete} className='flex items-center justify-center text-xl h-7 aspect-square rounded-full bg-gradient-to-r from-action-color-1 to-action-color-2'>
      <MdDelete />
    </button>
  )
}