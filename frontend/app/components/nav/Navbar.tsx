"use client"
import UserMenu from './UserMenu';
import Link from 'next/link';


const Navbar = () => {

  return (
    <div className="w-full navbar bg-base-300">
    <div className="flex-none lg:hidden md:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
  </svg>
        </label>
    </div>
    <div className="flex-1 px-2 mx-2 flex justify-center text-xl">
        <Link href="/home">
            <>TechDocAI</>
        </Link>
    </div>
    <UserMenu />
</div>
  );
};

export default Navbar;
