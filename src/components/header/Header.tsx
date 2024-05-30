'use client'
import React from 'react'
import Navbar from './Navbar';
import UserNavbar from './UserNavbar';
import { useUserSession } from '../../../lib/getUser';

export default function Header({ initialUser }: any) {
    const user = useUserSession(initialUser);
  return user ? (
    <header>
        <UserNavbar user={user} />
    </header>
  ) : (
    <header>
        <Navbar />
    </header>
  )
}
