import React,{useEffect,useState, Fragment} from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux';
import './Comment.css';

function SingleComment(props) {
    const {comment,videoId}=props;
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
            content : CommentValue
        }
        Axios.post('/api/comment/saveComment',submitVariable)
    }
    const textAreaChange = (e)=>{
        setCommentValue(e.target.value);
    }

    const renderForm = ()=>(
        <Fragment>
            <form onSubmit={submitComment} className='root_comment_form'>
                <textarea className='root_comment_textarea' 
                    value={CommentValue}
                    onChange={textAreaChange}
                >Seoul</textarea>                    
                <div className='button_container'>
                    <button className='cancel_btn' onClick={toggleOpenComment}>취소</button>
                    <button>댓글</button>
                </div>
            </form>
        </Fragment>
    )
    return (
        <Fragment>
            {comment.writer && <div className='singleComment_container'>
                    <div className='comment_writer_container'>
                        <img className='comment_writer_image' src={comment.writer.image} />
                        <div className='writer_info'>
                            <span>{comment.writer.name}</span>
                            <p>{comment.content}</p>
                        </div>
                    </div>
            <p onClick={toggleOpenComment}>댓글 달기</p>
            {OpenComment && renderForm()}
            </div>
            }
        </Fragment>
    )
}

export default SingleComment
