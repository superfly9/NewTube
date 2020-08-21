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
      const formData = new FormData();
      formData.append('videoFile',acceptedFiles[0]);
      const config = {
        header : {'content-type': 'multipart/form-data'}
      }
      // 파일 업로드시 썸네일 노드 서버에 파일 저장 및 파일의 경로/썸네일 경로/길이를 받아옴
      Axios.post(`/video/uploadFile`,formData,config)
        .then(response=>{
          if (response.data.success) {
            const {data:{ filePath } } = response
            const body = {filePath}
            setVideoFilePath(filePath);
            Axios.post(`/video/thumbnail`,body)
              .then(response=>{
                if (response.data.success) {
                  const { data : {thumbnailPath,fileDuration}} =response
                  setThumbnailPath(thumbnailPath)
                  //부모 컴포넌트에 정보를 전달해주기 위한 함수인 props.updateState실행
                  props.updateState({filePath,thumbnailPath,fileDuration})
                }
              })

          }
        })
    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop})
    return (
      <Fragment>
        <div className='dropzone' {...getRootProps()}>
          <input {...getInputProps()} />
              <PlusOutlined  style={{fontSize:'3rem'}}/>
        </div>
        <div className='dropzone_thumbnail'>
          {ThumbnailPath &&<img src={`/${ThumbnailPath}`} alt='image' />}
        </div>
      </Fragment>
    )
  }

  export default Dropzone;