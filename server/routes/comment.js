const express = require('express');
const commentRouter = express.Router();
const {Comment} = require('../models/Comment');

commentRouter.post('/saveComment',(req,res)=>{
    const {body} = req;
    const newComment = new Comment(body);
    newComment.save((err,comment)=>{
        if (err) return res.json({err,success:false})
        
        Comment.findOne({_id : comment._id})  
            .populate('writer')
            .exec((err,commentInfo)=>{
                console.log('commentInfo:',commentInfo);
            
                if (err) return res.json({err,success:false})
                res.json({success:true,commentInfo})
            })
    })
});

commentRouter.post('/getComments',(req,res)=>{
    const { body :{videoId} }  = req;
    console.log('videoId:',videoId);
    Comment.find({videoId})
        .populate('writer')
        .exec((err,commentList)=>{
            if (err) return res.json({success:false,err});
            console.log('get All Comments:',commentList);
            res.json({success:true,commentList});
        })
})

module.exports = commentRouter;