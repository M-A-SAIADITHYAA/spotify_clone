import { usePlayerStore } from "@/stores/usePlayerStore"
import { useEffect, useRef } from "react"

const AudioPlayer = () => {

    const audioRef = useRef<HTMLAudioElement>(null)
    const prevSongRef = useRef<string | null>(null)

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
        if(!audioRef.current || !currentSong) return
        const audio = audioRef.current
        console.log(audio)
        const isSongChange = prevSongRef.current !== currentSong?.audioUrl
        if(isSongChange){
            audio.src = currentSong?.audioUrl
            audio.currentTime = 0
            prevSongRef.current = currentSong?.audioUrl

              audio.play().catch((err) => {
      if (err.name !== "AbortError") {
        console.error("Audio play error:", err);
      }
    });
        }

    },[currentSong])
  return (
    <audio ref={audioRef} />
  )
}

export default AudioPlayer