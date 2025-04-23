import { Router } from "express";

const router = Router()

router.get('/',(req,res)=>{
    res.send("song with get ")
})


export default router

