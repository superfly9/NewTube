const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    writer : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    responseTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content : String,
    videoId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'Video'
    }
},{ timestamps: true });

const Comment = mongoose.model('Comment',CommentSchema);

module.exports = {Comment};