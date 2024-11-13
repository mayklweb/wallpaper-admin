import axios from "axios";


const Axios = axios.create({
  baseURL: "https://marimovit1.pythonanywhere.com",
});

export function sendTokenToHeaders(key) {
  localStorage.setItem("token", key)
  axios.interceptors.request.use(
    (config) => {
      localStorage.getItem("token")
      if (token) {
        console.log(token);
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}




export default Axios
