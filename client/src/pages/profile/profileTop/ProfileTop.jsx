import './profileTop.scss'
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ColorRing } from 'react-loader-spinner'
import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Posts from "../../posts/Posts";
import Update from '../../../components/update/Update'
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { followUser, getAllUsers} from "../../../redux/slices/users/usersSlice";
import { getAllFollowers, getAllFollowings } from '../../../redux/slices/friends/friendsSlice';

const ProfileTop = () => {
const [followData, setFollowData] = useState('')
const [followingArr, setFollowingArr] = useState([])
const [openUpdate, setOpenUpdate] = useState(false)
const  { user }= useSelector((state) => state.auth)
const  { users, isLoading, isError, message }= useSelector((state) => state.users)
const  { followings, followers, isSuccess }= useSelector((state) => state.friends)



const dispatch = useDispatch()

const location = useLocation()
const id = location.pathname.split('/')[2]

const profile = users.find((item)=>item._id === id)



useEffect(() => { 

  dispatch(getAllUsers())
  
 
if (followings) {
  setFollowingArr(followings)
}

  }, [])



  const handleFollow = async () => {

    setFollowData({friendId: profile._id, userId: user._id})
    try {
      const res = await followUser(followData)
      dispatch(res)
      dispatch(await getAllFollowings(user._id))
      dispatch(await getAllFollowers(user._id))



  } catch (err) {
      toast.error(err?.data?.message || err.error);
  }
  }

  return (
    

    <div className="profileTop">
        {isLoading ? 
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
        <div className="">
            <div className="images">
              <img
                src={users ? '/upload/'+profile.coverPicture : ''}
               
                alt=""
                className="cover"
              />
              <img
                src={users ? '/upload/'+profile.profilePicture : ''}
               
                alt=""
                className="profilePic"
              />
            </div>
            <div className="profileContainer">
              <div className="uInfo">
              <div className="top"> 
                  <div className="info">
                    <div>
                      <div className="item">
                        <PlaceIcon fontSize="small"/>
                        <span>{profile.city}</span>
                      </div>
                      <div className="item">
                        <LanguageIcon fontSize="small"/>
                        <span>{profile.website}</span>
                      </div>
                    </div>
                    <span>{profile.username}</span>
                    {profile._id === user._id ? <button onClick={() => setOpenUpdate(true)}>Update</button> :

                    <button onClick={() => handleFollow()}>{followings?.includes(profile._id) ? 'following' : followers?.includes(profile._id)? 'follower' : 'follow'}</button>
                   
                    
                    }
                
                  </div> 
                </div>
                <div className="bottom">
                  <div className="left">
                    <a href="http://facebook.com">
                      <FacebookTwoToneIcon fontSize="small" />
                    </a>
                    <a href="http://facebook.com">
                      <InstagramIcon fontSize="small" />
                    </a>
                    <a href="http://facebook.com">
                      <TwitterIcon fontSize="small" />
                    </a>
                    <a href="http://facebook.com">
                      <LinkedInIcon fontSize="small" />
                    </a>
                    <a href="http://facebook.com">
                      <PinterestIcon fontSize="small" />
                    </a>
                  </div>
                  <div className="right">
                    <a href="http://" target="_blank" >
                      <EmailOutlinedIcon fontSize="small" />
                    </a>
                    <a href="http://" target="_blank" >
                      <MoreVertIcon fontSize="small"/>
                    </a>
                  </div>
                </div>
              </div>
          
            </div>

            {openUpdate && <Update 
            setOpenUpdate={setOpenUpdate}
            />}
        </div>
}
  </div>
    

  )
}

export default ProfileTop