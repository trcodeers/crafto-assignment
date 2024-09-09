import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import QuotesForm from "./Pages/QuotesForm";
import Login from "./Pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;