import React, { useState } from 'react';
import axios from 'axios';

const QuoteForm = () => {
  const [quoteText, setQuoteText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbmR5IiwiaWF0IjoxNzI1ODg3ODU3LCJleHAiOjE3MjU4OTE0NTd9.4iVS6oKeNQdLOWwmBbJ06oxxBOxCeVcmMBYVOwG_GF0`; // Replace with actual token

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
      const response = await axios.post('https://crafto.app/crafto/v1.0/media/assignment/upload', formData, {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data[0])
      setMediaUrl(response.data[0]); 
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Submit quote creation
  const createQuote = async () => {
    if (!quoteText || !mediaUrl) return alert('Please enter the quote text and upload an image.');

    try {
      const response = await axios.post(
        'https://assignment.stage.crafto.app/postQuote',
        {
          text: quoteText,
          mediaUrl: mediaUrl,
        },
        {
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Quote created successfully!');
    } catch (error) {
      console.error('Error creating quote:', error);
    }
  };

  return (
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
        className="bg-green-500 text-white px-4 py-2 rounded"
        disabled={!quoteText || !mediaUrl}
      >
        Submit Quote
      </button>
    </div>
  );
};

export default QuoteForm;
