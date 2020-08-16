import React,{ useState } from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux';
import './Comment.css';
import LikeDisLike from './LikeDisLike';

function SingleComment(props) {
    const {comment,videoId,updateComment}=props;
    const user = useSelector(state=>state.user);
    const {userData} = user;
    const userId = localStorage.getItem('userId');
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
        Axios.post(`/comment/saveComment`,submitVariable)
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
    const deleteComment = ()=>{
        const responseTo = comment.responseTo;
        const writer = localStorage.getItem('userId');

        Axios.post(`/comment/deleteComment`,{writer,responseTo,videoId})
            .then(response=>{
                if (response.data.success) {
                    let {data:{remainComments}}=response
                    //삭제가 완료된 커멘트 정보들을 updateComment통해 상위 컴포넌트로 전달
                    console.log('Alive Comment:',remainComments)
                    if (!remainComments) remainComments=[];
                    updateComment(remainComments)
                } else {
                    alert('내 댓글 삭제에 실패했습니다.')
                }
            })
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
                <div className='userAction_container'>
                    <p onClick={toggleOpenComment}>댓글 달기</p>
                    {/* 로그인 유저 === comment.user._id이면 댓글삭제 가능하게 */}
                    {userId === comment.writer._id &&<button className='comment_delete_btn' onClick={deleteComment}>댓글 삭제</button>}
                    {userId && <LikeDisLike commentId={comment._id} videoId={videoId} userId={userId} /> }
                </div>
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
