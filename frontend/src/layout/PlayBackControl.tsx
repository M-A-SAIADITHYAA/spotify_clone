import { usePlayerStore } from '@/stores/usePlayerStore'
import React, { useEffect, useRef, useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Button } from '@/components/ui/button'
import { Laptop, ListMusic, Mic, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume } from 'lucide-react'

import { formatDuration } from '@/pages/home/album/AlbumPage'


function PlayBackControl() {
    const {currentSong,isPlaying,togglePlay,playNext,playPrevious} = usePlayerStore()

    const [vol,setVol] = useState(70)
    const [currentTime,setCurrent] = useState(0)
    const [duration,setDuration] = useState(0)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const handleSeek = (value: number[]) => {
		if (audioRef.current) {
			audioRef.current.currentTime = value[0];
		}
	};

    useEffect(()=>{
        audioRef.current = document.querySelector("audio")
        const audio = audioRef.current

        if(!audio) return 
        const updateTime = ()=> setCurrent(audio.currentTime)
        const updateDuration = ()=> setDuration(audio.duration)

        audio.addEventListener("timeupdate",updateTime)
        audio.addEventListener("loadmetadata",updateDuration)

        const handleEnded = ()=>{
            usePlayerStore.setState({isPlaying : false})
        }

        audio.addEventListener("ended",handleEnded)
        return ()=>{
            audio.removeEventListener("timeupdate",updateDuration)
            audio.removeEventListener("loadmetadata",updateDuration)
            audio.removeEventListener("ended",handleEnded)
            

        }
    },[currentSong])



  return (
    <footer className='h-20 sm:h-20 bg-zinc-800 border-t border-zinc-800 px-4 '>
        <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto ">
            <div className="hidden sm:inline-flex items-center gap-4 min-w-[180px] w-[30%] ">
                {currentSong && (
                    <div >
                        <div className='flex flex-1
                         '>
                        <img src={currentSong.imageUrl} alt="" 
                        className="w-15 h-15 object-cover rounded-md"/>
                        </div>

                        
                    </div>
                )}
                {currentSong && (
                    <div className="flex-1 flex  flex-col min-w-0">
                            <div className="font-medium hover:underline cursor-pointer">
                                {currentSong.title}
                            </div>
                            <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                                {currentSong.artist}
                            </div>
                        </div>

                )}
            </div>
            <div className=" flex-col inline-flex justify-start gap-2 flex-1 sm:max-w-[60%] pl-40">
                <div className="inline-flex gap-4 sm:gap-6">
                    <Button
                    size='icon'
                    variant='ghost'
                    className='hidden sm:inline-flex hover:text-white-400 text-zinc-500'>
                        <Shuffle className='h-4 w-4'/>
                    </Button>

                    <Button
                    size='icon'
                    variant='ghost'
                    className='hover:text-white text-zinc-400'
                    onClick={playPrevious}
                    disabled={!currentSong}>
                        
                        <SkipBack className='h-4 w-4'/>
                    </Button>

                    <Button
                    size='icon'
                    variant='ghost'
                    className='bg-white rounded-full hover:text-back text-zinc-400'
                    onClick={togglePlay}
                    disabled={!currentSong}>
                        
                       {isPlaying?<Pause className='h-4 w-4' />:<Play className='h-4 w-4'/>}
                    </Button>

                    <Button
                    size='icon'
                    variant='ghost'
                    className='hover:text-white text-zinc-400'
                    onClick={playNext}
                    disabled={!currentSong}>
                        
                        <SkipForward className='h-4 w-4'/>
                    </Button>

                    <Button
                    size='icon'
                    variant='ghost'
                    className='hidden sm:inline-flex hover:text-white-400 text-zinc-500'>
                        <Repeat className='h-4 w-4'/>
                    </Button>
                </div>
                <div className='hidden sm:flex items-center gap-2 w-full'>
                    <div className="text-xs text-zinc-400">{formatDuration(currentTime)}</div>
                    <Slider
                     value={[currentTime]}
                     max={(duration || 100)}
                     step={1}
                     className='w-full items-center hover:cursor-grab active:cursor-grabbing'
                     onValueChange={handleSeek}
                     >
                     <div slot="track" className="bg-amber-200 relative h-1 rounded-full">
    <div slot="range" className="absolute h-full bg-green-500 rounded-full" />
  </div>
  <div slot="thumb" className="block w-3 h-3 bg-green-500 rounded-full shadow" />
</Slider>
                     <div className='items-baseline text-xs text-zinc-400 '>{formatDuration(duration)}</div>
                      

                </div>

            </div>
            <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-full justify-end">
                <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>

                <Mic className='h-4 w-4'/>
                </Button>
                <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>

                <ListMusic className='h-4 w-4'/>
                </Button>
                <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>

                <Laptop className='h-4 w-4'/>
                </Button>
                <div className="flex items-center gap-2">
                <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>

                <Volume className='h-4 w-4'/>

                </Button>

                <Slider
							value={[vol]}
							max={100}
							step={1}
							className='w-24 hover:cursor-grab active:cursor-grabbing text-amber-100'
							onValueChange={(value) => {
								setVol(value[0]);
								if (audioRef.current) {
									audioRef.current.volume = value[0] / 100;
								}
							}}
						/>
                </div>

            </div>

        </div>
    </footer>
  )
}

export default PlayBackControl