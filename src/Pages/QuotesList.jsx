import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpService from "../utility/httpService";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const QuoteListPage = () => {

  const navigate = useNavigate(); 

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchQuotes = async () => {
    if (!hasMore || loading) return;
  
    setLoading(true);
    
    try {
      const res = await httpService.get(`/getQuotes?limit=5&offset=${page * 5}`, true); // Use httpService
  
      const newQuotes = res.data.data;
  
      if (newQuotes.length === 0) {
        setHasMore(false); // Stop pagination if no new quotes
      } else {
        setQuotes(prev => [...prev, ...newQuotes]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      if (error.response?.status === 401) { // Check for unauthorized error
        localStorage.removeItem('authToken'); // Remove token
        navigate('/'); // Redirect to login page
      } else {
        console.error("Error fetching quotes", error.response?.data?.error || error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchQuotes();
  }, []);

  const notify = (message) => toast(message);


  return (
    <>
      
      <ToastContainer />

      <div className="min-h-screen bg-gray-100 p-4">

        <div className="flex flex-row flex-wrap justify-center">
          {quotes.map((quote, index) => (
            <div key={index} className="relative bg-white shadow-md rounded-md overflow-hidden m-4 w-60 flex flex-col justify-between">
              {quote.mediaUrl ? (
                <div className="relative">
                  <img src={quote.mediaUrl} alt="Quote" className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold px-4 text-center">{quote.text}</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                  <p className="text-black text-lg font-semibold px-4 text-center">{quote.text}</p>
                </div>
              )}

              {/* Username and creation date - fixed at the bottom */}
              <div className="p-4 mt-auto">
                <p className="text-gray-700 font-medium">By {quote.username}</p>
                <p className="text-gray-500 text-sm">Created on {new Date(quote.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>


        {/* Loading spinner */}
        {loading && page === 0 && <p className="text-center text-gray-500 mt-4">Loading...</p>}


        {/* See More button */}
        {hasMore && page !== 0 && (
          <div className="flex justify-center my-4">
            <button
              className={`px-6 py-2 bg-blue-500 text-white font-semibold rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              onClick={fetchQuotes}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'See More'}
            </button>
          </div>
        )}


        {/* Floating Action Button (FAB) */}
        <button
          onClick={() => navigate('/QuotesForm')}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700"
        >
          +
        </button>


      </div>
    
    </>
  );
};

export default QuoteListPage;
