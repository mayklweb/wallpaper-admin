export async function apiRequest(method, endpoint, data = null) {
  const token = getToken();
  const config = {
    method,
    url: `${API_URL}${endpoint}`,
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
    data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    // Optional: Handle unauthorized errors globally
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access. Redirecting to login.");
      logout(); // Logout the user if the token is invalid or expired
    }
    throw error;
  }
}
