'use client'
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import Circles from "./Circles";
import { useRouter } from "next/navigation";

export default function Main() {
  const route = useRouter()
  const { user }: any = useAuthContext();
  const currentUserName = user.displayName
  const [addFriend, setAddFriend] = useState('')
  const [resText, setResText]: any = useState(null)
  

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
        body: JSON.stringify( { currentUserName, friendName } )
      })
      if (res.ok) {
        const ress = await res.json()
        if(ress.message == "added") {
          route.push(`/${ress.chatId}`)
        } else {
          setResText(ress.message)
        }
      } else {
        setResText('An error occured, please try again')
      }
    }
  }

  return (
    <div className=''>
      <div className="bg-[url('/background.svg')] bg-no-repeat bg-cover flex flex-col h-screen">
        <Circles />
        <form onSubmit={handleAddFriend} className="flex-grow flex flex-col items-center justify-center gap-2">
          <input 
            type="text" 
            className='w-32 border-2 text-primary-color'
            value={addFriend}
            onChange={e => setAddFriend(e.target.value)}
          />
          {resText && <p>{resText}</p>} 
          <button type='submit' className="border-2 px-1">Add a new friend</button>
        </form> 
      </div>           
    </div>
  )
}