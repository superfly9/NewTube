import React,{useEffect,useState, Fragment} from 'react'
import './Comment.css';
import {useSelector} from 'react-redux';
import Axios from 'axios';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
function Comment(props) {
    const user = useSelector(state=>state.user);
    const {userData} = user;
    const {videoId,commentList,updateComment} = props;
    const [CommentValue,setCommentValue] = useState([]);
    const [ShowComment,setShowComment] = useState(false);

    const textAreaChange = (e)=>{
        setCommentValue(e.target.value);
    }
    // 로그인 했을 때만 댓글 창 사용가능하게 해야
    const submitComment = (e)=>{
        e.preventDefault();
        const submitVariables = {
            videoId : videoId,
            writer : userData._id,
            content : CommentValue
        }
        Axios.post('/api/comment/saveComment',submitVariables)
            .then(response=>{
                if (response.data.success) {
                    const {data : {commentInfo}} = response
                    updateComment(commentInfo);
                    setCommentValue('');
                    setShowComment(false);
                    // [{}]
                } else {
                    alert('댓글 저장에 실패했습니다.')
                }
            })
    }
    const renderSingleComments = commentList && commentList.map(
        (commentInfo,index)=>(
            !commentInfo.responseTo &&
            <Fragment key={index}>
                <SingleComment updateComment={updateComment} comment={commentInfo} videoId={videoId} />
            </Fragment>
    ))
    
    const cancelComment = () =>setShowComment(!ShowComment)
    
    const renderForm = () =>{
        if (userData._id) {
            let userId = userData._id
            return (
                <form onSubmit={submitComment} className='root_comment_form'>
                    <textarea className='root_comment_textarea' 
                        value={CommentValue}
                        onBlur={cancelComment}
                        onChange={textAreaChange}
                        onClick={cancelComment}
                        placeholder='내용을 입력하세요'
                    ></textarea>
                    {ShowComment &&
                        <div className='button_container'>
                            <button className='cancel_btn' onClick={cancelComment}>취소</button>
                            <button>댓글</button>
                        </div>
                    }
            </form>
            )
        } else {
            return (
                <form onSubmit={submitComment} className='root_comment_form'>
                <textarea className='root_comment_textarea' 
                    value={CommentValue}
                    onChange={textAreaChange}
                    onClick={cancelComment}
                    placeholder='로그인 후 댓글 등록이 가능합니다.'
                ></textarea>
            </form>
            )
        }
    }
    return (
        <div>
            <p>댓글</p>
            <hr />
            {userData&&renderForm()}
            {renderSingleComments}
        </div>
    )
}

export default Comment
