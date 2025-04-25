import { Router } from "express";

import {protectRoute,requireAdmin} from "../middleware/auth.middleware.js"
import { getAllSongs,getFeaturedSongs,getMadeForU,getTrending } from "../controller/song.controller.js";

const router = Router()

router.get("/",protectRoute,requireAdmin,getAllSongs)
router.get("/featured",getFeaturedSongs)
router.get("/made-for-u",getMadeForU)
router.get("/trending",getTrending)





export default router

