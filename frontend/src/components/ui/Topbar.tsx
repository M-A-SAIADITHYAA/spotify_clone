import SignInOAuthButtons from '@/components/SignInOAuthButtons';
import { useAuthStore } from '@/stores/useAuthStore';
import { SignedIn, SignedOut, SignOutButton, UserButton } from '@clerk/clerk-react';
// import { link } from 'fs';
import { LayoutDashboardIcon } from 'lucide-react';
// import React from 'react'
import { Link } from 'react-router-dom';
import { buttonVariants } from './button';
import { cn } from '@/lib/utils';

function Topbar() {

    const {isAdmin} = useAuthStore()
    
  return (
    <div className='flex items-center justify-between top-0 bg-zinc-700/75 backdrop:blur-md z-10 gap-4'>
        <div className="flex gap-2 items-center">
        <img src="/spotify.png"  className="size-12 m-3" alt="" />

            Spotify
        </div>
        <div className="flex items-center gap-4 p-4">
            {isAdmin && (
                <Link to ={"/admin"} className={cn(buttonVariants({ variant: "outline" }))}>
                    <LayoutDashboardIcon className=" mr-2"/>
                        Admin Dashboard
                    
                </Link>
            )}
             
             
            <SignedOut>
                <SignInOAuthButtons/>
            </SignedOut>
            <UserButton/>
        </div>
    </div>
  )
}

export default Topbar