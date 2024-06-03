import Link from 'next/link';
import { Button } from '../ui/button';

export default function Navbar() {

  return (
    <nav className="w-10/12 max-w-[1024px] mx-auto rounded-lg flex justify-between items-center mt-2 mb-12 py-2 px-8 bg-secondary">
      <Link href="/" className='className="text-lg font-semibold hover:text-primary'>
        nextchat
      </Link>
      <Button className='text-lg' asChild>
        <Link href="/login">Login</Link>
      </Button>
    </nav>
  )
}