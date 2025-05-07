import { usePlayerStore } from "@/stores/usePlayerStore"
import { useEffect, useRef } from "react"

const AudioPlayer = () => {

    const audioRef = useRef<HTMLAudioElement>(null)
    const prevSongRef = useRef<HTMLAudioElement>(null)

    const {currentSong,isPlaying,playNext} = usePlayerStore()

    useEffect(()=>{
        if(isPlaying) audioRef.current?.play()
            else{
        audioRef.current?.pause()}
    },[isPlaying])

    useEffect(()=>{
        const audio = audioRef.current
        const handleEnd = ()=>{
            playNext()
        }
        audio?.addEventListener("ended",handleEnd)

        return ()=> audio?.removeEventListener("ended",handleEnd)
    },[playNext])

    useEffect(()=>{
        const audio = audioRef.current
        if(!audioRef.current || !currentSong) return
        const isSongChange = prevSongRef.current !== currentSong?.audioUrl
        if(isSongChange){
            audio.src = currentSong?.audioUrl
            audio.currentTime = 0
            prevSongRef.current = currentSong?.audioUrl
        }

    },[])
  return (
    <div>AudioPlayer</div>
  )
}

export default AudioPlayer