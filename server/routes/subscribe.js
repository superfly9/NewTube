const express = require('express');
const subscribeRouter = express.Router();
const {Subscribe} = require('../models/Subscribe');


subscribeRouter.post('/getSubscribeNumber',(req,res)=>{
    const { body : { userTo}} = req;
    Subscribe.find({userTo})
        .exec((err,subscribeInfo)=>{
            if (err) return res.json({success:false,err});
            res.json({success:true,subscribeNumber:subscribeInfo.length});
        })
})


module.exports = subscribeRouter;