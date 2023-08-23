import './comments.scss'
import { useState, useEffect, useRef } from 'react';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {ColorRing, Comment} from 'react-loader-spinner'
import { createComment } from '../../redux/slices/comments/commentSlice';
import { useClickOutside } from '../../utility/useClickOutside';


const Comments = ({post, commentArr, setCommentArr, commentOpen, setCommentOpen}) => {
const [desc, setDesc] = useState("");
const  { user }= useSelector((state) => state.auth)
const  { comments, isLoading, isSuccess, isError, message }= useSelector((state) => state.comments)
const  { users }= useSelector((state) => state.users)
const currentUser = users.find((item)=>item._id === user._id)
const dispatch = useDispatch();
const commentBox = useRef()

let filterComments = comments.filter((item) =>item.postId === post._id)

useClickOutside(commentBox, false, setCommentOpen)

useEffect(()=> {
  if (comments) {
    setCommentArr(filterComments)
  }

},[dispatch])




useEffect(()=> {
  if (comments) {
    setCommentArr(filterComments)
  }

},[comments])


  const createComments = async (e) => {
    e.preventDefault()
    
    try {
      const res = await createComment({postId:post._id, userId:user._id, comment: desc })
        dispatch(res)
    
        if (isSuccess) {
          toast.success('Comment has been successfully posted')
         
        }
      
  } catch (err) {
      toast.error(err?.data?.message || err.error);
      
  }

  };



  return (
    <div className="comments" ref={commentBox}>
       
            <div className="write">
            <img src={'/upload/'+user.profilePicture} alt="" />
            <input type="text" placeholder="write a comment" onChange={(e) => setDesc(e.target.value)}/>
            {isLoading ? <Comment
                            visible={true}
                            height="60"
                            width="60"
                            ariaLabel="comment-loading"
                            wrapperStyle={{}}
                            wrapperClass="comment-wrapper"
                            color="#fff"
                            backgroundColor="#F4442E"
                          /> : 
                          <button onClick={createComments}>Send</button>
                          }
            
          </div>
          <div className="commentsWrapper">
            {
            isError ? 'Somthing went wrong' :
            commentArr?.map((comment) => (
              <div className="comment" key={comment._id}>
                {isLoading ? 
                        <div className="spinner">
                          <ColorRing
                              visible={true}
                              height="40"
                              width="40"
                              ariaLabel="blocks-loading"
                              wrapperStyle={{}}
                              wrapperClass="blocks-wrapper"
                              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                          />  
                          <p>Loading...</p>
                        </div> :
                <>
                  <img src={'/upload/'+users.find((item)=> item._id === comment.userId).profilePicture} alt="" />
                  <div className="info">
                    <span>{users.find((item)=> item._id === comment.userId).name}</span>
                    <p>{comment.comment}</p>
                  </div>
                  <span className="date">{moment(comment.createdAt).fromNow()}</span>
                </>}
              </div>
            ))}

          </div>
       
    </div>
  )
}

export default Comments