import axios from 'axios';

const USER_URL = '/api/user'


const getAllFollowers = async (userId) => {
    // console.log(userId);
    const response = await axios.get(`${USER_URL}/followers/${userId}`)

 
    return response.data
}


const getAllFollowings = async (userId) => {
    const response = await axios.get(`${USER_URL}/followings/${userId}`)
  
    return response.data
   
}

const friendService = {
    getAllFollowers,
    getAllFollowings,

   
}

export default friendService