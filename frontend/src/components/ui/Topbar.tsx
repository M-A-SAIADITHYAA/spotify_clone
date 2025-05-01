import SignInOAuthButtons from '@/components/SignInOAuthButtons';
import { SignedIn, SignedOut, SignOutButton } from '@clerk/clerk-react';
// import { link } from 'fs';
import { LayoutDashboardIcon } from 'lucide-react';
// import React from 'react'
import { Link } from 'react-router-dom';

function Topbar() {
    const isAdmin = false;
  return (
    <div className='flex items-center justify-between top-0 bg-zinc-700/75 backdrop:blur-md z-10'>
        <div className="flex gap-2 items-center">
            Spotify
        </div>
        <div className="flex items-center gap-4">
            {isAdmin && (
                <Link to ={"/admin"}>
                    <LayoutDashboardIcon className="size-4 mr-2">
                        Admin Dashboard
                    </LayoutDashboardIcon>
                </Link>
            )}
             
             <SignedIn>
                <SignOutButton/>
             </SignedIn>
            <SignedOut>
                <SignInOAuthButtons/>
            </SignedOut>
        </div>
    </div>
  )
}

export default Topbar