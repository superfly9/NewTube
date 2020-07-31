import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone';
import './DropZone.css';
import { PlusOutlined } from '@ant-design/icons';



const Dropzone=()=>{
    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
      console.log(acceptedFiles);
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