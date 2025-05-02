import { axiosInstance } from "@/lib/axios"
import { User } from "@/types"
import { error } from "console"
import {create} from "zustand"

interface ChatStore{
    users:User[],
    fetchUsers:()=>Promise<void>,
    isLoading: boolean,
    error:string | null,
}

export const useChatStore  = create<ChatStore>((set)=>(
    {
        users:[],
        isLoading:false,
        error:null,


        fetchUsers : async()=>{
            set({isLoading:true,error:null})
            try {
                const response = await axiosInstance('/users')
                set({users:response.data})
                
            } catch (error:any) {
                set({error:error.response.data.message})
                
            }
        }

    }
))