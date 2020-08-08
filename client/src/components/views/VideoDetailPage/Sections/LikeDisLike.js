import React, { useEffect, useState, Fragment } from 'react';
import { Tooltip } from 'antd';
import {
    LikeOutlined,
    DislikeOutlined,
    LikeFilled,
    DislikeFilled
  } from '@ant-design/icons';
import Axios from 'axios';


function LikeDisLike(props) {
    const [LikeNumber,setLikeNumber] = useState(0);
    const [DisLikeNumber,setDisLikeNumber] =useState(0);
    const [Liked,setLiked] = useState(null);
    const [DisLiked,setDisLiked] = useState(null);
    const {video,videoId,userId,commentId} =props;

    let body = {};
    if (video) {
        //userId:현재 로그인한 유저의 아이디
        body = {videoId,userId}
    } else {
        body = {commentId,userId}
    }

    useEffect(()=>{
        Axios.post('/api/like/getLikeNumber',body)
            .then(response=>{
                if (response.data.success) {
                    const { data : {like}} =response;
                    setLikeNumber(like.length);
                    like.map((likeInfo)=>{
                        if (likeInfo.userId === userId) setLiked('Like');
                    })
                } else {
                    alert('좋아요 수를 가져오는 데 실패했습니다.')
                }
            })
        Axios.post('/api/like/getDisLikeNumber',body)
            .then(response=>{
                if (response.data.success) {
                    const { data : {dislike}} =response;
                    setDisLikeNumber(dislike.length);
                    dislike.map((disLikeInfo)=>{
                        if (disLikeInfo.userId === userId) setDisLiked('Dislike');
                    })
                } else {
                    alert('싫어요 수를 가져오는 데 실패했습니다.')
                }
            })
    },[])
    return (
        <div style={{display:'flex',alignItems:'center'}}>
            <Tooltip title="Like">
                {Liked === 'Like'?
                    <LikeFilled style={{fontSize:'1.2rem'}} />
                    :
                    <LikeOutlined style={{fontSize:'1.2rem'}} />
                }
                <span style={{cursor:'auto',padding:'.5rem'}}>{LikeNumber}</span>
            </Tooltip>
            <Tooltip title="DisLike">
                {DisLiked === 'DisLike'?
                    <DislikeFilled style={{fontSize:'1.2rem'}} />
                    :
                    <DislikeOutlined style={{fontSize:'1.2rem'}} />
                }
                <span style={{cursor:'auto',padding:'.5rem'}}>{DisLikeNumber}</span>
            </Tooltip>
        </div>
    )
}

export default LikeDisLike
