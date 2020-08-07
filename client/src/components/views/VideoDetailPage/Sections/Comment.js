import React,{useEffect,useState, Fragment} from 'react'
import './Comment.css';
import {useSelector} from 'react-redux';
import Axios from 'axios';
import SingleComment from './SingleComment';
function Comment(props) {
    const user = useSelector(state=>state.user);
    const {userData} = user;
    const {videoId,commentList,updateComment} = props;
    const [CommentValue,setCommentValue] = useState([]);
    const [ShowComment,setShowComment] = useState(true);

    const textAreaChange = (e)=>{
        setCommentValue(e.target.value);
    }
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
                    console.log(commentInfo);
                    updateComment(commentInfo);
                    setCommentValue('');
                    // [{}]
                } else {
                    alert('댓글 저장에 실패했습니다.')
                }
            })
    }
    const renderSingleComments = commentList && commentList.map((commentInfo,index)=>(
        <Fragment key={index}>
            {
                !commentInfo.responseTo &&<SingleComment updateComment={updateComment} comment={commentInfo} videoId={videoId} />
            }
        </Fragment>
    ))
    const cancelComment = () =>{
        setShowComment(!ShowComment)
    }
    return (
        <div>
            <p>댓글</p>
            <hr />
                <form onSubmit={submitComment} className='root_comment_form'>
                    <textarea className='root_comment_textarea' 
                        value={CommentValue}
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
            {renderSingleComments}
        </div>
    )
}

export default Comment
