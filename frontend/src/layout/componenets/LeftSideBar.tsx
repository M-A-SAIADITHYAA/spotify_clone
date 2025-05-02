import { buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { SignedIn } from '@clerk/clerk-react'
import { HomeIcon, Library, MessageSquareIcon } from 'lucide-react'
// import React from 'react'
import { Link } from 'react-router-dom'
import PlayListSkeleton from '@/components/skeletons/PlayListSkeleton'
import { useMusicStore } from '@/stores/useMusicStore'
import { useEffect } from 'react'

const LeftSideBar = () => {
    

    //zustand for datafetching

    const {albums,fetchAlbums,isLoading} = useMusicStore()
    useEffect(()=>{
      fetchAlbums()
    },[fetchAlbums])

    console.log({albums})

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
                    <PlayListSkeleton/>
                ):(
                  
                  albums.map((album)=>(
                    <Link to={`/albums/${album._id}`}
                    className='hover:bg-zinc-900 p-2 flex items-center gap-3 group cursor-pointer' 
                    key={album._id}>

                      <img src={album.imageUrl} alt="Img "
                      className='size-12 rounded-md flex-shrink-0 flex object-cover' />
                      <div className="flex-1 min-w-0 hidden md:block">
                        <p className="font-medium truncate">{album.title}</p>
                        <p className="tex-sm text-zinc-500 truncate">Album : {album.artist}</p>
                      </div>
                       </Link>
                  ))
                 
                )}
                    </div> 

            </ScrollArea>
        </div>
    </div>
  )
}

export default LeftSideBar