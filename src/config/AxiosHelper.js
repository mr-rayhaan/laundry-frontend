// axiosHelper.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const API_TOKEN = ''; // Replace with your actual API token

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const apiGet = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    console.log('apiGet successful ',response);
    return response.data;
  } catch (error) {
    console.error('Error making GET request:', error);
    throw error;
  }
};

export const apiPost = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error making POST request:', error);
    throw error;
  }
};

export const apiPostFormData = async (endpoint, formData) => {
  try {
    const response = await axiosInstance.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error making POST request with form data:', error);
    throw error;
  }
};

// Add more helper functions as needed
