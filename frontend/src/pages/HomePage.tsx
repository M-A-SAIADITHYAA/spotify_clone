import { ScrollArea } from "@/components/ui/scroll-area"
import Topbar from "@/components/ui/Topbar.jsx"
import FeaturedSection from "@/layout/componenets/FeaturedSection"
import SectionGrid from "@/layout/componenets/SectionGrid"
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
    <div className=""><Topbar/>
    <ScrollArea className='h-screen'>
      <div className="p-4 sm:p-6">
       
        <h1 className="text-4xl font-extrabold text-pink-500 drop-shadow-lg tracking-wider animate-pulse font-mono">
        Good Morning
        </h1>
        <FeaturedSection/>
      </div>
      <div className="space-y-8">
      <SectionGrid title='Made For You' songs={madeForUSongs} isLoading={isLoading} />
      <SectionGrid title='Trending' songs={trendingSongs} isLoading={isLoading} />
        <p>Made for U</p>
        <p>trending</p>
      </div>
    

    </ScrollArea >
    
    </div>
    
  )
}

export default HomePage