import  { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { axiosInstance } from '@/lib/axios'
import {Loader} from "lucide-react"
const updateToken = (token:string | null)=>{

    if(token){
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`

    }
    else{
        delete axiosInstance.defaults.headers.common["Authorization"]
    }

}

function AuthProvider({children}:{children:React.ReactNode}) {
    const {getToken} = useAuth()
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const initAuth = async ()=>{
            try {
                const token = await getToken()
                updateToken(token)
                
            } catch (error) {
                console.log("Error in auth Provider")
                
            } finally{
                setLoading(true)
            }
            initAuth()
        }
    },[getToken])

    if(loading){
        <div className='h-screen w-full flex items-center justify-center'>
           <Loader className='size-8 text-emerald-500 animate-spin'/>

        </div>
    }
  return (
    <div>{children}</div>
  )
}

export default AuthProvider