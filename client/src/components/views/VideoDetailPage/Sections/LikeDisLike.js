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
    const [Like,setLike] = useState(null);
    const [DisLike,setDisLike] = useState(null);
    const {video,videoId,userId,commentId} =props;

    let body = {};
    if (video) {
        //userId:현재 로그인한 유저의 아이디
        body = {videoId,userId}
    } else {
        body = {commentId,userId}
    }

    useEffect(()=>{
        console.log('Body:',body);
        Axios.post('/api/like/getLikeNumber',body)
            .then(response=>{
                if (response.data.success) {
                    const { data : {like}} =response;
                    setLikeNumber(like.length);
                    console.log('Like Info:',like)
                    like.map((likeInfo)=>{
                        if (likeInfo.userId === userId) setLike('Like');
                    })
                } else {
                    alert('좋아요 수를 가져오는 데 실패했습니다.')
                }
            })
        Axios.post('/api/like/getDisLikeNumber',body)
            .then(response=>{
                if (response.data.success) {
                    const { data : {dislike}} =response;
                    console.log('DisLike Info:',dislike)
                    setDisLikeNumber(dislike.length);
                    dislike.map((disLikeInfo)=>{
                        if (disLikeInfo.userId === userId) setDisLike('DisLike');
                    })
                } else {
                    alert('싫어요 수를 가져오는 데 실패했습니다.')
                }
            })
    },[])

    const handleLike=()=>{
        if (Like === 'Like') {
            Axios.post('/api/like/unLike',body)
                .then(response=>{
                    if (response.data.success) {
                        setLikeNumber(LikeNumber-1);
                        setLike(null);
                    }
                })
        } else {
            Axios.post('/api/like/upLike',body)
            .then(response=>{
                setLike('Like');
                setLikeNumber(LikeNumber+1);
                if (response.data.success) {
                    if (DisLike === 'DisLike') {
                        setDisLike(null);
                        setDisLikeNumber(DisLikeNumber-1)
                    }       
                    }
                })
        }
    }

    const handleDisLike=()=>{
        console.log('DisLike Body:',body);
        if (DisLike === 'DisLike') {
            Axios.post('/api/like/unDisLike',body)
                .then(response=>{
                    if (response.data.success) {
                        setDisLikeNumber(DisLikeNumber-1);
                        setDisLike(null);
                    }
                })
        } else {
            Axios.post('/api/like/upDisLike',body)
                .then(response=>{
                    if (response.data.success) {
                        setDisLike('DisLike');
                        setDisLikeNumber(DisLikeNumber+1);
                        if (Like === 'Like') {
                            setLikeNumber(LikeNumber-1);
                            setLike(null);
                        }
                    }
                })
        }
    }
    return (
        <div style={{display:'flex',alignItems:'center'}}>
            <Tooltip title="Like">
                {Like === 'Like'?
                    <LikeFilled onClick={handleLike} style={{fontSize:'1.2rem'}} />
                    :
                    <LikeOutlined onClick={handleLike} style={{fontSize:'1.2rem'}} />
                }
                <span style={{cursor:'auto',padding:'.5rem'}}>{LikeNumber}</span>
            </Tooltip>
            <Tooltip title="DisLike">
                {DisLike === 'DisLike'?
                    <DislikeFilled onClick={handleDisLike} style={{fontSize:'1.2rem'}} />
                    :
                    <DislikeOutlined onClick={handleDisLike} style={{fontSize:'1.2rem'}} />
                }
                <span style={{cursor:'auto',padding:'.5rem'}}>{DisLikeNumber}</span>
            </Tooltip>
        </div>
    )
}

export default LikeDisLike
