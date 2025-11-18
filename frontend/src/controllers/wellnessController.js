import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

const authHeaders = () => {
  const token = localStorage.getItem('token');
  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

export const fetchWellnessGoals = async () => {
  const response = await axios.get(`${API_BASE_URL}/wellness`, {
    headers: authHeaders(),
  });
  return response.data;
};

export const updateWellnessGoal = async (goalKey, values) => {
  const response = await axios.put(
    `${API_BASE_URL}/wellness`,
    { goalKey, values },
    {
      headers: authHeaders(),
    }
  );
  return response.data;
};

export const addCustomGoal = async (goalData) => {
  const response = await axios.post(
    `${API_BASE_URL}/wellness/custom`,
    goalData,
    { headers: authHeaders() }
  );
  return response.data;
};

