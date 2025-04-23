import mongoose from "mongoose";
import { Song } from "./song.model";


const albumSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    artist:{
        type:String,
        required:true,
    },

    imageUrl:{
        type:string,
        required:true,

    },

    releaseYear:{
        type:Number,
        required:true

    },

    songs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Song",

    }]
},{timestamps:true})

export default album = mongoose.model("Album",albumSchema)