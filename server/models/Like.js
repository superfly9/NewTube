const mongoose = require('mongoose');

const LikeSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    videoId : {
        type:mongoose.Schema.Types.ObjectId,
        ref :'Video'
    },
    commentId : {
        type:mongoose.Schema.Types.ObjectId,
        ref :'Comment'
    }
},{timestamps : true})

const Like = mongoose.model('Like',LikeSchema);
module.exports = {Like};