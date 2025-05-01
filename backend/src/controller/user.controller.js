import {User} from "../models/user.model.js"

export const getAllUsers = async (req,res,next)=>{

    try {
        const currentuserId = req.auth.userId
        const users = await User.find({clerkId:{$ne:currentuserId}})
        res.status(200).json(users)
    } catch (error) {
        next(error)
        
    }
}