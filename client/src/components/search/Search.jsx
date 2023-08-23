import { useDispatch, useSelector } from 'react-redux';
import { profileControls } from '../../assets/data'
import './serach.scss'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { getPosts } from '../../redux/slices/posts/postsSlices';
import { useNavigate, useNavigation } from 'react-router-dom';

const Search = ({searchData, setSearchOpen}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const  { user}= useSelector((state) => state.auth)
    const  { followings }= useSelector((state) => state.friends)
    const  { followers }= useSelector((state) => state.friends)
    const friendsIdArr = followers.filter(e => followings.indexOf(e) !== -1)

    const handleUserProfilePosts = async (id) => {


        try {
          dispatch(getPosts(user._id))
          navigate(`/profile/${id}`)
    
        } catch (err) {
          toast.error(err?.data?.message || err.error);
    
        }
        setSearchOpen(false)
    
      }


    
  return (
    <div className='search'>
           <div className='serchControl'>
 
        <div className='seeAllProfile'>
            <p>Search results</p>
        </div>
        <div className='profileControlList'>
            {searchData.map((ele, idx) =>  (
                <ul key={ele._id}>
                    <li onClick={()=>handleUserProfilePosts(ele._id)}> 
                        <div className='left'>
                                <img
                                src={'/upload/'+ele.profilePicture}
                                alt=""
                            />
                            <div>
                                <p>{ele.name}</p>
                                <div className='text'>
                                    {/* <span className='dot'></span> */}
                                    <span>{friendsIdArr.includes(ele._id) ? 'Friend' : 
                                            followings.includes(ele._id) ? 'You Following this person.' : 
                                            followers.includes(ele._id) ? 'This person is follows you and follow back to become friend.' : 
                                            user._id === ele._id ? 'You' :
                                            'new'}
                                    </span>
                                </div>
                            </div>
                        </div>
                      

                        <div className='right'>
                            {/* <BsChevronRight /> */}
                        </div>
                        
                    </li>

                </ul>
            ))}
        </div>
        </div>

    </div>
  )
}

export default Search