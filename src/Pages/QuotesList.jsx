import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpService from "../utility/httpService";
import { notify } from "../utility/toastService";

import QuoteCard from '../component/QuoteCard';

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
        notify(error.response?.data?.error || error?.message || 'Something went wrong')
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <>
    
      <div className="min-h-screen bg-gray-100 p-4">

        <div className="flex flex-row flex-wrap justify-center">
          {quotes.map((quote, index) => (
            <QuoteCard key={index} quote={quote} />
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
