import axios from 'axios';

const API_URL = 'https://marimovit1.pythonanywhere.com'

// Function to log in the user
export async function login({username, password}) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    
    // Save the token to localStorage on successful login
    const token = response.data.key;
    localStorage.setItem('authToken', token);
    
    return response.data; // Optional: Return user data if needed
  } catch (error) {
    console.error("Login error:", error.response?.data?.msg || error.message);
    throw error;
  }
}

// Function to get the token
export function getToken() {
  return localStorage.getItem('authToken');
}

// Function to remove the token on logout
export function logout() {
  localStorage.removeItem('authToken');
  window.location.href = '/login'; // Optional: Redirect to login page
}
