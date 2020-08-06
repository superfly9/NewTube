const mongoose = require('mongoose');

const ReplySchema = mongoose.Schema({
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
});

const Reply = mongoose.model('Reply',ReplySchema);

module.exports = {Reply};