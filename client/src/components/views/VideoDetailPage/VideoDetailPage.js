import React,{useEffect,useState, Fragment} from 'react';
import Axios from 'axios';
import {Row,Col} from 'antd';
import './VideoDetailPage.css';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
import LikeDisLike from './Sections/LikeDisLike';
import { CORS_URL } from '../../Config';

function VideoDetailPage(props) {
    const {match : {params : {videoId}}} =props;
    const [Comments,setComments] = useState([]);
    const [VideoInfo,setVideoInfo] = useState({});
    const userId=localStorage.getItem('userId');
    useEffect(() => {
        const body ={
            videoId
        }
        Axios.post(`${CORS_URL}/video/getVideoDetail`,body)
            .then(response=>{
                if (response.data.success) {
                    setVideoInfo(response.data.videoInfo);
                } else {
                    alert('비디오 정보를 가져오는 데 실패했습니다.')
                }
            })
        Axios.post(`${CORS_URL}/comment/getComments`,body)
            .then(response=>{
                if (response.data.success) {
                    const { data : {commentList}} = response;
                    setComments([...commentList]);
                } else {
                    alert('댓글 정보를 가져오는 데 실패했습니다.')
                }
            })
    }, [])

    const updateComment = (newComment)=>{
        setComments([...Comments,newComment])
    }

    const deleteVideo = (writerId) =>{
        let body = {writerId,videoId}
        Axios.post(`${CORS_URL}/video/deleteVideo`,body)
            .then(response=>{
                if (response.data.success) {
                    //비디오 삭제 요청=>db에서 삭제 후 응답이 success면 홈으로 이동
                    props.history.push('/');
                } else {
                    alert('비디오 삭제에 실패했습니다.')
                }
            })
    }
    const renderVideo = ()=>{
        if (VideoInfo.writer) {
            return (
                <Fragment>
                    <div className='video_container'>
                        <video src={`${CORS_URL}/${VideoInfo.filePath}`} controls />
                    </div>
                    <div className='video_info_container'>
                        <span className='video_info_writer_thumbnail'><img src={VideoInfo.writer.image} /></span>
                        <div className='video_info'>
                            <h3>{VideoInfo.writer.name}</h3>
                            <span>{VideoInfo.description}</span>
                        </div>

                        <div className='userAction_container'>
                            {userId && <LikeDisLike video videoId={videoId} userId={userId} /> }
                            {userId &&userId!==VideoInfo.writer._id && 
                            <Subscribe userTo={VideoInfo.writer._id} userFrom={localStorage.getItem('userId')} />
                        }
                        </div>
                        {
                        userId === VideoInfo.writer._id &&<button className='delete_video_btn' onClick={()=>deleteVideo(userId)}>Delete Video</button>
                        }
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>...Loading</div>
                </Fragment>
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
                    <Comment updateComment={updateComment} commentList={Comments} videoId={videoId}/>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        </div>
    )
}

export default VideoDetailPage
