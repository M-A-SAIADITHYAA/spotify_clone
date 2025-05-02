import {Album} from "../models/album.model.js"
export const getAllAlbums = async (req,res,next)=>{
    try {

        try {
            const albums = await Album.find() 
            res.status(200).json(albums)
            
        } catch (error) {
            res.status(500).json(error)

            
        }
        
        
        
    } catch (error) {
        next(error)
        
    }

}

export const getAlbumById = async (req,res,next)=>{

    try {
        const{albumId} = req.params
        const album = await Album.findById(albumId).populate("songs")
        

        if(!album){
            return res.status(400).json({message})
        }

        res.status(200).json(album)
    } catch (error) {
        next(error)
        
    }

}