import { useMusicStore } from '@/stores/useMusicStore'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'


const AlbumPage = () => {
    const {albumId}= useParams()
    const {fetchAlbumById,currentAlbum,isLoading} = useMusicStore()

    useEffect(()=>{
        if(albumId)
            fetchAlbumById(albumId)

    },[fetchAlbumById,albumId])

    if(isLoading){
        return null
    }

    return <div className="h-full">
        <ScrollArea className='h-full'>
            //main content
            <div className="relative min-h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-[#5028a0]/80 via-zinc-900/70 
                to-zinc-900 pointer-events-none "aria-hidden='true'/>
                    
                
            
            <div className="relative z-10">
                <div className=" flex p-6 gap-8 pb-8">
                    <img src={currentAlbum?.imageUrl} alt="" 
                    className='w-[240px] h-[240]px shadow-xl rounded'/>
                    <div className='flex flex-col justify-end'>
                        <p className='text-sm font-extrabold'>
                            Album
                        </p>
                        <h2 className="text-6xl font-extrabold my-4">
                            {currentAlbum?.title}
                        </h2>
                        <div className="flex flex-row items-center text-sm gap-2 text-zinc-100">
                        <span className="font-light text-white ">{currentAlbum?.artist}</span>
                        <span className="font-light text-white ">{currentAlbum?.songs.length} Songs</span>
                        <span className="font-light text-white ">{currentAlbum?.releaseYear}</span>

                        </div>

                    </div>
                </div>
                //control button

                
            </div>
            </div>

        </ScrollArea>


    </div>


  return (
    <div>AlbumPage</div>
  )
}

export default AlbumPage