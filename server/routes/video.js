const express = require('express');
const videoRouter = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS= require('aws-sdk');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const {Video} = require('../models/Video');


const s3=new AWS.S3();
const upload = multer({
    storage : multerS3({
        s3,
        bucket:'seoul-tube/video',
        acl:'public-read',
        key : function (req,file,cb) {
            console.log('AWS:',file)
            let extension = path.extname(file.originalname);
            cb(null,`${Date.now().toString()}${extension}`)
        }
    })
})

videoRouter.post('/uploadFile',upload.single('videoFile'),(req,res)=>{
    console.log('req.file:',req.file)
    const {file:{location} }=req
    if (filePath) {
        res.json({success:true,filePath:location})
    }
})


videoRouter.post("/thumbnail", (req, res) => {

    let thumbnailPath ="";
    let fileDuration ="";

    const {body :{filePath}} = req;
    ffmpeg.ffprobe(filePath, function(err, metadata){
        fileDuration = metadata.format.duration;
    })

    ffmpeg(filePath)
        .on('filenames', function (filenames) {
            thumbnailPath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            return res.json({ success: true, thumbnailPath, fileDuration})
        })
        .screenshots({
            count: 3,
            folder: 'uploads/thumbnails',
            size:'320x240',
            filename:'thumbnail-%b.png'
        });

});


videoRouter.post('/uploadvideo',(req,res)=>{
    const newVideo = new Video(req.body);
    newVideo.save((err,video)=>{
        if (err) return res.json({err,success:false})
        res.json({success:true,video})
    })
})

videoRouter.get('/getVideos',(req,res)=>{
    Video.find({})
        .populate('writer')
        .exec((err,videos)=>{
            if (err) return res.json({err,success:false});
            res.json({success:true,videos});
        })
})

videoRouter.post('/getVideoDetail',(req,res)=>{
    const {body : {videoId}} = req;
    Video.findOne({_id : videoId})
        .populate('writer')
        .exec((err,videoInfo)=>{
            if (err) return res.json({success:false,err})
            res.json({success:true,videoInfo});
        })
})

videoRouter.post('/deleteVideo',(req,res)=>{
    const {body : {videoId,writerId}} = req;
    Video.findOneAndDelete({
        writer : writerId,
        _id : videoId
    }).exec((err,result)=>{
            if (err) return res.json({err,success:false});
            res.json({success:true});
        })
})


module.exports = videoRouter;
