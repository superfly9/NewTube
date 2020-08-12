import React,{useState} from 'react';
import {useSelector} from 'react-redux';
import Dropzone from '../utils/DropZone';
import Axios from 'axios';
import './VideoUploadPage.css';
import { CORS_URL } from '../../Config';

function VideoUploadPage(props) {
    const user = useSelector(state => state.user);
    const {userData} = user;
    const [Title,setTitle] = useState('');
    const [Description,setDescription] = useState('');
    const [Category,setCategory] = useState(0);
    const [VideoFilePath,setVideoFilePath] = useState('');
    const [Duration,setDuration] = useState(0);
    const [ThumbnailPath,setThumbnailPath] =useState('');

    const category = [
        {index:0, value:'Flim & Animation'},
        {index:1, value:'Sports'},
        {index:2, value:'Documentary & History'},
        {index:3, value:'Art & Music'},
        {index:4, value:'Living'},
        {index:5, value:'Comedy & Funny'}
    ]
    const renderOption = category.map((categoryInfo,index)=>(
    <option key={index} value={categoryInfo.index}>{categoryInfo.value}</option>
    ))

    const uploadVideo=(e)=>{
        e.preventDefault();

        if (Title === "" || Description === "" ||
        Category === "" || VideoFilePath === "" ||
        Duration === "" || ThumbnailPath === "") {
        return alert('모든 정보를 다 입력해주세요.')
    }
        const body ={
            writer : userData._id,
            title :Title,
            description :Description,
            category :Category,
            filePath : VideoFilePath,
            thumbnail :ThumbnailPath,
            duration: Duration
        }
        Axios.post(`${CORS_URL}/video/uploadVideo`,body)
            .then(response=>{
                if (response.data.success) {
                    alert('Success! 1초 뒤 홈으로 이동합니다.')
                    setTimeout(()=>{
                        props.history.push('/')
                    },1000)
                } else {
                    alert('Fail at Upload Video');
                }
            })
    }
    const handleOnChange=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'description':
                setDescription(value);
                break;
            default:
                break;
        }
    }
    const categoryChange=(e)=>{
        setCategory(e.target.value);
    }
    const updateState =(childComponentInfo)=>{
     const {filePath,thumbnailPath,fileDuration} = childComponentInfo;
     setVideoFilePath(filePath);
     setThumbnailPath(thumbnailPath);
     setDuration(fileDuration);
    }
    return (
        <div>
            <div className='upload_container'>
                <h2 className='upload_title'>Video Upload</h2>
                {/* Video Upload Form */}
                <form className='upload_container_form' onSubmit={uploadVideo}>
                    {/* DropZone */}
                    <div className='dropzone_container'>
                        <Dropzone updateState={updateState}/>
                        {/* Image thumbnail */}
                    </div>

                    <label htmlFor='title'>Title:</label>
                    <input name='title' id='title' onChange={handleOnChange} value={Title} placeholder='Write Title' />

                    <label htmlFor='description'>Description:</label>
                    <textarea name='description' id='description' onChange={handleOnChange} value={Description} placeholder='Write Description' />

                    <select value={Category} onChange={categoryChange}>
                        {renderOption}
                    </select>
                    <button>Upload Video</button>
                </form>
            </div>
        </div>
    )
}

export default VideoUploadPage
