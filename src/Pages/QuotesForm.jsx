import { useState } from 'react';
import httpService from "../utility/httpService";
import { useNavigate } from 'react-router-dom';
import { notify } from "../utility/toastService";

const QuoteForm = () => {
  
  const navigate = useNavigate(); 

  const [quoteText, setQuoteText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Upload file to get mediaUrl
  const uploadImage = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await httpService.post('https://crafto.app/crafto/v1.0/media/assignment/upload', formData);
      
      setMediaUrl(response.data[0].url);
      notify('Image uploaded');
    } catch (error) {
      if (error.response?.status === 401) { // Check for unauthorized error
        localStorage.removeItem('authToken'); // Remove token
        navigate('/'); // Redirect to login page
      } else {
        notify(error.response?.data?.error || error.message)
        console.error("Error fetching quotes", error.response?.data?.error || error.message);
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Submit quote creation
  const createQuote = async () => {
    if (!quoteText || !mediaUrl) return 

    setIsSubmitting(true);

    try {
      await httpService.post(
        '/postQuote',
        {
          text: quoteText,
          mediaUrl: mediaUrl,
        });
      notify('Quote created successfully!');
      setQuoteText('');
      setMediaUrl('');
    } catch (error) {
      setQuoteText('');
      setMediaUrl('');
      notify('Something went wrong!');
      console.error('Error creating quote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1); // This takes the user one step back in history
  };

  return (
    <>
    <button
      onClick={handleBack}
      className="bg-gray-300 text-black px-4 py-2 rounded ml-[10%] mt-10"
    >
      Back
    </button>

      <div className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Create a New Quote</h2>

        {/* Quote Text Input */}
        <textarea
          className="w-full p-2 mb-4 border rounded"
          rows="4"
          placeholder="Enter quote text"
          value={quoteText}
          onChange={(e) => setQuoteText(e.target.value)}
        />

        {/* File Upload */}
        <input type="file" onChange={handleFileChange} className="mb-4" />
        {selectedFile && (
          <div className="mb-4">
            <p>Selected file: {selectedFile.name}</p>
            <button
              onClick={uploadImage}
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={createQuote}
          className={`text-white px-4 py-2 rounded ${(isSubmitting || !quoteText || !mediaUrl) ? 'bg-gray-300' : 'bg-blue-500'}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Quote'}
        </button>
      </div>

    </>
  );
};

export default QuoteForm;
