import { Router } from "express";


import { getAllAlbums,getAlbumById } from "../controller/album.controller.js";

const router = Router()

router.get('/',(req,res)=>{
    res.send("Albums with get ")
})

router.get("/",getAllAlbums)
router.get("/:albumId",getAlbumById)



export default router

