const express = require('express');
const subscribeRouter = express.Router();
const {Subscribe} = require('../models/Subscribe');
const {Video} = require('../models/Video');


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
                subscribed = true;
            }
            console.log('Check If I sub:',subscribeUser)    
            res.json({success:true,subscribed})
    })
})

subscribeRouter.post('/addToSubscribe',(req,res)=>{
    const { body }=req;
    const newSub = new Subscribe(body)
    newSub.save((err,subInfo)=>{
        console.log('Generated SubInfo:',subInfo);
        if (err) return res.json({err,success:false});
        res.json({success:true})
    })
})

subscribeRouter.post('/removeFromSubscribe',(req,res)=>{
    const { body } =req;
    Subscribe.findOneAndDelete(body)
        .exec((err,deleted)=>{
            if (err) return res.json({success:false,err});
            console.log('Deleted Sub:',deleted);
            res.json({success:true});
        })
})

subscribeRouter.post('/getSubscribeVideo',(req,res)=>{
    console.log(req.body)
    Subscribe.find(req.body)
        .exec((err,subscribeInfo)=>{
            if (err) return res.json({success:false,err});
            console.log('when getting SubList:',subscribeInfo);
            const videoWriterArray=subscribeInfo.map(subInfo=>subInfo.userTo);
            Video.find({writer : {$in : videoWriterArray}})
                .populate('writer')
                .exec((err,subscribedVideo)=>{
                    console.log('subed Video:',subscribedVideo);
                    if (err) return res.json({err,success:false});
                    res.json({success:true,subscribedVideo});
                })

        })
})

module.exports = subscribeRouter;