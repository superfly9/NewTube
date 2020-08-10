import React, { useEffect, useState, Fragment } from 'react';
import { Tooltip } from 'antd';
import {
    LikeOutlined,
    DislikeOutlined,
    LikeFilled,
    DislikeFilled
  } from '@ant-design/icons';
import Axios from 'axios';
import { CORS_URL } from '../../../Config';


function LikeDisLike(props) {
    const [LikeNumber,setLikeNumber] = useState(0);
    const [DisLikeNumber,setDisLikeNumber] =useState(0);
    const [Like,setLike] = useState(null);
    const [DisLike,setDisLike] = useState(null);
    const {video,videoId,userId,commentId} =props;
    console.log('CommnetId:',commentId)
    let body = {};
    if (video) {
        //userId:현재 로그인한 유저의 아이디
        body = {videoId}
    } else {
        body = {commentId}
    }

    useEffect(()=>{
        console.log("body:",body);
        Axios.post(`${CORS_URL}/like/getLikeNumber`,body)
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
        Axios.post(`${CORS_URL}/like/getDisLikeNumber`,body)
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
        let body = {};
        if (video) {
            body = {videoId,userId}
        } else {
            body = {commentId,userId}
        }
        console.log('handleLikeBody:',body,video)
        if (Like === 'Like') {
            Axios.post(`${CORS_URL}/like/unLike`,body)
                .then(response=>{
                    if (response.data.success) {
                        setLikeNumber(LikeNumber-1);
                        setLike(null);
                    }
                })
        } else {
            Axios.post(`${CORS_URL}/like/upLike`,body)
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
        let body = {};
        if (video) {
            body = {videoId,userId}
        } else {
            body = {commentId,userId}
        }
        console.log('handleDisLikeBody:',body,video)
        if (DisLike === 'DisLike') {
            Axios.post(`${CORS_URL}/like/unDisLike`,body)
                .then(response=>{
                    if (response.data.success) {
                        setDisLikeNumber(DisLikeNumber-1);
                        setDisLike(null);
                    }
                })
        } else {
            Axios.post(`${CORS_URL}/like/upDisLike`,body)
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
