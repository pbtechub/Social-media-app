import './rightbar.scss'
import {rightItems} from '../../assets/data'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { followUser, getAllUsers } from '../../redux/slices/users/usersSlice'
import { reset } from '../../redux/slices/auth/authSlice'
import { ColorRing } from 'react-loader-spinner'
import { getPosts } from '../../redux/slices/posts/postsSlices'
import { getAllFollowers, getAllFollowings } from '../../redux/slices/friends/friendsSlice'





const RightBar = () => {
  
  const [usersArr, setUsersArr] = useState([])
  const [followersWithNotFollowingArr, setFollowersWithNotFollowingArr] = useState([])
  const {user} = useSelector((state)=> state.auth)
  const  { users, isLoading, isSuccess, isError, message }= useSelector((state) => state.users)
  const  { followings }= useSelector((state) => state.friends)
  const  { followers }= useSelector((state) => state.friends)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const notIncludeCurrentUser = users ? users.filter((item)=> item._id !== user._id) : []
  const latestUsers = followings.length !== 0 ? users ? notIncludeCurrentUser.filter((item)=> !followings.includes(item._id)) : [] : users
  const friendsIdArr = followers.filter(e => followings.indexOf(e) !== -1)
  let followersWithNotFollowing = followers.filter(x => !friendsIdArr.includes(x));
  let followback = users.filter((user)=> followersWithNotFollowing.includes(user._id))



  useEffect(()=> {
   
      if (isError) {
        toast.error(message)
    } else {
      
      setUsersArr(latestUsers)
      
    }
    
      return () => {
        dispatch(reset)
      }
  }, [])


 
         
  useEffect(()=> {

      setFollowersWithNotFollowingArr(followback)
      setUsersArr(latestUsers)
     
    return () => {
      dispatch(reset)
    }
  }, [users])


  const handleUserProfilePosts = async (id) => {

    try {
      
      
      dispatch(await getPosts(user._id))
      navigate(`/profile/${id}`)

    } catch (err) {
      toast.error(err?.data?.message || err.error);

    }

  }


  const handleFollowback = async (friendId) => {
    const followData = {friendId: friendId, userId: user._id}
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
    <div className='rightBar'>
      <div className="container">
        {rightItems.map((item) => (
          <div className="item" key={item.id}>
            <div className="title">
              <span>{item.title}</span>
            </div>

            {item.id === 1 && 
            <div className='otherAccounts'>
              
                {
                usersArr?.map((item, index) =>(
                  <div className="user" key={item._id}>
                      {isLoading ? 
                  <div className="spinner">
                    <ColorRing
                        visible={true}
                        height="70"
                        width="70"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />  
                    <p>Loading...</p>
                  </div> :
                    <>
                    <div className="userInfo" onClick={() => handleUserProfilePosts(item._id)}>
                      <img
                        src={'/upload/'+item.profilePicture}
                        alt=""
                      />
                      <p>{item.name}</p>
                    </div>
                      <div className="buttons">
                      {/* <button onClick={() => handleFollow()}>{followings.includes(item._id) ? 'following' : 'follow'}</button> */}
                      <button onClick={() => {}}>{followers?.includes(item._id) ? 'follower' : 'view'}</button>
                      </div>
                    </>}
                  
                  </div>
                ))}
            </div>
            }
            {item.id === 2 && 
            <div className='otherAccounts'>
              
                {
                followersWithNotFollowingArr?.map((item, index) =>(
                  <div className="user" key={item._id}>
                      {isLoading ? 
                  <div className="spinner">
                    <ColorRing
                        visible={true}
                        height="70"
                        width="70"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />  
                    <p>Loading...</p>
                  </div> :
                    <>
                    <div className="userInfo" onClick={() => handleUserProfilePosts(item._id)}>
                      <img
                        src={'/upload/'+item.profilePicture}
                        alt=""
                      />
                      <p>{item.name}</p>
                    </div>
                      <div className="buttons">
                      <button onClick={() => handleFollowback(item._id)}>{followings.includes(item._id) ? 'following' : 'followback'}</button>
                        <button>dismiss</button>
                      </div>
                    </>}
                  
                  </div>
                ))}
            </div>
            }
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default RightBar