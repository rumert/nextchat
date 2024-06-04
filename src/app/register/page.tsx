import { SubmitButton } from '@/components/SubmitButton'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { createUser } from '../../../lib/firebase/firestore'
import { getAuthenticatedAppForUser } from '../../../lib/firebase/serverApp'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
    <div className='h-[calc(100vh-112px)] flex flex-col justify-center items-center'>
      <Card>
        <CardHeader>
          <CardTitle className='md:text-3xl'>Create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleRegister}>

            <Label htmlFor="nickname" className='md:text-xl'>Nickname</Label>
            <Input 
            type="text" 
            id="nickname"
            name='nickname'
            className='text-lg mb-4 md:text-xl md:h-12 md:w-96'
            required
            />

            <Label htmlFor="email" className='md:text-xl'>Email</Label>
            <Input 
            type="email" 
            id="email"
            name='email'
            className='text-lg mb-4 md:text-xl md:h-12 md:w-96'
            required
            />

            <Label htmlFor="password" className='md:text-xl'>Password</Label>
            <Input 
            type="password" 
            id="password"
            name='password'
            className='text-lg mb-4 md:text-xl md:h-12 md:w-96'
            minLength={6}
            required
            />

            <Label htmlFor="repPassword" className='md:text-xl'>Repeat your password</Label>
            <Input 
            type="password" 
            id="repPassword"
            name='repPassword'
            className='text-lg mb-4 md:text-xl md:h-12 md:w-96'
            minLength={6}
            required
            />

            <SubmitButton
              pendingText="Creating..."
              className='md:h-11 md:rounded-md md:text-xl'
            >
              Create
            </SubmitButton> 

          </form>
        </CardContent>
        <CardFooter>
          <div className='flex flex-col gap-1'>
            {searchParams.message && (
              <p className='text-destructive'>
                {searchParams.message}
              </p>
            )}
            <div>
              <p className='inline md:text-lg'>Or already </p>
              <Link href='/login' className='underline'>have an acocunt?</Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}