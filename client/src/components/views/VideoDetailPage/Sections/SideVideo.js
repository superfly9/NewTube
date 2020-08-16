import React,{useEffect,useState, Fragment} from 'react'
import Axios from 'axios'
import './SideVideo.css';


function SideVideo(props) {
    const [sideVideos,setSideVideos]=useState([]);
    useEffect(() => {
        Axios.get(`/video/getVideos`)
            .then(response=>{
                if (response.data.success) {
                    setSideVideos([...response.data.videos])
                } else {
                    alert('비디오 정보를 가져오는 데 실패했습니다.')
                }
            })
    }, [])
    const decideThumbnail=(videoInfo)=>{
        if (process.env.NODE_ENV==='production') {
            return `http://localhost:5000/${videoInfo.thumbnail}`
        } else {
            return `/${videoInfo.thumbnail}`
        }
    }
    const renderSideVideos = sideVideos && sideVideos.map((sideVideoInfo,index)=>{
        const minutes = Math.floor(sideVideoInfo.duration/60);
        const seconds = Math.floor(sideVideoInfo.duration-(minutes*60));
        return (
        <div className='sideVideo_container' key={index}>
            <div className='sideVideo_thumbnail'>
                <a href={`/video/${sideVideoInfo._id}`}>
                    <img src={decideThumbnail(sideVideoInfo)} />
                </a>
            </div>
            <div className='sideVideo_info'>
                <span>{sideVideoInfo.writer.name}</span>
                <span>{sideVideoInfo.views>0 && sideVideoInfo.views>1 ?
                `${sideVideoInfo.views} views`  : `${sideVideoInfo.views} view`}</span>
                <span>{minutes}:{seconds}</span>
            </div>
        </div>
    )})
    return (
        <Fragment>
            {renderSideVideos}
        </Fragment>
    )
}

export default SideVideo
