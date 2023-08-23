import { useEffect, useRef, useState } from "react";
import "./update.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllUsers, updateUser } from "../../redux/slices/users/usersSlice";
import { useNavigate } from "react-router-dom";



const Update = ({ setOpenUpdate}) => {
  const  { user}= useSelector((state) => state.auth)
  const  { users, isLoading, isSuccess, isError, message }= useSelector((state) => state.users)

const currentUser = users.find((item)=>item._id === user._id)

  const [username, setUsername] = useState(currentUser.username)
  const [name, setName] = useState(currentUser.name)
  const [city, setCity] = useState(currentUser.city)
  const [website, setWebsite] = useState(currentUser.website)
  const [coverPic, setCoverPic] = useState(null)
  const [profilePic, setProfilePic] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const updateBox = useRef()


  useEffect(()=> {
    let handler =  (event) => {
  
        if (!updateBox.current.contains(event.target)) {
          setOpenUpdate(false)
          }
         }
    document.addEventListener('mousedown', handler);   
    return () => {
      document.removeEventListener('mousedown', handler);
    }
  
  }, [])



  const upload = async (file) => {

    try {
        const formData = new FormData()
        formData.append('file', file)
        const res = await axios.post('/api/upload', formData) 
        return res.data
   
    } catch(err) {
      toast.error(err?.data?.message || err.error);
    }

};



  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl  
    let profileUrl 

    coverUrl = coverPic ? await upload(coverPic) : currentUser.coverPicture
    profileUrl = profilePic ? await upload(profilePic) : currentUser.profilePicture
    
    try {
      const upData = { 
        userId: currentUser._id,
        username: username, 
        name: name, 
        city:city, 
        website:website, 
        coverPicture: coverUrl, 
        profilePicture: profileUrl
      }
      const res = await updateUser(upData)
      dispatch(res)
      dispatch(getAllUsers())
    
      

        if (isSuccess) {
          toast.success('User updated')
          dispatch(getAllUsers())
          setOpenUpdate(false)
        
        }

  } catch (err) {
      toast.error(err?.data?.message || err.error);
      
  }
  }

  return (
    <div className="update" >
      <div className="wrapper" ref={updateBox}>
        <h2>Update Your Profile</h2>
        <form>
          <div className="uploads">

            <div className="files">
              <label htmlFor="cover">
                <span>Cover Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      coverPic
                        ? URL.createObjectURL(coverPic)
                        : "/upload/"+currentUser.coverPicture
                    }
                
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="cover"
                style={{ display: "none" }}
                onChange={(e) => setCoverPic(e.target.files[0])}
              />
              <label htmlFor="profile">
                <span>Profile Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      profilePic
                        ? URL.createObjectURL(profilePic)
                        : "/upload/"+currentUser.profilePicture
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="profile"
                style={{ display: "none" }}
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </div>
            <div className="texts">

              <label className='lable'>Username</label>
              <input
                type="text"
                value={username}
                name="email"
                onChange={(e)=>setUsername(e.target.value)}
              />
              <label className='lable'>Name</label>
              <input
                type="text"
                value={name}
                name="name"
                onChange={(e)=>setName(e.target.value)}
              />
              <label className='lable'>Country / City</label>
              <input
                type="text"
                value={city}
                name="name"
                onChange={(e)=>setCity(e.target.value)}
              />
              <label className='lable'>Website</label>
              <input
                type="text"
                name="city"
                value={website}
                onChange={(e)=>setWebsite(e.target.value)}
              />

            </div>
          </div>
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;