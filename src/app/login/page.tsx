import React from 'react'
import { getAuthenticatedAppForUser } from '../../../lib/firebase/serverApp';
import { redirect } from 'next/navigation';
import LoginUser from './LoginUser';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default async function page({ searchParams }: { searchParams: { message: string } }) {
  const { currentUser } = await getAuthenticatedAppForUser();
  const { message: messageParam } = await searchParams;

  if (currentUser) {
    return redirect("/")
  }

  return (
    <div className='h-[calc(100vh-112px)] flex flex-col justify-center items-center'>
      <Card>
        <CardHeader>
          <CardTitle className='md:text-3xl'>Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginUser />
        </CardContent>
        <CardFooter>
          <div className='flex flex-col gap-1'>
            {messageParam && (
              <p className='text-destructive'>
                {messageParam}
              </p>
            )}
            <div>
              <p className='inline md:text-lg'>Don't have an Account? </p>
              <Link href='/register' className='underline'>Sign up!</Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}