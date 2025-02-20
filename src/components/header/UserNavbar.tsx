'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from '../../../lib/firebase/auth';
import { AvatarType, getAvatars } from '../../../lib/firebase/firestore';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

export default function UserNavbar({ userId }: { userId: string }) {

  const [userAvatar, setUserAvatar] = useState<AvatarType | null>(null)
  const [chatAvatars, setChatAvatars] = useState<AvatarType[] | []>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {

    async function getData() {
      const data = await getAvatars(userId)
      setUserAvatar(data.find(avatar => avatar.userId === userId)!);
      setChatAvatars(data.filter(avatar => avatar.userId !== userId));
      setIsLoading(false)
    }       
    getData()
  }, [userId])

  async function handleLogOut(e: any) {
    e.preventDefault()
    signOut();    
    router.push('/')    
  }
  
  return (
    <div className='flex md:flex-col-reverse md:h-screen md:fixed md:left-0 items-center gap-2 p-1'>

      <div className='flex-1 border-2 rounded-xl flex md:flex-col items-center gap-2 py-1 px-2 w-22'>

        {isLoading &&
          [0,1,2].map( (index: number) => {
          return  <Skeleton key={index} className="h-16 w-16 rounded-full" /> 
        })}
        
        {chatAvatars.length != 0 && !isLoading &&
          chatAvatars.map( (avatar, index: number) => {
          return  (
            <Link href={`/${avatar.chatId}`} key={index}>
              <Avatar className='w-16 h-16'>
                <AvatarImage src={avatar.profilePic} />
              </Avatar>
            </Link>  
          )
        })}

      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className='w-16 h-16'>
            <AvatarImage src={userAvatar?.profilePic} />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href='/'>
              Add a Friend
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <button onClick={handleLogOut} className='h-full w-full'>
              Log Out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    
    </div>
  )
}