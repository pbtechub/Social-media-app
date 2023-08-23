import React from 'react'
import './lists.scss'
import {menuItems} from '../../../assets/data'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getAllFollowers, getAllFollowings } from '../../../redux/slices/friends/friendsSlice';
import { toast } from 'react-toastify';


const Lists = ({selectedList, setSelectedList}) => {
    const  { user }= useSelector((state) => state.auth)
    const  { users, isLoading, isSuccess, isError, message }= useSelector((state) => state.users)
    const currentUser = users.find((item)=>item._id === user._id)
    const  { friends }= useSelector((state) => state.friends)
    const navigate = useNavigate()
    const dispatch = useDispatch();


    const handleList = async (name) => {
      setSelectedList(name)
      // if(name === 'Followers') {

      //   try {
      //     const res = await getAllFollowers(user._id)
      //     dispatch( res)
      //   } catch (err) {
      //     toast.error(err?.data?.message || err.error);
      //   } 
      // }


      // if(name === 'Following') {

      //   try {
      //     const res = await getAllFollowings(user._id)
      //     dispatch( res)
      //   } catch (err) {
      //     toast.error(err?.data?.message || err.error);
      //   } 
      // }
      

    }

  return (
    <div className='lists'>
             {menuItems.map((item, index) => (
          <div key={item.id} >
            <div className="menu" >
              {item.id === 1 ? null : (<span>{item.title}</span>)}

              {item.items.map((menu, index) => (
                <div key={index}>
                  {item.id === 1 ? (
                    <div>
                    
                        <div className="item" key={index} onClick={()=>handleList(menu.itemName)}>
                          <img src={menu.itemImg} alt={menu.itemImg} />
                          <span>{menu.itemName}</span>
                        </div>
                     
                    </div>
                    
                  ) : (
                    <div className="item" key={index}>
                      <img src={menu.itemImg} alt={menu.itemImg} />
                      <span>{menu.itemName}</span>
                  </div>
                  )}
                </div>
                  
                  
              ))}


            </div>
            <hr />
          </div>
          
        ))}
    </div>
  )
}

export default Lists