import React,{useEffect,useState} from 'react'
import './LandingPage.css';
import Axios from 'axios'
import {Row,Col} from 'antd';
import moment from 'moment';

function LandingPage() {
    const [Videos,setVideos] = useState([]);
    useEffect(() => {
        Axios.get('/api/video/getVideos')
            .then(response=>{
                if (response.data.success) {
                    const { data : {videos}} =response;
                    console.log(videos);
                    setVideos(videos);
                }
            })
    }, [])
    const renderVideo = Videos && Videos.map((videoInfo,index)=>{
        const minutes = Math.floor(videoInfo.duration/60);
        const second  = Math.floor(videoInfo.duration - (minutes*60));
     return (<Col lg={6} md={8} xs={24} key={index}>
                <div className='landing_video_thumbnail'>
                    <a href={`/video/${videoInfo._id}`}>
                        <img src={`http://localhost:5000/${videoInfo.thumbnail}`}/>
                        <span className='landing_video_duration'>{`${minutes}:${second}`}</span>
                    </a>
                </div>
                <div className='landing_video_info_container'>
                    <div className='landing_video_writer_thumbnail'>
                        <img src={`${videoInfo.writer.image}`}/>
                    </div>
                    <div className='landing_video_info'>
                        <span>{videoInfo.title}</span>
                        <span>{videoInfo.description}</span>
                        <div>
                            <span>{videoInfo.views!==0 && videoInfo.view>1 ? `${videoInfo.views} views`: `${videoInfo.views} view` }</span>
                            <span> - {moment(videoInfo.createdAt).format("MMM Do YY")}</span>
                        </div>
                    </div>
                </div>
            </Col>)
    })
    return (
        <div className='landingPage_container'>
            <h2 className='landingPage_title'>Videos</h2>
            <Row gutter={[16,16]}>
                {renderVideo}
            </Row>
        </div>
    )
}

export default LandingPage
