import { useDispatch, useSelector } from "react-redux";
import Posts from "../posts/Posts";
import "./profile.scss";
import ProfileTop from "./profileTop/ProfileTop";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {  getPosts,  reset } from "../../redux/slices/posts/postsSlices";
import { useLocation, useNavigate } from "react-router-dom";






const Profile = () => {
  const  { user }= useSelector((state) => state.auth)
  const  { users}= useSelector((state) => state.users)
const [friendPostsArr, setFriendPostsArr] = useState([])

const  { posts, isLoading, isSuccess, isError, message }= useSelector((state) => state.posts)
const  { followings  }= useSelector((state) => state.friends)
const dispatch = useDispatch()
const navigate = useNavigate()
const location = useLocation();

const profileId = location.pathname.split('/')[2]


let friendArr = posts.filter((item)=> item.userId === profileId)
let profileObj = users.find((item)=> item._id === profileId)

useEffect(()=> {
  dispatch(getPosts(user._id))

},[followings])

useEffect(()=> {
  dispatch(getPosts(user._id))

},[])



  return (  
    <div className="userProfile">
      <ProfileTop profile={profileObj}/>
      <Posts posts={friendArr}/>
    </div>
  );
};

export default Profile;