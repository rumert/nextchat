'use client'
import React from 'react'
import Main from './Main';
import Phone from './Phone';
import Features from './Features';
import { useAuthContext } from '@/context/AuthContext';

function Home() {
    const { user }: any = useAuthContext();

    return (
      <div>
        {user ? (
          <Main />
        ) : (
          <>
            <Phone />
            <Features />
          </>
        )}
      </div>
    );
  }


export default Home