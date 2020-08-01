const express = require('express');
const videoRouter = express.Router();
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const {Video} = require('../models/Video');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })

const upload = multer({storage})

videoRouter.post('/uploadFile',upload.single('videoFile'),(req,res)=>{
    const {file:{originalname:fileName,path:filePath} }=req
    if (fileName && filePath) {
        res.json({success:true,filePath,fileName})
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
            console.log('Screenshots taken');
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
            console.log('vidoes:',videos)
            res.json({success:true,videos});
        })
})

videoRouter.post('/getVideoDetail',(req,res)=>{
    const {body : {videoId}} = req;
    Video.findOne({_id : videoId})
        .populate('writer')
        .exec((err,videoInfo)=>{
            if (err) return res.json({success:false,err})
            console.log('at DetailInfo:',videoInfo);
            res.json({success:true,videoInfo});
        })
})

module.exports = videoRouter;
