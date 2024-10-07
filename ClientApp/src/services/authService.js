import axios from "axios";

const API_URL = `http://localhost:5152/api/auth`; 

export const register = async (userData) => {
    const result = await axios.post(`${API_URL}/register`, userData)
    return result
};

export const login = async (credentials) => {
    try {
        const result = await axios.post(`${API_URL}/login`, credentials);
        return result;
    } catch (error) {
        if (error.message.includes('401')) {
            throw new Error('Unable to Login! Wrong username or password');
        } else {
            console.error('Other error:', error);
        }
    }
};

export const logout = () => {
    // Clear user session data
    localStorage.removeItem('userToken');
    localStorage.removeItem('user'); // Remove user data if stored

    // Redirect to the login page or homepage, which is done through Navbar component, since useNavigate cannot be used outside of component. 
};

export const getCurrentUser = () => {
    return localStorage.getItem('userToken');
};