import mongoose from "mongoose";

const {  Schema } = mongoose;

const photoSchema = new Schema({
    name: {
        type: String,
        required: true, //isim alanı zorunlu
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true //başındaki ve sonundaki boşlukları alıyor
    },
    uplodadedAt: {
        type: Date,
        default: Date.now
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    url:{
        type:String,
        required:true
    }


})

const Photo = mongoose.model("Photo", photoSchema)


export default Photo