import { setup } from 'axios-cache-adapter';

const baseURL = 'https://assignment.stage.crafto.app';

// Create Axios instance with cache adapter
const api = setup({
  baseURL: baseURL,
  cache: {
    maxAge: 15 * 60 * 60, // 15 mins
  },
});

// Request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// API Client for GET requests (with optional cache control)
const apiClientGet = (url, cachable = true) => {
  console.log(url, cachable)
  if (!cachable) {
    // Disable cache for this request
    return api.get(url, { cache: { maxAge: 0 } });
  }
  return api.get(url); // Cachable request
};

// API Client for POST requests (uses base URL and attaches token)
const apiClientPost = (url, body) => {
  return api.post(url, body);
};

// Other HTTP methods: PUT and DELETE
const apiClientPut = (url, body) => {
  return api.put(url, body);
};

const apiClientDelete = (url) => {
  return api.delete(url);
};

// Expose HTTP methods through a service object
const httpService = {
  get: apiClientGet,
  post: apiClientPost,
  put: apiClientPut,
  delete: apiClientDelete,
};

export default httpService;
