import axios from 'axios';

const COMMENT_URL = '/api/comments'

const createComment = async (commentData) => {
  
    const response = await axios.post(`${COMMENT_URL}`, commentData)
    return response.data
}


const getComments = async () => {
    const response = await axios.get(`${COMMENT_URL}/timeline`)
    return response.data
}


// const deleteComment = async (deleteData) => {
//     const {postId, userId} = deleteData
//     console.log(postId, userId);
//     const response = await axios.delete(`${COMMENT_URL}/${postId}`, { data: { userId: userId } })
//     return response.data
// }





const postService = {
    createComment,
    getComments,

}

export default postService