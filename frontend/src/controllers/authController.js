import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/auth';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Login API Error:', error.response ? error.response.data : error.message);
    
    const errorMessage = error.response 
      ? (error.response.data.message || 'Login failed due to an unknown error.')
      : 'Network error or server unreachable.';
      
    throw new Error(errorMessage);
  }
};

export const registerUser = async (username, password, role) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      username,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    console.error('Registration API Error:', error.response ? error.response.data : error.message);
    
    const errorMessage = error.response 
      ? (error.response.data.message || 'Registration failed due to an unknown error.')
      : 'Network error or server unreachable.';
      
    throw new Error(errorMessage);
  }
};
