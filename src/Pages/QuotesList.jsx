import { useEffect, useState } from 'react';
import axios from 'axios';

const QuoteListPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [newQuoteText, setNewQuoteText] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchQuotes = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    const token = localStorage.getItem('authToken')
    axios.defaults.headers.common['Authorization'] = `${token}`;

    try {
      const res = await axios.get(`https://assignment.stage.crafto.app/getQuotes?limit=5&offset=${page * 5}`);
      const newQuotes = res.data.data;

      if (newQuotes.length === 0) {
        setHasMore(false); // Stop pagination if no new quotes
      } else {
        setQuotes(prev => [...prev, ...newQuotes]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching quotes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleCreateQuote = async () => {
    try {
      const token = "<TOKEN>"; // Replace with actual token
      const res = await axios.post(
        'https://assignment.stage.crafto.app/postQuote',
        {
          text: newQuoteText,
          mediaUrl: newMediaUrl
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      setQuotes([res.data.data, ...quotes]); // Prepend new quote to list
      setShowModal(false);
      setNewQuoteText('');
      setNewMediaUrl('');
    } catch (error) {
      console.error("Error creating quote", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
   
   <div className="flex flex-row flex-wrap justify-center gap-4">
  {quotes.map((quote, index) => (
    <div key={index} className="relative bg-white shadow-md rounded-md overflow-hidden w-64">
      {/* Image with overlayed text */}
      {quote.mediaUrl && (
        <div className="relative">
          <img src={quote.mediaUrl} alt="Quote" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <p className="text-white text-lg font-semibold px-4 text-center">{quote.text}</p>
          </div>
        </div>
      )}

      {/* Username and creation date */}
      <div className="p-4">
        <p className="text-gray-700 font-medium">By {quote.username}</p>
        <p className="text-gray-500 text-sm">Created on {new Date(quote.createdAt).toLocaleString()}</p>
      </div>
    </div>
  ))}
</div>

      {/* Loading spinner */}
      {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700"
      >
        +
      </button>

      {/* Modal for creating new quote */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create New Quote</h2>
            <input
              type="text"
              placeholder="Quote text"
              value={newQuoteText}
              onChange={(e) => setNewQuoteText(e.target.value)}
              className="border p-2 w-full mb-4 rounded"
            />
            <input
              type="text"
              placeholder="Media URL"
              value={newMediaUrl}
              onChange={(e) => setNewMediaUrl(e.target.value)}
              className="border p-2 w-full mb-4 rounded"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCreateQuote}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Create
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 px-4 py-2 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteListPage;
