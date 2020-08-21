const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const AWS = require('aws-sdk');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const config = require('./config/key');

dotenv.config();

console.log('access Key:',process.env.ACCESS_KEY,
'secretAccessKey:',process.env.SECRET_ACCESS_KEY
)
AWS.config.update({
  accessKeyId:process.env.ACCESS_KEY,
  secretAccessKey:process.env.SECRET_ACCESS_KEY,
  region:'ap-northeast-2'
})
app.use(cors({credentials:true,origin:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


app.use('/users', require('./routes/users'));
app.use('/video',require('./routes/video'));
app.use('/subscribe',require('./routes/subscribe'));
app.use('/comment',require('./routes/comment'));
app.use('/like',require('./routes/like'));

app.use('/uploads', express.static('uploads'));


app.use(express.static(path.join(__dirname, './client/build')))


if (process.env.NODE_ENV === "production") {

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});