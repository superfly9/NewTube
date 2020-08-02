import React,{useEffect,useState, Fragment} from 'react';
import Axios from 'axios';
import {Row,Col} from 'antd';
import './VideoDetailPage.css';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';

function VideoDetailPage(props) {
    const {match : {params : {videoId}}} =props;
    const [VideoInfo,setVideoInfo] = useState({});
    useEffect(() => {
        const body ={
            videoId
        }
        Axios.post('/api/video/getVideoDetail',body)
            .then(response=>{
                if (response.data.success) {
                    setVideoInfo(response.data.videoInfo);
                } else {
                    alert('비디오 정보를 가져오는 데 실패했습니다.')
                }
            })
    }, [])

    const renderVideo = ()=>{
        if (VideoInfo.writer) {
            return (
                <Fragment>
                    <div className='video_container'>
                        <video src={`http://localhost:5000/${VideoInfo.filePath}`} controls />
                    </div>
                    <div className='video_info_container'>
                        <span className='video_info_writer_thumbnail'><img src={VideoInfo.writer.image} /></span>
                        <div className='video_info'>
                            <h3>{VideoInfo.writer.name}</h3>
                            <span>{VideoInfo.description}</span>
                        </div>

                        <Subscribe userTo={VideoInfo.writer._id} userFrom={localStorage.getItem('userId')} />
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Fragment>...Loading</Fragment>
            )
        }
    }
    return (
        <div className='videoDetail_container'>
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    {/* RenderVideo */}
                    {renderVideo()}
                    {/* Reply */}
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        </div>
    )
}

export default VideoDetailPage
