import { axiosInstance } from '@/lib/axios'
import { Album, Song } from '@/types'
import axios from 'axios'
import {create} from 'zustand'


interface MusicStore{
    songs: Song[],
    albums:Album[],
    isLoading: boolean,
    error: string | null,
    currentAlbum:Album | null,
    madeForUSongs: Song[],
    featuredSongs:Song[],
    trendingSongs:Song[],

    fetchAlbums: () => Promise<void>
    fetchAlbumById:(id:string) =>Promise<void>
    fetchMadeForUSongs:()=>Promise<void>
    fetchfeaturedSongs:()=>Promise<void>
    fetchtrendingSongs:()=>Promise<void>
}

export const useMusicStore = create<MusicStore>((set)=>({
    albums:[],
    songs:[],

isLoading:false,
error:null,
currentAlbum:null,
madeForUSongs:[],
featuredSongs:[],
trendingSongs:[],

fetchAlbums:async () =>{
    set({
        isLoading:true,
        error:null
    })
    try {
        const response = await axiosInstance.get("/albums")
        set({albums:response.data})

        
    } catch (error:any) {
        set({error:error.response.data.message})
        
    }
    finally{
        set({isLoading:false})
    }
},

fetchAlbumById:async (id)=>{
    set({
        isLoading:true,
        error:null
    }

    )

    try {

        const response = await axiosInstance.get(`/albums/${id}`)
        set({currentAlbum:response.data})
        
    } catch (error:any) {
        set({error:error.response.data.message})
        
    }  finally{
        set({isLoading:false})
    }
},
fetchMadeForUSongs:async()=>{
    set({isLoading:true,
        error:null
    })
    try {
        const response = await axiosInstance.get("/songs/featured")
        set({madeForUSongs:response.data})
        
    } catch (error:any) {
        set({error:error.response.data.message})
        
    }  finally{
        set({isLoading:false})
    }

},
fetchfeaturedSongs:async()=>{
    set({isLoading:true,
        error:null
    })
    try {
        const response = await axiosInstance.get("/songs/featured")
        set({featuredSongs:response.data})
        
    } catch (error:any) {
        set({error:error.response.data.message})
        
    }  finally{
        set({isLoading:false})
    }


},
fetchtrendingSongs:async()=>{
    set({isLoading:true,
        error:null
    })
    try {
        const response = await axiosInstance.get("/songs/trending")
        set({trendingSongs:response.data})
        
    } catch (error:any) {
        set({error:error.response.data.message})
        
    }  finally{
        set({isLoading:false})
    }

},


}),





)