import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useChatStore } from '@/stores/useChatStores'
import { useUser } from '@clerk/clerk-react'
import { HeadphoneOffIcon, HeadphonesIcon, Users } from 'lucide-react'
import React, { useEffect } from 'react'

const FriendsActivity = () => {

    const {users,isLoading,error,fetchUsers} = useChatStore()
    const {user} = useUser()
        

    useEffect(()=>{
      
        if(user){
            fetchUsers()

        }
        

        
    },[fetchUsers,user])
  return (
    <div className="h-full bg-zinc-900 rounded-lg flex flex-col">
    <div className='p-4 flex justify-center items-center border-b border-zinc-300'>
        <div className="flex items-center gap-2">
            <Users className='size-5 shrink-0'/>
            <h2 className="font-semibold">What they are listening to </h2>
        </div>
    </div>
    {!user && <LoginPrompt/>}
    <ScrollArea className='flex-1 '>
        <div className="p-4 space-y-4 ">
            {users.map((user1)=>(
                <div key={user1._id} className = "cursor-pointer hover:bg-zinc-800 p-3 rounded-md transition-colors group">
                    <div className="flex items-center gap-3">
                        <div className="relative ">
                                <Avatar className='size-10 border border-zinc-400'>
                                    <AvatarImage src={user1.imageUrl}/>

                                   

                                </Avatar>
                                <div className="flex-1 min-w-0 ">
                                    <div className="flex items-center gap-2">
                                    <span className='font-medium text-sm text-white'>{user1.fullName}</span>
                                    </div>
                                </div>
                        </div>
                    </div>
                    </div>
            ))}
            
        </div>

    </ScrollArea>
    </div>
  )
}


const LoginPrompt = () =>(
    <div className="h-full flex flex-col items-center justify-center text-center space-y-3 p-6">
        <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full opacity-95 blur-sm animate-pulse "
            aria-hidden='true'/>

            <div className="relative bg-zinc-800 rounded-full p-4 ">
                <HeadphonesIcon className='size-8 text-emerald-300'/>

            </div>
        </div>
        <div className="space-y-2 max-w-[250px] ">
        <h3 className='text-lg font-semibold text-white'>See What Friends Are Playing</h3>
        <p className='text-sm text-zinc-400'>Login to discover what music your friends are enjoying right now</p>
        </div>

    </div>
)
export default FriendsActivity