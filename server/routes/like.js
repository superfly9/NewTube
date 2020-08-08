const express = require('express');
const likeRouter = express.Router();
const {Like} = require('../models/Like');
const {DisLike} = require('../models/DisLike');

likeRouter.post('/getLikeNumber',(req,res)=>{
    let {body : {videoId,userId,commentId}} = req;
    let variable = {}
    if (videoId) {
        variable = {videoId}
    } else {
        variable = {commentId}
    }
    Like.find(variable)
        .exec((err,like)=>{
            if (err) return res.json({success:false,err});
            console.log('getLike:',like)
            res.json({success:true,like})
        })
})

likeRouter.post('/getDisLikeNumber',(req,res)=>{
    let {body : {videoId,userId,commentId}} = req;
    let variable = {}
    if (videoId) {
        variable = {videoId}
    } else {
        variable = {commentId}
    }
    DisLike.find(variable)
        .exec((err,dislike)=>{
            if (err) return res.json({success:false,err});
            console.log('getLike:',dislike)
            res.json({success:true,dislike})
        })
})


module.exports = likeRouter;