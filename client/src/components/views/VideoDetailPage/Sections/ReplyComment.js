import React, {useEffect, Fragment, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const {commentList,parentId,videoId,updateComment}=props;
    const [CommentNumber,setCommentNumber] = useState(0);
    const [OpenReply,setOpenReply] = useState(false);
    useEffect(()=>{
        let commentNumber = 0;
        commentList.map((comment,index)=>{
            if (comment.responseTo === parentId) {
                commentNumber++;
            }
            setCommentNumber(commentNumber);
        })
    },[])
    console.log('at Reply:',props)
    const renderReplyComment = commentList && commentList.map((commentInfo,index)=>(
            parentId=== commentInfo.responseTo &&
            <Fragment key={index}>
                <SingleComment updateComment={updateComment} comment={commentInfo} videoId={videoId} />
                <ReplyComment parentId={commentInfo._id} videoId={videoId} commentList={commentList} />
            </Fragment>))
    const toggleReply = setOpenReply(!OpenReply);
    return (
        <div>
            {CommentNumber >0 &&
                <p onClick={toggleReply}>View {CommentNumber} more comment(s)</p>
            }
        </div>
    )
}

export default ReplyComment
