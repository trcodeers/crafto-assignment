
const QuoteCard = (props) => {

    const { quote } = props

    return (
        <>
            <div className="relative bg-white shadow-md rounded-md overflow-hidden m-4 w-60 flex flex-col justify-between">
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
        </>
    )
}

export default QuoteCard;