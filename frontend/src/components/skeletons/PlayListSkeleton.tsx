// import React from 'react'

const PlayListSkeleton = () => {

    return Array.from({length:7 }).map((_,i)=>(
        <div  key = {i} className="p-2 rounded-md flex items-center gap-2">
        <div className="w-12 h-12 bg-zinc-100 rounded-md flex-shrink-0 animale-pulse"/>
        <div className="flex-1 min-w-0 hidden md:block space-y-2 ">
        
        <div className="h-4 bg-zinc-100 rounded animate-pulse w-3/4"/>
        <div className="h-3 bg-zinc-100 rounded animate-pulse w-1/4"/>
        
        </div>
        </div>

    ))
  
}

export default PlayListSkeleton