import axios from 'axios';

// Define the base URL for your API
const API_BASE_URL = 'http://localhost:3000';

// Create an Axios instance with the base URL configured
const baseAPI = axios.create({
  baseURL: API_BASE_URL,
});

export default baseAPI;
