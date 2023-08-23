import './postAction.scss'

import { postControls } from '../../assets/data';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPosts } from '../../redux/slices/posts/postsSlices';
import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';
import { useClickOutside } from '../../utility/useClickOutside';


const PostAction = ({post, setOpen}) => {

    const  { user }= useSelector((state) => state.auth)
    const  { posts, isSuccess }= useSelector((state) => state.posts)
    const dispatch = useDispatch();
    const actionBox = useRef()
    
    useClickOutside(actionBox, false, setOpen)

 
    const handleDeletePost = async ()=> {
        const deleteData = {postId:post.userId, userId:user._id}

        try {
            const res = await deletePost(deleteData)
            dispatch(res)
            setOpen(false)
            dispatch(getPosts(user._id))

     

        } catch (err) {
            
            toast.error(err?.data?.message || err.error);
    
        }

        
      }
 
  return (
    <div className='postControl' ref={actionBox}>


     <div className='postControlList'>
         {postControls.map((ele, idx) =>  (
             <ul>
                 <li  
                     key={ele.id}
                     onClick={ele.id === 4 && handleDeletePost } 
                             style={{display: user._id === post.userId ? (ele.id === 3 && 'none') : (ele.id === 4 && 'none')}}
                             > 
                     <div className='left'>
                        
                         <div>{ele.icon}</div>
                         <p>{ele.id === 5 ? `${ele.name} ${post.name}` : `${ele.name}`}</p>
                     </div>
                     
                 </li>

             </ul>
         ))}
     </div>
     </div>
  )
}

export default PostAction