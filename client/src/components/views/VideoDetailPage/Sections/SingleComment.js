import React,{useEffect,useState, Fragment} from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux';
import './Comment.css';

function SingleComment(props) {
    const {comment,videoId,updateComment}=props;
    const user = useSelector(state=>state.user);
    const {userData} = user;
    const [OpenComment,setOpenComment] = useState(false);
    const [CommentValue,setCommentValue] = useState('');

    const toggleOpenComment = () =>{
        setOpenComment(!OpenComment)
    }
    const submitComment = (e) =>{
        e.preventDefault();
        const submitVariable = {
            videoId : videoId ,
            writer  : userData._id,
            content : CommentValue,
            responseTo : comment._id
        }
        Axios.post('/api/comment/saveComment',submitVariable)
            .then(response=>{
                if (response.data.success) {
                    const { data : {commentInfo}} = response;
                    updateComment(commentInfo);
                    setCommentValue('');
                }
            })
    }
    const textAreaChange = (e)=>{
        setCommentValue(e.target.value);
    }

    const renderForm = () =>{
        if (userData._id) {
            let userId = userData._id
            return (
                <form onSubmit={submitComment} className='root_comment_form'>
                    <textarea className='root_comment_textarea' 
                        value={CommentValue}
                        onChange={textAreaChange}
                        placeholder='내용을 입력하세요'
                    ></textarea>
                    {OpenComment &&
                        <div className='button_container'>
                            <button className='cancel_btn' onClick={toggleOpenComment}>취소</button>
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
                    placeholder='로그인 후 댓글 등록이 가능합니다.'
                ></textarea>
            </form>
            )
        }
    }
    const renderSingleComment =()=>{
        return (
            comment.writer && 
            <div className='singleComment'> 
                <div className='comment_writer_container'>
                    <img className='comment_writer_image' src={comment.writer.image} />
                    <div className='writer_info'>
                        <span>{comment.writer.name}</span>
                        <p>{comment.content}</p>
                    </div>
                </div>
                <p onClick={toggleOpenComment}>댓글 달기</p>
            </div>
        )
    }
    return (
        <div className='singleComment_container'>
                {renderSingleComment()}
                {OpenComment && userData && renderForm()}
        </div>
    )
}

export default SingleComment
