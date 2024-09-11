import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./Pages/Login";
import QuotesList from "./Pages/QuotesList";
import QuotesForm from "./Pages/QuotesForm";
import PrivateRoute from "./component/PrivateRoute";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/quoteList",
    element: <PrivateRoute element={<QuotesList />} />,
  },
  {
    path: "/QuotesForm",
    element: <PrivateRoute element={<QuotesForm />} />,
  },
]);

function App() {
  return (
    <>
        <ToastContainer position="top-right" autoClose={3000} />
    <RouterProvider router={router} />
    
    </>
  );
}

export default App;