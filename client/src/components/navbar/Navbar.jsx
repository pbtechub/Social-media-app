
import "./navbar.scss";
import { useEffect, useRef, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

import ProfileControl from "./profileControl/ProfileControl";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/slices/users/usersSlice";
import { toast } from "react-toastify";
import Search from "../search/Search";
import { useClickInside, useClickOutside } from "../../utility/useClickOutside";


const Navbar = () => {
    const [searchOpen, setSearchOpen] = useState(false)
    const [usersArr, setUsersArr] = useState([])
const [search, setSearch] = useState('')
const [filtredData, setFiltredData] = useState([])
const {mode, toggleMode} = useContext(DarkModeContext);
const [profileControl, setProfileControl] = useState(false)
const  { user}= useSelector((state) => state.auth)
const  { users, isLoading, isSuccess, isError, message }= useSelector((state) => state.users)




const navigate = useNavigate()
const dispatch = useDispatch();
const searchBox = useRef()
const controlBtn = useRef();




useEffect(()=> {

    if (isError) {
      toast.error()
    } else {
      setUsersArr(users)
    }

        
    return () => {
      dispatch(reset)
      
    }
  
  }, [search])


useClickOutside(searchBox, false, setSearchOpen, setSearch)
useClickInside(controlBtn, profileControl, setProfileControl)


const handleUserProfile = () => {
    navigate('/home')
  }
const handleSearch = (text) => {
    serachFilter(text)
    setSearchOpen(true)
  }

  const serachFilter = (text) => {
    if (text) {
      const newData = usersArr.filter((item)=>{
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1
      });
      setFiltredData(newData);
      setSearch(text)
    } else {
      setFiltredData([]);
      setSearch(text)
    }
  }  




  return (
    <div className="navbar">
        <div className="left">
            <Link to='/home' style={{textDecoration: 'none'}}>
                <span>Friendsbook</span>
            </Link>
            <div className="left-icons">
                <HomeOutlinedIcon style={{width: "20px", height: "20px"}} onClick={handleUserProfile}/>
                {!mode ?
                 (<DarkModeOutlinedIcon 
                    onClick={toggleMode}
                    style={{width: "20px", height: "20px", cursor: 'pointer'}}/>) :
                 (<WbSunnyOutlinedIcon 
                    onClick={toggleMode}
                    style={{width: "20px", height: "20px", cursor: 'pointer'}}/>)}
                <GridViewOutlinedIcon style={{width: "20px", height: "20px", cursor: 'pointer'}}/>
            </div>
            <div className="search">
                <SearchOutlinedIcon style={{width: "20px", height: "20px", cursor: 'pointer'}}/>
                <input 
                    type="text" 
                    placeholder="Search..."
                    value={search}
                    onChange={(e)=> handleSearch(e.target.value)} />
                    {searchOpen && 
                   <div className="recentSearch" ref={searchBox}>
                        <Search 
                        searchData={filtredData}
                        setSearchOpen={setSearchOpen}/>
                    </div>
                    }
                 
            </div>
           

        </div>
        <div className="right">
            <div className="right-icons">
                <PersonOutlinedIcon style={{width: "20px", height: "20px", cursor: 'pointer'}}/>
                <EmailOutlinedIcon style={{width: "20px", height: "20px", cursor: 'pointer'}}/>
                <NotificationsOutlinedIcon style={{width: "20px", height: "20px", cursor: 'pointer'}}/>
            </div>
            <div 
            ref={controlBtn}
                className="user" 
                // onClick={()=> setProfileControl(!profileControl)}
                >
                                            <img src={user ? '/upload/'+user.profilePicture : 
                            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt='' />
                {/* <span>{currentUser.username}</span> */}
                <div>
                    <ExpandMoreIcon 
                        className="chevronDown" 
                        style={{ transform: profileControl && 'rotate(180deg)'}}
                        />
                </div>
            </div>

        </div>

        { profileControl && 
              <ProfileControl 
              setProfileControl={setProfileControl} 
            />
        }
    </div>
  )
}

export default Navbar