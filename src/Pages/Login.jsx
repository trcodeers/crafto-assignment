import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import httpService from "../utility/httpService";
import { isAuthenticated } from "../utility/auth";
import { notify } from "../utility/toastService";

const Login = () => {

  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('1234');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(isAuthenticated()){
      navigate('/quoteList')
    } 
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await httpService.post('/login', {
        username: username,
        otp: otp, 
      });

      // Store the token in localStorage if login is successful
      localStorage.setItem('authToken', response.data.token);
  
      // Redirect to the quotes list page
      navigate('/quoteList');
    } catch (err) {
      notify('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="w-96 bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="1234" // Default OTP for demonstration
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
