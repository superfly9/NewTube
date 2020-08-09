const express = require('express');
const likeRouter = express.Router();
const {Like} = require('../models/Like');
const {DisLike} = require('../models/DisLike');

likeRouter.post('/getLikeNumber',(req,res)=>{
    let {body : {videoId,commentId}} = req;
    let variable = {}
    if (videoId) {
        variable = {videoId}
    } else {
        variable = {commentId}
    }
    Like.find(variable)
        .exec((err,like)=>{
            if (err) return res.json({success:false,err});
            res.json({success:true,like})
        })
})

likeRouter.post('/getDisLikeNumber',(req,res)=>{
    let {body : {videoId,commentId}} = req;
    let variable = {}
    if (videoId) {
        variable = {videoId}
    } else {
        variable = {commentId}
    }
    DisLike.find(variable)
        .exec((err,dislike)=>{
            if (err) return res.json({success:false,err});
            res.json({success:true,dislike})
        })
})

likeRouter.post('/upLike',(req,res)=>{
    const like = new Like(req.body);
    like.save((err,newLike)=>{
        if (err) return res.json({success:false,err});
    const DisLikeResult=DisLike.findOneAndDelete(req.body)
        .exec(async(err,result)=>{
            if (err) return res.json({success:false,err});
            res.json({success:true});
        })  
    })
})

likeRouter.post('/unLike',(req,res)=>{
    const {body : {userId,videoId,commentId}} = req;
    let variable = {}
    if (videoId) {
        //videoLike삭제
        variable  = {userId,videoId};
    } else {
        variable =  {userId,commentId}
        //commentLike삭제
    }
    Like.findOneAndDelete(variable)
        .exec((err,result)=>{
            if (err) return res.json({success:false,err});
            res.json({success:true})
        })
})

likeRouter.post('/unDisLike',(req,res)=>{
    DisLike.findOneAndDelete(req.body)
        .exec((err,deletedDisLike)=>{
            if (err) return res.json({err,success:false});
            res.json({success:true});
        })
})

likeRouter.post('/upDisLike',(req,res)=>{
    const dislike = new DisLike(req.body);
    dislike.save(async(err,newDisLike)=>{
        if (err) return res.json({success:false,err});
        const result = await Like.findOneAndDelete(req.body);
        res.json({success:true})
    })
})

module.exports = likeRouter;