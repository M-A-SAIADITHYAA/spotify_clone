import Topbar from "@/components/ui/Topbar.jsx"
import { useMusicStore } from "@/stores/useMusicStore"
import { useEffect } from "react"

function HomePage() {

  const {fetchfeaturedSongs,fetchtrendingSongs,fetchMadeForUSongs,isLoading,error,
    madeForUSongs,featuredSongs,trendingSongs
  } = useMusicStore()

  useEffect(()=>{
    fetchMadeForUSongs(),
    fetchfeaturedSongs(),
    fetchtrendingSongs()

  },[])
  console.log({trendingSongs})
  console.log(error)
  console.log({madeForUSongs})
  console.log({featuredSongs})



  return (
    <div><Topbar/></div>
  )
}

export default HomePage