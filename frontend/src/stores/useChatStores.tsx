import { axiosInstance } from "@/lib/axios"
import { Message, User } from "@/types"
import { error } from "console"
import {create} from "zustand"
import {io} from "socket.io-client"

interface ChatStore{
    users:User[],
    socket:any,
    isConnected:boolean
    onlineUsers:Set<String>
    userActivities:Map<string,string>,
    messages:Message[]
    isLoading: boolean,
    error:string | null,
    fetchUsers:()=>Promise<void>,
    initSocket:(userId:string )=>void,
    disconnectSocket:()=>void
    sendMessage:(receiverId:string,senderId:string,content:string)
    
}
const baseURL = "http://localhost:5000"

const socket = io(baseURL,{
    autoConnect:false,
    withCredentials:true
})


export const useChatStore  = create<ChatStore>((set,get)=>(
    {
        users:[],
        isLoading:false,
        error:null,
        socket:null,
        isConnected:false,
        onlineUsers:new Set(),
        userActivities:new Map(),
        messages:[],

        initSocket:async(userId:string)=>{
            if(!get().isConnected){
                socket.connect()
                socket.emit("user_connected",userId),

                socket.on("user_online",(users:[string])=>{
                    
                })

            }

        },
        disconnectSocket:async()=>{

        },
        sendMessage:async()=>{

        },


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