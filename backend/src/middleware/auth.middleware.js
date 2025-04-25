import { clerkClient } from "@clerk/express";

export const protectRoute = async (req,res)=>{


    if(!req.auth.userId){
        return res.status(400).json({message:"Unauthorized - you need to log in "})

        
    }

    next()

}

export const requireAdmin = async (req,res,next) =>{
   try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId)
const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress

if(!isAdmin){
    return res.status(400).json({message:"YOu are not an admin"})
}

next()
    
    
   } catch (error) {

    next(error)
    
   }
}


