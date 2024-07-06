'use client'
import React, { FormEvent, useState } from 'react'
import { signInUser } from '../../../lib/firebase/firestore';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function LoginUser() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
  
    async function handleLogin(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()

      try {
        await signInUser(email, password);
        router.push('/');
      } catch (err: any) {
        console.error(err);
        router.push(`/login/?message=${err.message}`);
      }
    };

  return (
    <form onSubmit={handleLogin}>

        <Label htmlFor="email" className='md:text-xl'>Email</Label>
        <Input 
        type="email" 
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='text-lg mb-4 md:text-xl md:h-12 md:w-96'
        required
        />

        <Label htmlFor="password" className='md:text-xl'>Password</Label>
        <Input 
        type="password" 
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={6}
        className='text-lg mb-4 md:text-xl md:h-12 md:w-96'
        required
        />

        <Button type="submit" className='md:h-11 md:rounded-md md:text-xl'>
          Sign in
        </Button>
        
    </form>
  )
}
