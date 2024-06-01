import { SubmitButton } from '@/components/SubmitButton'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { createUser } from '../../../lib/firebase/firestore'
import { getAuthenticatedAppForUser } from '../../../lib/firebase/serverApp'
export default async function page({ searchParams }: any) {

  const { currentUser } = await getAuthenticatedAppForUser();

  if (currentUser) {
    return redirect("/")
  }

  async function handleRegister(formData: FormData) {
    "use server"
    const { 
      nickname, 
      email, 
      password, 
      repPassword 
    } = Object.fromEntries(formData.entries()) as Record<string, string>;
    let redirectPath: string;

    if (password != repPassword) {
      redirectPath = "/register/?message=Passwords do not match"
    } else {
      try {
        await createUser(email, password, nickname)
        redirectPath = "/register?message=User created, verification email sent!"
      } catch (err: any) {
        console.error( err );
        redirectPath = `/register/?message=${err.message}`
      } finally {
        return redirect(redirectPath!)
      }
    }
  }

  return (
    <div className='h-screen flex flex-col justify-center bg-chat_background'>
      <div className='bg-opacity-30 bg-gray-1 border border-base-color-2 shadow-lg shadow-base-color-2 rounded-2xl mx-12 h-[80vh] py-16 px-6'>
        <h1 className='text-center mb-4 text-2xl'>REGISTER</h1>
        <form className='h-[90%] text-black text-lg '>

          <input 
            type="text" 
            name='nickname'  
            className='border-2 mb-4 pl-4 w-full h-10' 
            placeholder='NICKNAME'
            required
          />

          <input 
            type="email" 
            name='email'
            className='border-2 block mb-4 pl-4 w-full h-10' 
            placeholder='EMAIL'
            required
          />

          <input 
            type="password" 
            name='password'
            minLength={6}
            className='border-2 block mb-4 pl-4 w-full h-10'
            placeholder='PASSWORD'
            required
          />

          <input 
            type="password" 
            name='repPassword'
            minLength={6}
            className='border-2 block mb-4 pl-4 w-full h-10'
            placeholder='REPEAT YOUR PASSWORD'
            required
          />

          <SubmitButton
            formAction={handleRegister}
            className='w-full h-10 rounded-2xl mb-2 text-my-text-color'
            pendingText="Please Wait..."
          >
            CREATE
          </SubmitButton>         
          {searchParams.message && (
            <p>
              {searchParams.message}
            </p>
          )}
          <p className='inline text-my-text-color pl-4'>Or already </p> 
          <Link href='/login' className='text-action-color-1 underline mb-2'>
            have an account?
          </Link>
        </form>
      </div>
    </div>
    
  )
}