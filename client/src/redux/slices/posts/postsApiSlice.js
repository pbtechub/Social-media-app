import axios from 'axios';

const POST_URL = '/api/posts'

const createPost = async (postData) => {
  
    const response = await axios.post(`${POST_URL}`, postData)
    return response.data
}


const getPosts = async (userId) => {
    const response = await axios.get(`${POST_URL}/timeline/${userId}`)
    return response.data
}




const deletePost = async (deleteData) => {
    const {postId, userId} = deleteData
    console.log(postId, userId);
    const response = await axios.delete(`${POST_URL}/${postId}`, { data: { userId: userId } })
    return response.data
}

const likePost = async (likeData) => {
    
    const {postId, ...userId} = likeData
    
    console.log(postId, userId) 
        const response = await axios.put(`${POST_URL}/${postId}/like`, {userId})
        return response.data
    }


const commentPost = async (commentData) => {
    
    const {postId, ...comments} = commentData
    
    console.log(postId, comments) 
        const response = await axios.put(`${POST_URL}/${postId}/comment`, {comments})
        return response.data
    }




const postService = {
    createPost,
    getPosts,
    deletePost,
    likePost,
    commentPost
   
   
}

export default postService