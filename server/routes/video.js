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

module.exports = videoRouter;