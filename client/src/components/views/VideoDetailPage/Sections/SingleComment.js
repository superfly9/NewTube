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

    console.log('Single Comment Info:',comment)
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
                    console.log('comment Info at SingleComment:',commentInfo);
                    updateComment(commentInfo);
                    setCommentValue('');
                }
            })
    }
    const textAreaChange = (e)=>{
        setCommentValue(e.target.value);
    }

    const renderForm = ()=>(
        <form onSubmit={submitComment} className='root_comment_form'>
                <textarea className='root_comment_textarea' 
                    value={CommentValue}
                    onChange={textAreaChange}
                    onClick={toggleOpenComment}
                    placeholder='내용을 입력하세요'
                ></textarea>                    
                <div className='button_container'>
                    <button className='cancel_btn' onClick={toggleOpenComment}>취소</button>
                    <button>댓글</button>
                </div>
        </form>
    )
    const renderSingleComment =()=>{
        return (
            comment.writer && 
            <div className='singleComment_container'> 
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
        <Fragment>
                {renderSingleComment()}
                {OpenComment && renderForm()}
        </Fragment>
    )
}

export default SingleComment
