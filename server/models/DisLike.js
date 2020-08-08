const mongoose = require('mongoose');

const DisLikeSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    videoId : {
        type:mongoose.Schema.Types.ObjectId,
        ref :'Video'
    },
    CommentId : {
        type:mongoose.Schema.Types.ObjectId,
        ref :'Comment'
    }
},{timestamps : true})

const DisLike = mongoose.model('DisLike',DisLikeSchema);
module.exports = {DisLike};