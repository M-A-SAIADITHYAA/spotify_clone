import { buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { SignedIn } from '@clerk/clerk-react'
import { HomeIcon, Library, MessageSquareIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const LeftSideBar = () => {
    const isLoading = true;
  return (

    <div className="h-full flex flex-col gap-2">
        <div className="rounded-lg bg-zinc-800 p-4">
          <Link to={"/"}
          className={
            cn(
                buttonVariants({
                    variant:"default",
                    className:"w-full justify-start text-white hover:bg-zinc-700"
                })
                
            )
          }>
          <HomeIcon className='size-5'/>
          <span className=" hidden md:inline">Home</span>

          </Link>
          <SignedIn>

          <Link to={"/chat"}
          className={
            cn(
                buttonVariants({
                    variant:"default",
                    className:"w-full justify-start text-white hover:bg-zinc-700"
                })
                
            )
          }>
          <MessageSquareIcon className='size-5'/>
          <span className=" hidden md:inline">message</span>

          </Link>


          </SignedIn>

    
        </div>
        <div className="flex1 rounded-lg bg-zinc-900 p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-white px-2">
                    <Library className='size-5 mr-2'/>
                    <span className="hidden md:inline">Playlist</span>
                </div>
            </div>
            <ScrollArea className="h-[calc(100vh-300px)]">
               <div className="space-y-2">
                {isLoading?(
                    <PlayListSkeletion/>
                ):()}
                    </div> 

            </ScrollArea>
        </div>
    </div>
  )
}

export default LeftSideBar