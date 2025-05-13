// import React from 'react'
import { Outlet } from 'react-router-dom'

import { ResizablePanelGroup ,ResizablePanel, ResizableHandle} from '@/components/ui/resizable'
import LeftSideBar from './componenets/LeftSideBar.js'
import FriendsActivity from './componenets/FriendsActivity.js'
import AudioPlayer from './componenets/AudioPlayer.js'
import PlayBackControl from './PlayBackControl.js'
import { useEffect, useState } from 'react'
function MainLayout() {

  const [isMobile,setisMObile] = useState(false)

  useEffect(()=>{
    const checkMobile = ()=>{
      setisMObile(window.innerWidth<800)

    }
    checkMobile()
    window.addEventListener("resize",checkMobile)
    return () => window.removeEventListener("resize",checkMobile)
  })

    

  return (
   <div className="h-screen bg-black text-white flex flex-col">

    <ResizablePanelGroup direction="horizontal" className='flex-1 flex h-full overflow-hidden p-2'>
       <AudioPlayer/>
        <ResizablePanel defaultSize={20} minSize={20} maxSize={30}>
         <LeftSideBar/>
        </ResizablePanel>

        <ResizableHandle className='w-2 bg-black transition-colors'/>

        <ResizablePanel defaultSize={80} minSize={60} >
   <Outlet/>
        </ResizablePanel>

        {!isMobile && (
          <>
          <ResizableHandle className="w-2 bg-blend-lighten transition-colors"/>
        <ResizablePanel defaultSize={20} minSize={0}  maxSize={25} collapsedSize={0} >
           
          <FriendsActivity/>
        </ResizablePanel>
        </>
        )}
    </ResizablePanelGroup>
    <PlayBackControl/>

    

   </div>
  )
}

export default MainLayout