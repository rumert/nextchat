'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from '../../../lib/firebase/auth';
import { getIdToken } from 'firebase/auth';
import Navbar from './Navbar';
import UserNavbar from './UserNavbar';
import { removeCookie, setCookie } from '@/app/actions';

function useUserSession(initialUser: any) {
    // The initialUser comes from the server via a server component
    const [user, setUser] = useState(initialUser);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(async (authUser: any) => {
            setUser(authUser);

            if (authUser) {
                const token = await getIdToken(authUser, true);
                setCookie('idToken', token );
            } else {
                removeCookie('idToken');
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        onAuthStateChanged((authUser: any) => {
            if (user === undefined) return

            // refresh when user changed to ease testing
            if (user?.email !== authUser?.email) {
                router.refresh()
            }
        })
        
    }, [user])

    return user;
}

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
