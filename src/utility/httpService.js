import axios from 'axios';

// Create an instance of axios
const httpService = axios.create({
  baseURL: 'https://assignment.stage.crafto.app',
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
httpService.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('authToken'); 
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);



export default httpService;
