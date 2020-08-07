import React,{useEffect,useState, Fragment} from 'react';
import Axios from 'axios';
import {Row,Col} from 'antd';
import './VideoDetailPage.css';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function VideoDetailPage(props) {
    const {match : {params : {videoId}}} =props;
    const [Comments,setComments] = useState([]);
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
        Axios.post('/api/comment/getComments',body)
            .then(response=>{
                if (response.data.success) {
                    const { data : {commentList}} = response;
                    console.log('commentList:',commentList);
                    setComments([...commentList]);
                } else {
                    alert('댓글 정보를 가져오는 데 실패했습니다.')
                }
            })
    }, [])

    const updateComment = (newComment)=>{
        console.log('when Update Comment:',newComment);
        //newComment => {_id,videoId,content,createdAt,updateAt}
        setComments([...Comments,newComment])
    }

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

                        <div className='subscribe_btn_container'>
                            {localStorage.getItem('userId')!==VideoInfo.writer._id && 
                            <Subscribe userTo={VideoInfo.writer._id} userFrom={localStorage.getItem('userId')} />
                            }
                        </div>
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
