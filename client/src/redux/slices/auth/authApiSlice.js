import axios from 'axios';

const AUTH_URL = '/api/auth'

const register = async (userData) => {
    const response = await axios.post(`${AUTH_URL}/register`, userData)
    return response.data
}


const login = async (userData) => {
    const response = await axios.post(`${AUTH_URL}/login`, userData)

    if (response.data) {
        localStorage.setItem('userInfo', JSON.stringify(response.data))
    }
    return response.data
}

const logout = async () => {
    const response = await axios.post(`${AUTH_URL}/logout`)
    localStorage.removeItem('userInfo')
}

const authService = {
    register,
    login,
    logout
}

export default authService