import './profileControl.scss'
import {  useNavigate, } from 'react-router-dom'
import { BsChevronRight } from 'react-icons/bs'
import { profileControls } from '../../../assets/data';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logout, reset } from '../../../redux/slices/auth/authSlice';
import { useEffect, useRef } from 'react';
import { useClickOutside } from '../../../utility/useClickOutside';


const ProfileControl = ({setProfileControl}) => {

    const { user }= useSelector((state) => state.auth)
    const  { users, isLoading, isSuccess, isError, message }= useSelector((state) => state.users)
 

  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const controlBox = useRef();
    
    useClickOutside(controlBox, false, setProfileControl)
   
   
    const handleLogout = async (e)=> {
        try {
            dispatch(logout())
            if (isSuccess || user) {
                dispatch(reset())
                toast.success('You have successfully logged out')
                navigate('/register')
              }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
            
        }

        
      }

      const handleSettings = () => {
     
      }
      const handleHelpAndSupport = () => {
        
      }
      const handleDisplayAndAccessibility = () => {
       
      }
      const handleFeedback = () => {
       
      }
    
  return (
    <div className='profileControl' ref={controlBox}>
       <div className="user">
       <img src={user ? '/upload/'+user.profilePicture : 
                            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt='' />
                <span>{user.username}</span>
            </div>
        <div className='seeAllProfile'>
            <p>See all profile</p>
        </div>
        <div className='profileControlList'>
            {profileControls.map((ele, idx) =>  (
                <ul key={ele.id}>
                    <li  
                        
                        onClick={ idx === profileControls.length -1 ? handleLogout : 
                                idx === 0 ? handleSettings : 
                                idx === 1 ? handleHelpAndSupport : 
                                idx === 2 ? handleDisplayAndAccessibility : 
                                handleFeedback} 
                                > 
                        <div className='left'>
                            <div>{ele.icon}</div>
                            <p>{ele.name}</p>
                        </div>
                        {idx < profileControls.length - 2 && (

                        <div className='right'>
                            <BsChevronRight />
                        </div>
                        )}
                    </li>

                </ul>
            ))}
        </div>
        </div>
  )
}

export default ProfileControl