import { Button } from '@/components/ui/button'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { Song } from '@/types'
import { Pause, Play } from 'lucide-react'
import React from 'react'

const PlayButton = ({song}:{song:Song}) => {

    const {currentSong,isPlaying, setCurrentSong, togglePlay}= usePlayerStore()
    const iscurrentSong = currentSong?._id === song._id

    const handlePlay = ()=>{
        if(iscurrentSong){
            togglePlay()
        }
        else{
            setCurrentSong(song)
        }
    }
  return (
    <Button onClick = {handlePlay}
    className={`absolute bottom-5 right-2 bg-green-400 hover:bg-green-300 hover:scale-105  opacity-0 
    translate-y-2 group-hover:translate-y-0 ${iscurrentSong?"opacity-100" :
        "opacity-0 group-hover:opacity-100"
  }`}>
    {iscurrentSong && isPlaying ?(
        <Pause className='text-black'/>

    ):(
        <Play className='text-black'/>
    )}
  </Button>
  )
}

export default PlayButton