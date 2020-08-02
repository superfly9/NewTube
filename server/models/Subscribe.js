const mongoose = require('mongoose');


const SubscribeSchema = mongoose.Schema({
    userTo : {
        ref:'User',
        type:mongoose.Schema.Types.ObjectId
    },
    userFrom : {
        ref:'User',
        type:mongoose.Schema.Types.ObjectId
    }
})

const Subscribe = mongoose.model('subscribe',SubscribeSchema);

module.exports = {Subscribe};