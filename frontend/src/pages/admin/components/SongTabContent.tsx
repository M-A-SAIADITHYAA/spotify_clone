import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Music } from 'lucide-react'
import React from 'react'
import SongTable from './SongTable'
import AddSong from './AddSong'

const SongTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
          <CardTitle className='flex items-center gap-2'>
            <Music className='size-6 text-emerald-400'/>
            Songs
          </CardTitle>
          <CardDescription>Manage your songs</CardDescription>
          </div>
          <AddSong/>
          </div>

        
      </CardHeader>
      <CardContent>
        <SongTable/>


      </CardContent>
    </Card>
  )
}

export default SongTabContent