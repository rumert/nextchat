'use client'
import React from 'react'
import Navbar from './Navbar';
import UserNavbar from './UserNavbar';
import { useUserSession } from '../../../lib/getUser';
import { User } from 'firebase/auth';

export default function Header({ initialUser }: { initialUser: User | {} }) {
    const user = useUserSession(initialUser);
  return user ? (
    <header>
      <UserNavbar nickname={user.displayName!} />
    </header>
  ) : (
    <header>
      <Navbar />
    </header>
  )
}
