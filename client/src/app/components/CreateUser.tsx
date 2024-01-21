'use client'
import React, { useState } from 'react'

function CreateUser() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e: any) {
        e.preventDefault()
        const emaill = email
        const passwordd = password
        setEmail('')
        setPassword('')
        const res = await fetch('/api/createUser', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json', 
            },
            body: JSON.stringify( {emaill, passwordd} )
        })
    }

  return (
    <form onSubmit={handleSubmit}>

      <label htmlFor="email">email: </label>
      <input 
        type="email" 
        id='email' 
        value={email}
        onChange={e => setEmail(e.target.value)} 
        className='border-2 block mb-4' 
        required
      />

      <label htmlFor="password">password: </label>
      <input 
        type="password" 
        id='password'
        minLength={6}
        value={password} 
        onChange={e => setPassword(e.target.value)}
        className='border-2 block mb-4'
        required
      />

      <button type='submit' className='border-2 mb-4'>CREATE</button>

    </form>
  )
}

export default CreateUser