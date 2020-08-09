import React, {useEffect, Fragment, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const {commentList,parentId,videoId,updateComment}=props;
    let [CommentNumber,setCommentNumber] = useState(0);
    const [OpenReply,setOpenReply] = useState(false);

    const showComment = ()=>{
        setOpenReply(!OpenReply)
    }
 
    const renderReplyComment = commentList && commentList.map((commentInfo,index)=>{
        if (commentInfo.responseTo === parentId) CommentNumber++;
        console.log(CommentNumber)
        if (index === commentList.length ) setCommentNumber(CommentNumber);
        return (
            commentInfo.responseTo === parentId &&
            <Fragment key={index}>
                <div style={{marginLeft:'30px'}}>
                    <SingleComment updateComment={updateComment} comment={commentInfo} videoId={videoId} />
                    <ReplyComment commentList={commentList} videoId={videoId} updateComment={updateComment} parentId={commentInfo._id} />
                </div>
            </Fragment>
        )
    })

    return (
        <div className='reply_comment_container'>
            <p onClick={showComment}>View {CommentNumber} Comment(s)</p>
            {OpenReply&&renderReplyComment}
        </div>
    )
}

export default ReplyComment
