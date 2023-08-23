import './leftbar.scss'
import {menuItems} from '../../assets/data'
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from 'react-router-dom';
import Friends from './friends/Friends';
import { useLocation } from 'react-router-dom'
import Lists from './lists/Lists';
import { useEffect, useState } from 'react';
import Followers from './followers/Followers';
import Following from './following/Following';
import { getPosts } from '../../redux/slices/posts/postsSlices';
import { toast } from 'react-toastify';
import { getAllUsers, reset } from '../../redux/slices/users/usersSlice';


const LeftBar = () => {
  const [selectedList, setSelectedList] = useState('home')
  const  { user }= useSelector((state) => state.auth)
  const  { users, isLoading, isSuccess, isError, message }= useSelector((state) => state.users)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation();




  useEffect(()=> {
    if (isError) {
      toast.error(message)
  }
  if (user) {
    
      dispatch(getAllUsers())
     
  }
  return () => {
    dispatch(reset)
  }
  }, [])


  
// const handleUserHome = () => {
//   navigate('/home')
// }


const handleCurrentUserProfile = () => {


  try {
  
    dispatch(getPosts(user._id))
    dispatch(getAllUsers())
    navigate(`/profile/${user._id}`)

  } catch (err) {
    toast.error(err?.data?.message || err.error);

  }
}

  return (
    <div className='leftBar'>
      <div className="container">
      <div className="currentUser"  onClick={()=> selectedList === 'home' ? handleCurrentUserProfile() : setSelectedList('home')}>
          <img src={user ? '/upload/'+user.profilePicture : 
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt='' />
          <span>{user? user.username: ''}</span>
      </div>

        {selectedList === 'home' && <Lists 
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        />}
        {selectedList === 'Friends' && <Friends />}
        {selectedList === 'Followers' && <Followers />}
        {selectedList === 'Following' && <Following />}
      
      </div>
    </div>
  )
}

export default LeftBar


