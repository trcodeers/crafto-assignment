import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/product",
    element: <Product/>,
  }
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
