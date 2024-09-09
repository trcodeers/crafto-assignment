const QuoteForm = () => {
    const [quoteText, setQuoteText] = useState("");
    const [mediaUrl, setMediaUrl] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      postQuote(quoteText, mediaUrl);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <textarea
          value={quoteText}
          onChange={(e) => setQuoteText(e.target.value)}
          placeholder="Enter your quote"
          required
        />
        <input
          type="text"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          placeholder="Optional media URL"
        />
        <button type="submit">Post Quote</button>
      </form>
    );
  };
  