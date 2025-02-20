'use client'
import React from 'react'
import Navbar from './Navbar';
import UserNavbar from './UserNavbar';
import { useUserSession } from '../../../lib/getUser';
import { User } from 'firebase/auth';

export default function Header({ initialUser }: { initialUser: User | null }) {
    const user = useUserSession(initialUser);
  return user ? (
    <header>
      <UserNavbar userId={user.uid!} />
    </header>
  ) : (
    <header>
      <Navbar />
    </header>
  )
}
