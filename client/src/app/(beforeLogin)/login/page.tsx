import React from 'react'
import LoginUser from '@/app/components/LoginUser'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../../lib/firebase/firebase';

function page() {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid)
    } else {
      console.log('user is signed out')
    }
  });

  return (
    <div>
        <h1 className='text-center border-b-2 border-purple-700 mb-4'>LOGIN</h1>
        <LoginUser />
    </div>
    
  )
}

export default page