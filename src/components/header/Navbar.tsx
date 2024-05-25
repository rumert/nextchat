import Link from 'next/link';

function Navbar() {

  return (
    <div className="navbar bg-neutral text-neutral-content px-10 max-w-[1024px] mx-auto rounded-2xl m-2">
      <div className="flex-1">
        <Link href="/" className="hover:text-primary">
          NEXTCHAT
        </Link> 
      </div>
      <div className="flex-none">
        <Link href="/login" className="btn btn-primary">
          REGISTER
        </Link> 
      </div>
    </div>
  )
}

export default Navbar