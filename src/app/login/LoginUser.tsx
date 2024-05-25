'use client'
import React, { useState } from 'react'
import { signInUser } from '../../../lib/firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginUser({ message }: any) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
  
    async function handleLogin(e: any) {
      e.preventDefault();
      try {
        await signInUser(email, password);
        router.push('/');
      } catch (err: any) {
        console.error(err);
        router.push(`/login/?message=${err.message}`);
      }
    };

  return (
    <form onSubmit={handleLogin} className='h-[90%] text-black text-lg'>

        <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='border-2 mb-4 pl-4 w-full h-10' 
        placeholder='EMAIL'
        required
        />

        <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={6}
        className='border-2 mb-4 pl-4 w-full h-10'
        placeholder='PASSWORD'
        required
        />

        <button type="submit" className='w-full h-10 rounded-2xl mb-2 text-my-text-color'>
            LOGIN
        </button>
        {message && (
          <p>
            {message}
          </p>
        )}
        <p className='inline text-my-text-color pl-2'>Don't have an Account? </p>
        <Link href='/register' className='text-action-color-1 underline mb-2'>Sign up!</Link>
        
    </form>
  )
}
