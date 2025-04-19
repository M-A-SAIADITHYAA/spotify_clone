import express from "express"
import dotenv from "dotenv"
dotenv.config()

import userRoutes from "./routes/user.route.js"

const app = express()
const PORT = process.env.PORT


app.use("/api/users",userRoutes)
app.listen(PORT,()=>{
    console.log(`the backend is running in the ${PORT}`)

})