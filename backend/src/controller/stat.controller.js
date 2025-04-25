import { user } from "../models/user.model.js"
import { Album } from "../models/album.model.js"
import { Song } from "../models/song.model.js"


export const getStats = async (req,res,next)=>{

   
    try {
     // const totalSongs = await Song.countDocuments()
     // const totaUsers = await user.countDocuments()
     // const totaAlbums = await Album.countDocuments()
 
     const [totalSongs,totalUsers,totalAlbums,uniqueArtist] = await Promise.all([
         Song.countDocuments(),
         Album.countDocuments(),
         User.countDocuments(),
         Song.aggregate([
             {
                 $unionWith:{
                     coll:"albums",
                     pipeline:[]
                 },
             },
                 {
                     $group:
                     {
                         _id:"$artist",
                     }
                 },
                 {
                     $count:"count",
                 }
             
         ])
 
     ])
 
     res.status(200).json({
         totalAlbums,
         totalSongs,
         totalUsers,
         totalArtists:uniqueArtist[0]?.count||0
 
     })
 
     
    } catch (error) {
     next(error)
     
    }
 }