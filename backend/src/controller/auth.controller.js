import { User } from "../models/user.model.js";


export const authCallback = async (req,res,next) =>{

    try {

        const {id,firstName,lastName,imageUrl} = req.body

        const user = await User.findOne({clerkId:id})
        

        if(!user){
            await User.create({
                clerkId:id,
                fullName:`${firstName} ${lastName}`.trim(),
                imageUrl:imageUrl
            })

        }
        console.log("please respond",User)
        res.status(200).json({success:true})
        
    } catch (error) {
        console.log("error in auth callBack",error)
        next(error)
        
    }

}