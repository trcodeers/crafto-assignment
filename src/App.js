import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
    <RouterProvider router={router} />
  );
}

export default App;