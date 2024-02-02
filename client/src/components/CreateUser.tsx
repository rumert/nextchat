'use client'
import Link from 'next/link'
import React, { useState } from 'react'

function CreateUser() {

    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repPassword, setRepPassword] = useState('')
    const [result, setResult]: any = useState('')

    async function handleRegister(e: any) {
        e.preventDefault()
        if (password != repPassword) {
          setResult('Passwords do not match')
        } else {
          const res: any = await fetch('/api/createUser', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json', 
            },
            body: JSON.stringify( { nickname, email, password } )
          })
          const resMes = await res.json();
          res.ok ? setResult(resMes) : setResult('An error occured, please try again')
          setNickname('')
          setEmail('')
          setPassword('')
          setRepPassword('')
        } 
    }

  return (
    <form onSubmit={handleRegister} className='h-[90%] text-black text-lg '>

      <input 
        type="text" 
        id='nickname' 
        value={nickname}
        onChange={e => setNickname(e.target.value)} 
        className='border-2 mb-4 pl-4 w-full h-10' 
        placeholder='NICKNAME'
        required
      />

      <input 
        type="email" 
        id='email' 
        value={email}
        onChange={e => setEmail(e.target.value)} 
        className='border-2 block mb-4 pl-4 w-full h-10' 
        placeholder='EMAIL'
        required
      />

      <input 
        type="password" 
        id='password'
        minLength={6}
        value={password} 
        onChange={e => setPassword(e.target.value)}
        className='border-2 block mb-4 pl-4 w-full h-10'
        placeholder='PASSWORD'
        required
      />

      <input 
        type="password" 
        id='repPassword'
        minLength={6}
        value={repPassword} 
        onChange={e => setRepPassword(e.target.value)}
        className='border-2 block mb-4 pl-4 w-full h-10'
        placeholder='REPEAT YOUR PASSWORD'
        required
      />

      <button type='submit' className='w-full h-10 bg-gradient-to-r from-action-color to-[#FCC3C3] border-2 border-primary-color text-my-text-color rounded-2xl mb-2'>CREATE</button>
      {<p className='text-my-text-color'>{result}</p>}
      <p className='inline text-my-text-color pl-4'>Or already </p>
      <Link href='/login' className='text-action-color underline mb-2'>have an account?</Link>

    </form>
  )
}

export default CreateUser