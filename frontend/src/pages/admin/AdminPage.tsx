import { useAuthStore } from '@/stores/useAuthStore'
import { useAuth } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import DashboardStats from './components/DashboardStats'
import Header from './components/Header'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlbumIcon, Music2 } from 'lucide-react'
import { TabsContent } from '@radix-ui/react-tabs'
import SongTabContent from './components/SongTabContent'
import AlbumTabContent from './components/AlbumTabContent'
import { useMusicStore } from '@/stores/useMusicStore'


const AdminPage = () => {
    const {isAdmin,isLoading} = useAuthStore()

    const {fetchSongs,fetchStats,fetchAlbums}= useMusicStore()
     
    
    if(!isAdmin && !isLoading) return <div>
        NOT an admin
    </div>
    useEffect(()=>{
        fetchSongs(),
        fetchStats(),
        fetchAlbums()
        
    },[fetchAlbums,fetchSongs,fetchStats])

    
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900  via-zinc-900 to-black text-zinc-100 p-8">
        <Header/>
        <DashboardStats/>
        <Tabs defaultValue='songs' className='space-y-10 '>
            <TabsList className='p-1 gap-2 bg-zinc-800/40'>
                <TabsTrigger value = "songs" className='data-[state=active]:bg-zinc-600'>
                    <Music2 className='mr-2 size-4'/>
                    Songs


                </TabsTrigger>
                <TabsTrigger value = "Album" className='data-[state=active]:bg-zinc-600'>
                    <AlbumIcon className='mr-2 size-4'/>
                    Album


                </TabsTrigger>
            </TabsList>
            <TabsContent value="songs">
                <SongTabContent/>
            </TabsContent>
            <TabsContent value="Album">
               <AlbumTabContent/>
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default AdminPage