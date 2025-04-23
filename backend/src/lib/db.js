import mongoose from "mongoose"

export const connectdb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongodb is connected to `)
        
    } catch (error) {
        console.log("error connecting to db")
        process.exit(1)
        
    }
}