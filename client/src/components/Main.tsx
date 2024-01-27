'use client'
import { getMessages } from "../../lib/firebase/firestore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

export default function Main() {
  const [messages, setMessages] = useState([]);
  const [addFriend, setAddFriend] = useState('')
  const { user }: any = useAuthContext();
  const [resText, setResText]: any = useState(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesData = await getMessages();
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

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
        const resMes = await res.json()
        setResText(resMes)
      } else {
        setResText('An error occured, please try again')
      }
    }
  }

  return (
    <div className='flex-grow flex flex-col h-[88vh]'>
      <div className='h-[11vh] border-2 rounded-2xl flex gap-2 pl-4 items-center'>
        <Link href='/' className='h-[10vh] w-[10vh] bg-gray-800 rounded-full'>a</Link>
        <Link href='/' className='h-[10vh] w-[10vh] bg-gray-800 rounded-full'>b</Link>
      </div> {/* Friends */}
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