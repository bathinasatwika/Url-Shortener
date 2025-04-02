const mongoose=require("mongoose");



const urlSchema= new mongoose.Schema({
    shorturl:{
        type:String,
        required:true,
    },
    longurl:{
        type:String,
        required:true,
        unique:true
    },
    clicks:{
        type:Number,
        required:true,
    }
});

module.exports= mongoose.model('User', urlSchema)