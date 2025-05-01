
import { Card, CardContent } from '@/components/ui/card'
import { axiosInstance } from '@/lib/axios'
import { useUser } from '@clerk/clerk-react'

import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'




const AuthCallBackPage = () => {
  const navigate = useNavigate()
   const {isSignedIn,isLoaded,user}  = useUser()

  useEffect(
    ()=>{
      const syncUser = async()=>{
        if(!user || !isLoaded || !isSignedIn){
          console.log("returhned")
          return;
        }
        try {
          console.log("is signed in ",isSignedIn)
          console.log("isLoaded",isLoaded)
          console.log("is this undefined",user)
          
          // syncAttempted.current = true

         
          await axiosInstance.post("/auth/callback",
            {id:user.id,
            firstName:user.firstName,
            lastName:user.lastName,
            imageUrl:user.imageUrl

            })


          
        } catch (error) {
          console.log("error in auth -callback",error)
          
        }finally{
          navigate("/")
        }
      }
      syncUser()
    },[isLoaded,isSignedIn,user,navigate]

  )
  return (
    <div className='h-screen w-full bg-black-100 flex items-center justify-center'>
      <Card  className='w-[90%] bg-black flex items-center justify-center'>
        <CardContent className='flex flex-col items-center gap-4 pt-6'>
          <Loader className='size-6 animate-spin '/>
          <h3 className="text-zinc-400 text-4xl"> Logging in </h3>
          <p className="text-amber-50 text-sm"> Redirecting</p>

        </CardContent>
      </Card>

    </div>
  )
}

export default AuthCallBackPage