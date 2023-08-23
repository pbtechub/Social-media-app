import './following.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ColorRing } from 'react-loader-spinner'
import { getPosts } from '../../../redux/slices/posts/postsSlices'


const Following = () => {
    const [followingsArr, setFollowingsArr] = useState([])
    const {user} = useSelector((state)=> state.auth)
    const  { users }= useSelector((state) => state.users)
    const  { followings, isError, isLoading, isSuccess, message }= useSelector((state) => state.friends)
    const dispatch = useDispatch();
    const navigate = useNavigate()



  let userfollowings = users.filter((user)=> followings.includes(user._id))



  useEffect(()=> {

        
      if(followings) {

        setFollowingsArr(userfollowings)
      }
  
  }, [])


  useEffect(()=> {

    setFollowingsArr(userfollowings)
  
  }, [followings])
  

  
    const handleUserProfile = async (id) => {

      try {
        dispatch( await getPosts(user._id))
        navigate(`/profile/${id}`)
  
      } catch (err) {
        toast.error(err?.data?.message || err.error);
  
      }
  
    }


  return (
    <div className="following" >
                
    <div className="title">
      <span>Following <span>{`${followings.length}`}</span></span>
    </div>

 
    <div className='otherAccounts'>

    
        {followingsArr?.map((item, index) =>(

          <div className="friend" key={item._id}>
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
                  </>}
          
          </div>
        ))}
    </div>

    
    
  </div>
  )
}

export default Following