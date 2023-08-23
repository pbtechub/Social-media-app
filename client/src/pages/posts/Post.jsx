import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState, useEffect, useRef } from "react";
import moment from 'moment'
import PostAction from "./PostAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getPosts, likePost } from "../../redux/slices/posts/postsSlices";
import { getComments } from "../../redux/slices/comments/commentSlice";
import { ColorRing } from 'react-loader-spinner'
import {useClickInside} from "../../utility/useClickOutside";





const Post = ({ post }) => {
  const [open, setOpen] = useState(false)
    const [commentOpen, setCommentOpen] = useState(false);
    const [likesArr, setLikesArr] = useState([])
    const [commentArr, setCommentArr] = useState([])
    const  { users }= useSelector((state) => state.users)
    const  { comments }= useSelector((state) => state.comments)
    const  { posts, isLoading, isSuccess, isError, message }= useSelector((state) => state.posts)
    const  { user }= useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const actionBtn = useRef()
    const commentBtn = useRef()
 
  let userArr = users ? users : []
  let filterComments = comments.filter((item) =>item.postId === post._id)

  useClickInside(actionBtn, open, setOpen)
  useClickInside(commentBtn, commentOpen, setCommentOpen)
 

  useEffect(()=> {
    if (posts) {
      setLikesArr(post.likes)
      
    }

    dispatch(getComments())

    if (comments) {
      setCommentArr(filterComments)
    }

  },[])


  useEffect(()=> {
    if (posts) {
      setLikesArr(post.likes)
    }

  },[posts])

 
    const handleLike = async () => {
     
      const likeData = {postId: post._id, userId: user._id}
      try {
        const res = await likePost(likeData)
        dispatch(res)
        dispatch(getPosts(user._id))
  
    } catch (err) {
        toast.error(err?.data?.message || err.error);
    }
    }

    const handleComments = async (e) => {    
      try {
        if (!commentOpen) {

          const res = await getComments()
            dispatch(res)
        }
        
    } catch (err) {
        toast.error(err?.data?.message || err.error);
        
    }
    }

    
    return (
      <div className="post">
 
        <div className="container">
     {
      isLoading ? 
        <div className="spinner">
                  <ColorRing
                      visible={true}
                      height="100"
                      width="100"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                  />  
                  <p>Loading...</p>
                </div> : 
        <>
        
          <div className="user">
            <div className="userInfo">
              
              <img src={'/upload/' + userArr?.find((item)=>item._id === post.userId).profilePicture} alt="" />
              <div className="details">
                <Link
                  to={`/find/${post.userId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span className="name">{post.name}</span>
                </Link>
                <span className="date">{moment(post.createdAt).fromNow()}</span>
              </div>
            </div>
            <div className="takeAction" ref={actionBtn}>
             <MoreHorizIcon 
          
             />
            </div>
          </div>

          <div className="content">
            <p>{post.descreption}</p>

            <img src={'/upload/' + post.img} alt="" />
            
          </div>
          <div className="info">
            <div className="item">
               {likesArr?.includes(user._id) ? <FavoriteOutlinedIcon style={{color:'red'}} onClick={handleLike}/> :
               <FavoriteBorderOutlinedIcon onClick={handleLike}/> }
              {post.likes?.length} Likes
            </div>
            <div className="item" onClick={(e) =>handleComments(e)} ref={commentBtn}>
              <TextsmsOutlinedIcon />
              {commentArr?.length} Comments
            </div>
            <div className="item">
              <ShareOutlinedIcon />
              Share
            </div>
       
          </div>
          </> }
          {commentOpen && <Comments 
              post={post} 
              commentArr={commentArr} 
              setCommentArr={setCommentArr}
              commentOpen={commentOpen}
              setCommentOpen={setCommentOpen}
          />}
        </div>
         
        { open &&  <div className="postAction"><PostAction post={post} setOpen={setOpen}/></div>}
       
      </div>
    );
  };
  
  export default Post;