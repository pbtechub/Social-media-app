import { useDispatch, useSelector, } from "react-redux";
import "./share.scss";
import { useContext, useState} from 'react';
import axios from 'axios'
import { toast } from "react-toastify";
import { createPost } from "../../redux/slices/posts/postsSlices";
import { ThreeDots } from 'react-loader-spinner'



const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [err, setErr] = useState(null)


  const  { user }= useSelector((state) => state.auth)
  const  { posts, isLoading, isSuccess, isError, message }= useSelector((state) => state.posts)
  const  { users }= useSelector((state) => state.users)
  const currentUser = users.find((item)=>item._id === user._id)
  const dispatch = useDispatch();

    const upload = async () => {

      try {
          const formData = new FormData()
          formData.append('file', file)
          const res = await axios.post('api/upload', formData) 
          return res.data
     
      } catch(err) {
        toast.error(err?.data?.message || err.error);
      }

  };



 
  const handlePost = async (e) => {
    e.preventDefault()
    
    let imgUrl 
    if (file) imgUrl = await upload()

    console.log(desc, file, imgUrl);


    try {

      
      const res = await createPost({userId:user._id, name: user.name, descreption : desc, img: imgUrl})
        dispatch(res)
        if (isSuccess) {
          toast.success('Post has been successfully posted')
        }


  } catch (err) {
      toast.error(err?.data?.message || err.error);
      
  }


  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
          <img src={user ? '/upload/'+user.profilePicture : 
                            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt='' />
            <input
              type="text"
              placeholder={`What's on your mind ${user.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src='https://github.com/safak/youtube2022/blob/social-app/client/src/assets/friend.png?raw=true' alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src='https://github.com/safak/youtube2022/blob/social-app/client/src/assets/friend.png?raw=true' alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src='https://github.com/safak/youtube2022/blob/social-app/client/src/assets/friend.png?raw=true' alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            {isLoading ? <ThreeDots
                height={40}
                width={40}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}

            /> : <button onClick={handlePost}>Share</button>}
            
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default Share;

