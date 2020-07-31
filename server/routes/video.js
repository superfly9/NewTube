const express = require('express');
const videoRouter = express.Router();
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');

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
            console.log('Will generate ' + filenames.join(', '),filenames)
            thumbnailPath = "uploads/thumbnails/" + filenames[0];
            console.log(filePath,thumbnailPath);
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



module.exports = videoRouter;