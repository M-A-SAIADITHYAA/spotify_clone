import { Router } from "express";

import { checkAdmin,createAlbum,deleteAlbum,createSong,deleteSong } from "../controller/admin.controller.js";
import { protectRoute ,requireAdmin} from "../middleware/auth.middleware.js";

const router = Router()

router.use(protectRoute,requireAdmin)
router.get("/check",checkAdmin)

router.post('/songs',createSong)

router.delete("/songs/:id",deleteSong)

router.post("/albums",createAlbum)
router.delete("/albums/:id",deleteAlbum)
export default router

