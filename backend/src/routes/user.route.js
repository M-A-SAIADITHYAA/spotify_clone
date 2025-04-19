import { Router } from "express";

const router = Router()

router.get("/",(req,res)=>{
    res.send("hi thanks for coming in ")
})

export default router