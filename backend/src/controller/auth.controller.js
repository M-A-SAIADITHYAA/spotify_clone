import { user } from "../models/user.model.js";


export const authCallback = async (req,res) =>{

    try {

        const {id,firstName,lastName,imageUrl} = req.body

        const User = await user.findOne({clerkId:id})

        if(!User){
            await user.create({
                clerkId:id,
                fullName:`${firstName} ${lastName}`,
                imageUrl:imageUrl
            })

        }
        res.status(200).json({success:true})
        
    } catch (error) {
        next(error)
        
    }

}