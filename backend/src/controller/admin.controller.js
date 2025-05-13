import {Song} from "../models/song.model.js"

import {Album} from "../models/album.model.js"
import cloudinary from "cloudinary"
const uploadToCloudinary = async(file)=>{
    try {
        const result = await cloudinary.UploadStream.upload(file.tempFilePath,{
            resource_type:"auto"
        })
        return result.secure_url
        
    } catch (error) {

        console.log("error in the uploadCloudinary")
        throw new Error("error uploading in cloudinary")
        
    }
}
export const createSong = async (req,res,next)=>{
    try {
        if(!req.files || !req.files.audioFile || req.files.imageFile){
            return res.status(400).json({message:"Please upload correctly"})
        }
        const {title,artist,albumId,duration} = req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile
        

        const audioUrl = await uploadToCloudinary(audioFile)
        const imageUrl = await uploadToCloudinary(imageFile)
        const song = new Song({
            title,
            artist,
            imageUrl,
            audioUrl,
            duration,
            albumId:albumId || null



        }


        )

        await song.save()

        if(albumId){
            await Album.findbyIdAndUpdate(albumId,{
                $push:{
                    song:song._id
                },
                

            })
            res.status(200).json({message:"successfull "})
        }
        
        
    } catch (error) {
        console.log("error in the createSong",error)
        next(error)
        
    }
}

export const deleteSong = async (req,res,next)=>{
    try {
        const {id} = req.params
        const song = await Song.findById(id)

        //if song is in album 
        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId,{
                $pull:{song:song._id},
            }
            )
        }

        await Song.findByIdAndDelete(id)

        res.status(200).json({message:"song deleted successfully"})
        
    } catch (error) {
        console.log("error in deleting")
        next(error)
        
    }

}

export const createAlbum = async (req,res)=>{
    try {
        const{title,artist,releaseYear}  = req.body
        const {imageFile} = req.file
        const imageUrl = uploadToCloudinary(imageFile)
        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear,
        })

        await album.save()
        res.status(200).json({album})
        
    } catch (error) {
        console.log("error in creatingAlbum")
        next(error)
        
    }
}

    export const deleteAlbum = async(req,res,next)=>{
        try {
            const id = req.params
            await Song.deleteMany({albumId:id})
            await Album.findByIdAndDelete(id)
            res.status(200).json({message:"successfully delted the album"})

            
        } catch (error) {
            console.log("error in deleting the album")
            next(error)
             
        }

    }

    export const checkAdmin = async (req,res,next)=>{
        res.status(200).json({admin:true})
    }

