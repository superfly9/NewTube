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

subscribeRouter.post('/subscribed',(req,res)=>{
    const {body : {userTo,userFrom}} = req;
    Subscribe.find({userTo,userFrom})
        .exec((err,subscribeUser)=>{
            if (err) return res.json({success:false,err});
            let subscribed = false;
            if (subscribeUser.length > 0) {
                subscribed = false;
            }
            console.log('Check If I sub:',subscribeUser)
            res.json({success:true,subscribed})
    })
})
    

module.exports = subscribeRouter;