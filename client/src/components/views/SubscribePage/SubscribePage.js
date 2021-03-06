import React,{useEffect,useState} from 'react'
import Axios from 'axios';
import {Row,Col} from 'antd';
import moment from 'moment';
import './SubscribePage.css';

function SubscribePage() {
    const [SubscribeVideo,setSubscribeVideo] = useState([]);
    useEffect(() => {
        const body = {
            userFrom : localStorage.getItem('userId')
        }
        Axios.post(`/subscribe/getSubscribeVideo`,body)
            .then(response=>{
                if (response.data.success) {
                    const {data : {subscribedVideo}} = response;
                    setSubscribeVideo(subscribedVideo);
                } else {
                    alert('구독하는 비디오 정보를 가져오는 데 실패했습니다.')
                }
            })
    }, [])
    const renderVideo = SubscribeVideo && SubscribeVideo.map((videoInfo,index)=>{
        const minutes = Math.floor(videoInfo.duration/60);
        const second  = Math.floor(videoInfo.duration - (minutes*60));
     return (<Col lg={6} md={8} xs={24} key={index}>
            <div className='video_container'>
                <div className='subscription_video_container'>
                    <a href={`/video/${videoInfo._id}`}>
                        <video src={videoInfo.filePath} />
                        <span className='subscription_video_duration'>{`${minutes}:${second}`}</span>
                    </a>
                </div>
                <div className='subscription_info_container'>
                    <div className='subscription_video_writer_thumbnail'>
                        <img src={`${videoInfo.writer.image}`}/>
                    </div>
                    <div className='subscription_video_info'>
                        <span>{videoInfo.title}</span>
                        <span>{videoInfo.description}</span>
                        <div>
                            <span>{videoInfo.views!==0 && videoInfo.view>1 ? `${videoInfo.views} views`: `${videoInfo.views} view` }</span>
                            <span> - {moment(videoInfo.createdAt).format("MMM Do YY")}</span>
                        </div>
                    </div>
                </div>

            </div>
            </Col>)
    })
    return (
        <div className='subscriptionPage_container'>
            <h2 className='subscriptionPage_title'>구독 리스트</h2>
            <Row gutter={[16,16]}>
                {renderVideo}
            </Row>
        </div>
    )
}

export default SubscribePage
