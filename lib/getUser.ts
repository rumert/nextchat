'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { getIdToken, User } from 'firebase/auth';
import { removeCookie, setCookie } from '@/app/actions';
import { onAuthStateChanged } from './firebase/auth';

export function useUserSession(initialUser: User | {}) {
    // The initialUser comes from the server via a server component
    const [user, setUser] = useState<User | null>(initialUser);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(async (authUser) => {
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
        onAuthStateChanged((authUser) => {
            if (user === undefined) return

            // refresh when user changed to ease testing
            if (user?.email !== authUser?.email) {
                router.refresh()
            }
        })
        
    }, [user])

    return user;
}