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
            
                if (err) return res.json({err,success:false})
                res.json({success:true,commentInfo})
            })
    })
});

commentRouter.post('/getComments',(req,res)=>{
    const { body :{videoId} }  = req;
    Comment.find({videoId})
        .populate('writer')
        .exec((err,commentList)=>{
            if (err) return res.json({success:false,err});
            res.json({success:true,commentList});
        })
})

commentRouter.post('/deleteComment',(req,res)=>{
    const {body : {videoId,writer,responseTo}} = req;
    Comment.findOneAndDelete({videoId,writer,responseTo})
        .exec((err,deletedItem)=>{
            if (err) return res.json({err,success:false});
            Comment.find({videoId})
                .populate('writer')
                .exec((err,remainComments)=>{
                    if (err) return res.json({err,success : false});
                    console.log('show All Remain',remainComments);
                    res.json({success:true,remainComments});
                })
        })
})


module.exports = commentRouter;