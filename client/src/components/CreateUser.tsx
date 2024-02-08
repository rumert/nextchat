'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function CreateUser() {

    const router = useRouter()
    const [formData, setFormData]: any = useState({
      nickname: '',
      email: '',
      password: '',
      repPassword: '',
      result: ''
    })

    async function handleRegister(e: any) {
      e.preventDefault()
      if (formData.password != formData.repPassword) {
        setFormData( (prevData: any) => ({ ...prevData, result: 'Passwords do not match' }) )
      } else {
        setFormData((prevData: any) => ({ ...prevData, result: 'please wait... '}))
        const res: any = await fetch('/api/createUser', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json', 
          },
          body: JSON.stringify({ 
            nickname: formData.nickname,
            email: formData.email,
            password: formData.password 
          })
        })
        const resMes = await res.json();
        if (res.ok) {
          if (resMes == 'User created. Verification email sent!') {
            setFormData({
              nickname: '',
              email: '',
              password: '',
              repPassword: '',
              result: resMes
            })
            setTimeout(() => {
              router.push('/login');
            }, 1000);
          } else {
            setFormData((prevData: any) => ({ ...prevData, result: resMes }))
          }            
        } else {
          setFormData({
            nickname: '',
            email: '',
            password: '',
            repPassword: '',
            result: 'An error occured, please try again'
          })
        }              
      } 
    }

  return (
    <form onSubmit={handleRegister} className='h-[90%] text-black text-lg '>

      <input 
        type="text" 
        id='nickname' 
        value={formData.nickname}
        onChange={e => setFormData((prevData: any) => ({ ...prevData, nickname: e.target.value}))} 
        className='border-2 mb-4 pl-4 w-full h-10' 
        placeholder='NICKNAME'
        required
      />

      <input 
        type="email" 
        id='email' 
        value={formData.email}
        onChange={e => setFormData((prevData: any) => ({ ...prevData, email: e.target.value}))} 
        className='border-2 block mb-4 pl-4 w-full h-10' 
        placeholder='EMAIL'
        required
      />

      <input 
        type="password" 
        id='password'
        minLength={6}
        value={formData.password} 
        onChange={e => setFormData((prevData: any) => ({ ...prevData, password: e.target.value}))}
        className='border-2 block mb-4 pl-4 w-full h-10'
        placeholder='PASSWORD'
        required
      />

      <input 
        type="password" 
        id='repPassword'
        minLength={6}
        value={formData.repPassword} 
        onChange={e => setFormData((prevData: any) => ({ ...prevData, repPassword: e.target.value}))}
        className='border-2 block mb-4 pl-4 w-full h-10'
        placeholder='REPEAT YOUR PASSWORD'
        required
      />

      <button type='submit' className='w-full h-10 rounded-2xl mb-2'>CREATE</button>
      <p className={formData.result === 'User created. Verification email sent!' ? 'text-action-color' : 'text-primary-color'}> {formData.result} </p>
      <p className='inline text-my-text-color pl-4'>Or already </p>
      <Link href='/login' className='text-action-color underline mb-2'>have an account?</Link>
    </form>
  )
}

export default CreateUser