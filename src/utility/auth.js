
export const isAuthenticated = () => {
    // Check if the user is authenticated
    // You can check for a token in localStorage, session, or any other method
    const token = localStorage.getItem('authToken');
    return !!token; // returns true if token exists, false otherwise
};
  