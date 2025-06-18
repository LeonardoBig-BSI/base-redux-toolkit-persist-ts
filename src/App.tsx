import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Address from "./pages/Address/Address";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/panel',
    element: <Home />,
  },
  {
    path: '/address',
    element: <Address />,
  },
]);

export { router };