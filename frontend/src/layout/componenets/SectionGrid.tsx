import SectionGridSkeleton from '@/components/skeletons/SectionGridSkeleton'
import { Button } from '@/components/ui/button'
import { Song } from '@/types'
import { PlayCircle } from 'lucide-react'
import React from 'react'

type SectionGridProps = {
  title:string,
  songs:Song[]
}

const SectionGrid = ({title,songs,isLoading}:SectionGridProps) => {
  if(isLoading) return <SectionGridSkeleton/>

  return (
    <div className='mb-8'>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-extrabold">{title}</h2>
        <Button variant='link' className='text-sm text-zinc-700 hover:bg-red-400'>
          Show all
        </Button>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {songs.map((song)=>(
            <div
            key={song._id}
            className='bg-zinc-900 p-4 rounded-md hover:bg-zinc-600/40 transition-all group cursor-pointer'>
              <div className="relative mb-4">
                <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                  <img src={song.imageUrl} alt="" className='w-full aspect-square transition-transform duration-200 group-hover:scaled-110' />
                </div>
              </div>  
              <h3 className='font-medium mb-2 truncate'>{song.title}</h3>
						<p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
              </div>

          ))}
        
      </div>

    </div>
  )
}

export default SectionGrid