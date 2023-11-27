import axios from 'axios'

const API_URL = '/api/users'

// Register user 
const register = async (userData) => {
    const respone = await axios.post(API_URL, userData)

    if(respone.data) {
        localStorage.setItem('user', JSON.stringify(respone.data))
    }

    return respone.data
}

// Logout service
const logout = () => localStorage.removeItem('user')

const authService = {
    register,
    logout,
}

export default authService