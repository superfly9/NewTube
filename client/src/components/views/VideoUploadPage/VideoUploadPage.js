import React,{useEffect,useState} from 'react';
import Dropzone from '../utils/DropZone';
import './VideoUploadPage.css';

function VideoUploadPage() {
    const [Title,setTitle] = useState('');
    const [Description,setDescription] = useState('');
    const [Category,setCategory] = useState(0);

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
    return (
        <div>
            <div className='upload_container'>
                <h2 className='upload_title'>Video Upload</h2>
                {/* Video Upload Form */}
                <form className='upload_container_form' onSubmit={uploadVideo}>
                    {/* DropZone */}
                    <div className='dropzone_container'>
                        <Dropzone />
                        {/* Image thumbnail */}
                        <img src='/' alt='' />
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
