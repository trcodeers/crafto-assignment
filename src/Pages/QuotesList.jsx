const QuotesList = () => {
    return (
      <div className="quotes-container">
        {quotes.map(quote => (
          <div key={quote.id} className="quote-item">
            <h3>{quote.username}</h3>
            <p>{quote.text}</p>
            {quote.mediaUrl && <img src={quote.mediaUrl} alt="Quote media" />}
            <span>{new Date(quote.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    );
  };
  