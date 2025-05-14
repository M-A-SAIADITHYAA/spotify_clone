import {User} from "../models/user.model.js"
import {Message} from "../models/message.model.js"
export const getAllUsers = async (req,res,next)=>{

    try {
        const currentuserId = req.auth.userId
        const users = await User.find({clerkId:{$ne:currentuserId}})
        res.status(200).json(users)
    } catch (error) {
        next(error)
        
    }
}

export const getMessages = async (req,res,next)=>{
    try {
        const myId = req.auth.userId
        const {userId} = req.params

        const messages = await Message.find({
            $or:[
                {senderId:userId,receiverid:myId},
                {senderId:myId,receiverid:userId}
            ]

        }).sort({created:1})

        res.status(200).json(messages)


        
    } catch (error) {
        next(error)
        
    }
}