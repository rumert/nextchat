'use client'
import { Suspense, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import Circles from "./AuthedNavbar";
import { useRouter } from "next/navigation";
import Loading from "./loading";


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
      <div className="bg-[url('/chat-background.svg')] bg-no-repeat bg-cover flex flex-col h-screen">
        <Suspense fallback={<Loading />}>
          <Circles />
        </Suspense>        
        <form onSubmit={handleAddFriend} className="flex-grow flex flex-col items-center justify-center gap-2 drop-shadow-4xl">
          <input 
            type="text" 
            className='w-32'
            value={addFriend}
            onChange={e => setAddFriend(e.target.value)}
          /> 
          <button type='submit' className="px-1 rounded-xl ">Add a new friend</button>
          {resText ? <p>{resText}</p> : <div className="h-7"></div>}                            
        </form>        
      </div>           
    </div>
  )
}