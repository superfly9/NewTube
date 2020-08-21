import React, {useCallback,useState, Fragment} from 'react'
import {useDropzone} from 'react-dropzone';
import './DropZone.css';
import { PlusOutlined } from '@ant-design/icons';
import Axios from 'axios';



const Dropzone=(props)=>{
    const [VideoFilePath,setVideoFilePath] = useState(null);
    const {updateState} = props;

    const onDrop = useCallback(acceptedFiles => {
      console.log(acceptedFiles)
      const formData = new FormData();
      const config = {
        header : {'content-type': 'multipart/form-data'}
      }
      formData.append('videoFile',acceptedFiles[0])
      // 파일 업로드시 썸네일 노드 서버에 파일 저장 및 파일의 경로/썸네일 경로/길이를 받아옴
      Axios.post(`/video/uploadFile`,formData,config)
        .then(response=>{
          if (response.data.success) {            
            const {data:{ filePath,fileDuration}} = response
            setVideoFilePath(filePath)
            updateState({filePath,fileDuration})
            }
          })
    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop})
    return (
      <Fragment>
        <div className='dropzone' {...getRootProps()}>
          {VideoFilePath ? <p className='upload_message'>비디오 업로드 성공!</p>  : 
          <Fragment>
            <input {...getInputProps()}  />
            <PlusOutlined  style={{fontSize:'3rem'}}/>
          </Fragment>
          }
        </div>
      </Fragment>
    )
  }

  export default Dropzone;