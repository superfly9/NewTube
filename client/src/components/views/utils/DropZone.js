import React, {useCallback,useState, Fragment} from 'react'
import {useDropzone} from 'react-dropzone';
import './DropZone.css';
import { PlusOutlined } from '@ant-design/icons';
import Axios from 'axios';



const Dropzone=(props)=>{
    const [VideoFilePath,setVideoFilePath] = useState('');
    const [Duration,setDuration] = useState(0);
    const [ThumbnailPath,setThumbnailPath] =useState('');

    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
      const formData = new FormData();
      formData.append('videoFile',acceptedFiles[0]);
      const config = {
        header : {'content-type': 'multipart/form-data'}
      }
      Axios.post('/api/video/uploadFile',formData,config)
        .then(response=>{
          if (response.data.success) {
            const {data:{filePath,fileName}} = response
            const body = {filePath, fileName}
            setVideoFilePath(filePath);
            Axios.post('/api/video/thumbnail',body)
              .then(response=>{
                if (response.data.success) {
                  const { data : {thumbnailPath,fileDuration}} =response
                  setThumbnailPath(thumbnailPath)
                  console.log(response.data)
                }
              })

          }
        })
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
      <Fragment>
        <div className='dropzone' {...getRootProps()}>
          <input {...getInputProps()} />
              <PlusOutlined  style={{fontSize:'3rem'}}/>
        </div>
        <div>
          {ThumbnailPath &&<img src={`http://localhost:5000/${ThumbnailPath}`} alt='image' />}
        </div>
      </Fragment>
    )
  }

  export default Dropzone;