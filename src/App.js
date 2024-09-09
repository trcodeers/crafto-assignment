import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import QuotesForm from "./Pages/QuotesForm";
import Login from "./Pages/Login";
import QuotesList from "./Pages/QuotesList";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/quoteList",
    element: <QuotesList/>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;