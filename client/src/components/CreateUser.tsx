'use client'
import Link from 'next/link'
import React, { useState } from 'react'

function CreateUser() {

    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [created, setCreated]: any = useState('')

    async function handleRegister(e: any) {
        e.preventDefault()
        const res: any = await fetch('/api/createUser', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json', 
            },
            body: JSON.stringify( { nickname, email, password } )
        })
        const resMes = await res.json();
        res.ok ? setCreated(resMes) : setCreated('An error occured, please try again')
        setNickname('')
        setEmail('')
        setPassword('')
    }

  return (
    <form onSubmit={handleRegister}>

      <label htmlFor="nickname">Nickname: </label>
      <input 
        type="text" 
        id='nickname' 
        value={nickname}
        onChange={e => setNickname(e.target.value)} 
        className='border-2 block mb-4' 
        required
      />

      <label htmlFor="email">Email: </label>
      <input 
        type="email" 
        id='email' 
        value={email}
        onChange={e => setEmail(e.target.value)} 
        className='border-2 block mb-4' 
        required
      />

      <label htmlFor="password">Password: </label>
      <input 
        type="password" 
        id='password'
        minLength={6}
        value={password} 
        onChange={e => setPassword(e.target.value)}
        className='border-2 block mb-4'
        required
      />

      <button type='submit' className='border-2 mb-2'>CREATE</button>
      {<p>{created}</p>}
      <p className='inline'>Or already </p>
      <Link href='/login' className='text-purple-600 underline mb-2'>have an account?</Link>

    </form>
  )
}

export default CreateUser