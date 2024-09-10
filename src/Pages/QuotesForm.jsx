import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuoteForm = () => {
  const [quoteText, setQuoteText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbmR5IiwiaWF0IjoxNzI1ODk0MDQyLCJleHAiOjE3MjU4OTc2NDJ9.TM0YswGPuYXWx6nOQbsAplYHFA4_Ec3EFst8C6uWNxg`; 

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
      // console.log(response.data[0].url)
      setMediaUrl(response.data[0].url);
      notify('Image uploaded') 
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Submit quote creation
  const createQuote = async () => {
    if (!quoteText || !mediaUrl) return alert('Please enter the quote text and upload an image.');

    setIsSubmitting(true)
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
      notify('Quote created successfully!');
      setQuoteText('')
      setMediaUrl('')
      setIsSubmitting(false)
    } catch (error) {
      setQuoteText('')
      setMediaUrl('')
      notify('Something went wrong!');
      console.error('Error creating quote:', error);
      setIsSubmitting(false)
    }
  };

  const notify = (message) => toast(message);

  return (
    <>
          <ToastContainer />

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
        {isSubmitting ? 'Submitting...' : 'Submit Quote'}
      </button>
    </div>
    </>
  );
};

export default QuoteForm;
