import express from "express"
import dotenv from "dotenv"

import { connectdb } from "./lib/db.js"
dotenv.config()

import userRoutes from "./routes/user.route.js"
import adminRoutes from "./routes/admin.route.js"
import authRoutes from "./routes/auth.route.js"
import songRoutes from "./routes/song.route.js"
import albumsRoutes from "./routes/albums.route.js"
import statsRoutes from "./routes/stats.route.js"

const app = express()
const PORT = process.env.PORT

app.use(express.json())


app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/songs",songRoutes)
app.use("/api/albums",albumsRoutes)
app.use("/api/stats",statsRoutes)

app.listen(PORT,()=>{
    console.log(`the backend is running in the ${PORT}`)
    connectdb()

})