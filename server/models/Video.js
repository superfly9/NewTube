const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
    writer : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title :{
        type :String,
        maxlength:50
    },
    description :String,
    views:{
        type:Number,
        default :0
    },
    filePath : String,
    category : String,
    duration : String,
    thumbnail:String
},{timestamps : true})


const Video = mongoose.model('Video',VideoSchema);

module.exports = {Video};