import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase/firebase';
import { useRouter } from 'next/navigation';

function LogOutUser ({className}: any) {

    const router = useRouter()

    function handleLogOut() {
        router.push('/')
        signOut(auth)        
      }

  return (
    <button onClick={handleLogOut} className={className}> Log Out </button>
  )
}

export default LogOutUser