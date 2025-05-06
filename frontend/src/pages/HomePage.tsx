import { ScrollArea } from "@/components/ui/scroll-area"
import Topbar from "@/components/ui/Topbar.jsx"
import FeaturedSection from "@/layout/componenets/FeaturedSection"
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
    <div><Topbar/>
    <ScrollArea className="h-full">
      <div className=""></div>
    <FeaturedSection/>

    </ScrollArea>
    
    </div>
    
  )
}

export default HomePage