import FeaturedGridSkeleton from '@/components/skeletons/FeaturedGridSkeleton'
import { useMusicStore } from '@/stores/useMusicStore'
import React from 'react'
import PlayButton from './PlayButton'

const FeaturedSection = () => {
    const {isLoading,featuredSongs} =    useMusicStore()
    if(isLoading) return <FeaturedGridSkeleton/>

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-7 m-6'>
        {featuredSongs.map((song)=>(
            <div key={song._id}
            className='flex items-center bg-zinc-800 rounded-md overflow-hidden hover:bg-zinc-400/40 transition-colors group cursor-pointer relative'>
                <img src={song.imageUrl} className='w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0 ' />
                <div className="flex-1 p-4 ">
                    <p className="font-medium truncate">{song.title }</p>
                     <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
                </div>
                <PlayButton song={song}/>
            </div>
            


        ))}
        
    </div>
  )
}

export default FeaturedSection