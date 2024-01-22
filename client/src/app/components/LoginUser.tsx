'use client'
import  {useRouter}  from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'

function LoginUser() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError]: any = useState(false)
    const router: any = useRouter()

    async function handleLogin(e: any) {
        e.preventDefault()
        const emaill = email
        const passwordd = password
        setEmail('')
        setPassword('')
        const res = await fetch('/api/loginUser', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json', 
            },
            body: JSON.stringify( {emaill, passwordd} )
        })
        const resMes = await res.json()
        if (resMes.mes == 'OK') {router.push('/a')}
        else { setError(resMes.mes) }
    }
  return (
    <form onSubmit={handleLogin}>

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

      <button type='submit' className='border-2 mb-2 block'>LOGIN</button>
      { error && <p>{error}</p> }
      <p className='inline'>Don't have an Account? </p>
      <Link href='/register' className='text-purple-600 underline mb-2'>Sign up!</Link>

    </form>
  )
}

export default LoginUser