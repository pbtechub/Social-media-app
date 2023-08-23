import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftbar/LeftBar";
import RightBar from "./components/rightbar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext, useEffect } from "react";
import { DarkModeContext } from './context/darkModeContext';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { getAllUsers, reset } from "./redux/slices/users/usersSlice";
import { getPosts } from "./redux/slices/posts/postsSlices";
import { getAllFollowers, getAllFollowings } from "./redux/slices/friends/friendsSlice";





function App() {
  

  const { mode } = useContext(DarkModeContext);
  const  { user, isLoading, isSuccess, isError, message }= useSelector((state) => state.auth)
  const  { users  }= useSelector((state) => state.users)
  const  { followings  }= useSelector((state) => state.friends)
  const navigate = useNavigate()
  const dispatch = useDispatch();




  useEffect(()=>{
    if (isError) {
        toast.error(message)
    }
    if (user) {
        navigate('/home')
        dispatch(getAllUsers())
        dispatch(getPosts(user._id))
        dispatch(getAllFollowings(user._id))
        dispatch(getAllFollowers(user._id))
        
        
    } else {
       navigate('/register')
    }
    return () => {
      dispatch(reset)
    }

}, [user])






  return (
    <div className={`theme-${mode ? 'dark' : 'light'}`}>
       <ToastContainer />
      {!user ? (
          
          <Routes>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
          </Routes>
       
          ) : (

          <div>
            
              <Navbar/> 
              <div style={{display: 'flex'}}>
              
                  <LeftBar />
                
                <div style={{flex: 6}}>
                  <Routes>
                    <Route exact path='/home' element={<Home />}/>
                    <Route path='/profile/:id' element={<Profile />}/>
                  </Routes>
                </div>
                <RightBar />
              </div>
           
          </div>
        )}
    </div>
 
  );
}

export default App;