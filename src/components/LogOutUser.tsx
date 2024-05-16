import React from 'react'
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase/firebase';

function LogOutUser ({className}: any) {

    const router = useRouter()

    function handleLogOut() {
      auth._signOut()    
      router.push('/')    
      }

  return (
    <button onClick={handleLogOut} className={className}> Log Out </button>
  )
}

export default LogOutUser