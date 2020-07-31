import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone';
import './DropZone.css';
import { PlusOutlined } from '@ant-design/icons';
import Axios from 'axios';



const Dropzone=()=>{
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
            
          }
        })
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
      <div className='dropzone' {...getRootProps()}>
        <input {...getInputProps()} />
            <PlusOutlined  style={{fontSize:'3rem'}}/>
      </div>
    )
  }

  export default Dropzone;