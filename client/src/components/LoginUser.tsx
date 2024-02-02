'use client'
import  {useRouter}  from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'
import signInEmPass from '../../lib/firebase/auth'

function LoginUser() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError]: any = useState(null)
    const router: any = useRouter()

    async function handleLogin(e: any) {
        e.preventDefault()
        const { result, error }: any = await signInEmPass(email, password)
        if ( error ) {
          // Display and log any sign-in errors
          console.log( error );
          setError(error)
          return;
        }
        else { 
          //console.log(result)
          router.push('/')
        }
    }
  return (
    <form onSubmit={handleLogin} className='h-[90%] text-black text-lg '>
     
      <input 
        type="email" 
        id='email' 
        value={email}
        onChange={e => setEmail(e.target.value)} 
        className='border-2 mb-4 pl-4 w-full h-10' 
        placeholder='EMAIL'
        required
      />

      <input 
        type="password" 
        id='password'
        minLength={6}
        value={password} 
        onChange={e => setPassword(e.target.value)}
        className='border-2 mb-4 pl-4 w-full h-10'
        placeholder='PASSWORD'
        required
      />

      <button type='submit' className='w-full h-10 bg-gradient-to-r from-action-color to-[#FCC3C3] border-2 border-primary-color text-my-text-color rounded-2xl mb-2'>LOGIN</button>
      { error && <p className='text-my-text-color'>{error}</p> }
      <p className='inline text-my-text-color pl-2'>Don't have an Account? </p>
      <Link href='/register' className='text-action-color underline mb-2'>Sign up!</Link>

    </form>
  )
}

export default LoginUser