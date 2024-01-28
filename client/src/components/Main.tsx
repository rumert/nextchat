'use client'
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import Circles from "./Circles";
import { useRouter } from "next/navigation";

export default function Main() {
  const [addFriend, setAddFriend] = useState('')
  const { user }: any = useAuthContext();
  const [resText, setResText]: any = useState(null)
  const route = useRouter()

  async function handleAddFriend(e: any) {
    e.preventDefault()
    const friendName: any = addFriend
    setAddFriend('')
    if (friendName.trim() != '') {
      const res = await fetch('/api/addFriend', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json', 
        },
        body: JSON.stringify( { user, friendName } )
      })
      if (res.ok) {
        const ress = await res.json()
        setResText(ress.message)
        route.push(`/${ress.chatId}`)
      } else {
        setResText('An error occured, please try again')
      }
    }
  }

  return (
    <div className='flex-grow flex flex-col h-[88vh]'>
      <Circles />
      <form onSubmit={handleAddFriend} className="flex-grow flex flex-col items-center justify-center gap-2">
        <input 
          type="text" 
          className='w-32 border-2'
          value={addFriend}
          onChange={e => setAddFriend(e.target.value)}
        />
        {resText && <p>{resText}</p>} 
        <button type='submit' className="border-2 border-purple-600 bg-purple-400">Add a new friend</button>
      </form>
    </div>
  )
}