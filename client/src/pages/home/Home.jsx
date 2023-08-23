import './home.scss'
import Stories from '../stories/Stories'
import Share from '../share/Share'
import Posts from '../posts/Posts'

import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPosts, reset } from '../../redux/slices/posts/postsSlices'
import { toast } from 'react-toastify'

const Home = () => {

  const  { user }= useSelector((state) => state.auth)
  
const  { posts, isLoading, isSuccess, isError, message }= useSelector((state) => state.posts)



const dispatch = useDispatch();
const navigate = useNavigate()

useEffect(()=> {
  if (isError) {
    toast.error()
  } 
  

    dispatch(getPosts(user._id))
  

  return () => {
    dispatch(reset)
  }
}, [])



  return (
    <div className='home'>
      <Stories />
      <Share />
      <Posts posts={posts}/>
    </div>
  )
}

export default Home