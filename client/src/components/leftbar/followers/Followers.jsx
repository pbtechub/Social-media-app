import './followers.scss'
import {rightItems} from '../../../assets/data'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {  reset } from '../../../redux/slices/friends/friendsSlice'
import { ColorRing } from 'react-loader-spinner'



const Followers = () => {
   
    const [followersArr, setfollowersArr] = useState([])
    const user = useSelector((state)=> state.auth)
    const  { users}= useSelector((state) => state.users)
    const  { followers, isError, isLoading, isSuccess, message }= useSelector((state) => state.friends)
    const currentUser = users.find((item)=>item._id === user._id)
    const dispatch = useDispatch();
    const navigate = useNavigate()


   

    let userfollowers = users.filter((user)=> followers.includes(user._id))



    useEffect(()=> {

    //   if (isError) {
    //     toast.error(message)
    // }

      if(followers) {
     
        setfollowersArr(userfollowers)
       
      }
         
         return () => {
           dispatch(reset)
         }
       
       }, [followers])

  
  
    const handleUserProfile = async (id) => {
  
      try {
        

        navigate(`/profile/${id}`)
  
      } catch (err) {
        toast.error(err?.data?.message || err.error);
  
      }
  
    }
  return (
    <div className="followers" >
                
    <div className="title">
      <span>Followers  <span>{`${followers.length}`}</span></span>
    </div>

 
    <div className='otherAccounts'>
      
        {followersArr?.map((item, index) =>(


          <div className="friend" key={item._id}>
             {
             isLoading ? 
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
            <div className="userInfo" onClick={() => handleUserProfile(item._id)}>
              <img
                src={'/upload/'+item.profilePicture}
                alt=""
              />
              <p>{item.name}</p>
            </div>
              <div className="buttons">
                <button>View</button>
              </div>
            </>
             }
          
          </div>
        ))}
    </div>

    
    
  </div>
  )
}

export default Followers