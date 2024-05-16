'use client'
import  {useRouter}  from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'
import signInEmPass from '../../lib/firebase/auth'

function LoginUser() {
    const router: any = useRouter()
    const [formData, setFormData]: any = useState({      
      email: '',
      password: '',      
      error: null
    })

    async function handleLogin(e: any) {
        e.preventDefault()
        const { result, error }: any = await signInEmPass(formData.email, formData.password)
        if ( error ) {
          setFormData( (prevData: any) => ({ ...prevData, error: error }) )
          return;
        }
        else {           
          router.push('/')
        }
    }
  return (
    <form onSubmit={handleLogin} className='h-[90%] text-black text-lg'>
     
      <input 
        type="email" 
        id='email' 
        value={formData.email}
        onChange={e => setFormData( (prevData: any) => ({ ...prevData, email: e.target.value }) )} 
        className='border-2 mb-4 pl-4 w-full h-10' 
        placeholder='EMAIL'
        required
      />

      <input 
        type="password" 
        id='password'
        minLength={6}
        value={formData.password} 
        onChange={e => setFormData( (prevData: any) => ({ ...prevData, password: e.target.value }) )}
        className='border-2 mb-4 pl-4 w-full h-10'
        placeholder='PASSWORD'
        required
      />

      <button 
        type='submit' 
        className='w-full h-10 rounded-2xl mb-2 text-my-text-color'
      >
        LOGIN
      </button>
      { formData.error && <p className='text-primary-color'>{formData.error}</p> }
      <p className='inline text-my-text-color pl-2'>Don't have an Account? </p>
      <Link href='/register' className='text-action-color-1 underline mb-2'>Sign up!</Link>

    </form>
  )
}

export default LoginUser