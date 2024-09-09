import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./Pages/Login";
import QuotesList from "./Pages/QuotesList";
import QuotesForm from "./Pages/QuotesForm";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/quoteList",
    element: <QuotesList/>,
  },
  {
    path: "/QuotesForm",
    element: <QuotesForm/>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;