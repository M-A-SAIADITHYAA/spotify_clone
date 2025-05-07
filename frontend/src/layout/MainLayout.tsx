// import React from 'react'
import { Outlet } from 'react-router-dom'

import { ResizablePanelGroup ,ResizablePanel, ResizableHandle} from '@/components/ui/resizable'
import LeftSideBar from './componenets/LeftSideBar.js'
import FriendsActivity from './componenets/FriendsActivity.js'
import AudioPlayer from './componenets/AudioPlayer.js'
function MainLayout() {

    

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

        <ResizableHandle className="w-2 bg-blend-lighten transition-colors"/>
        <ResizablePanel defaultSize={20} minSize={0}  maxSize={25} collapsedSize={0} >
           
          <FriendsActivity/>
        </ResizablePanel>
    </ResizablePanelGroup>

    

   </div>
  )
}

export default MainLayout