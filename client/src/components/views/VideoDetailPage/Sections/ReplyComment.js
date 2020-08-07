import React, {useEffect, Fragment, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const {commentList,parentId,videoId,updateComment}=props;
    const [CommentNumber,setCommentNumber] = useState(0);
    const [OpenReply,setOpenReply] = useState(false);

    const showComment = ()=>{
        setOpenReply(!OpenReply)
    }
 
    console.log('Reply Comment:',commentList,parentId,videoId)
    const renderReplyComment = commentList && commentList.map((commentInfo,index)=>(
        commentInfo.responseTo === parentId &&
            <Fragment key={index}>
                <div style={{marginLeft:'30px'}}>
                    <SingleComment updateComment={updateComment} comment={commentInfo} videoId={videoId} />
                    <ReplyComment commentList={commentList} videoId={videoId} updateComment={updateComment} parentId={commentInfo._id} />
                </div>
            </Fragment>
        
    ))

    return (
        <div>
            <p onClick={showComment}>View Seoul Comments</p>
            {OpenReply&&renderReplyComment}
        </div>
    )
}

export default ReplyComment
