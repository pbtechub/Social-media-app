import axios from 'axios';

const USER_URL = '/api/user'


const getAllUsers = async () => {
    const response = await axios.get(`${USER_URL}`)
    return response.data
}
const updateUser = async (upData) => {
const {userId, ...others} = upData

    const response = await axios.put(`${USER_URL}/profile/${userId}`, {others})
    localStorage.setItem('userInfo', JSON.stringify(response.data))
    return response.data
}
const followUser = async (followData) => {
const {friendId, ...userId} = followData

console.log(friendId, userId) 
    const response = await axios.put(`${USER_URL}/${friendId}/follow`, {userId })
    localStorage.setItem('userInfo', JSON.stringify(response.data))
    return response.data
}




const userService = {
    getAllUsers,
    updateUser,
    followUser
   
}

export default userService