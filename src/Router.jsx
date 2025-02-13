import { createBrowserRouter } from "react-router-dom";
import  Layout  from "./pages/Layout";
import  Home  from "./pages/Home";
import  Cart  from "./pages//Cart";

const base = "/ReactWebshop";
export const router = createBrowserRouter([
  {
    path: `${base}/`,
    element: <Layout />,
    children: [
      {
        path: `${base}/`,
        element: <Home />,
      },
      {
        path: `${base}/cart`,
        element: <Cart />,
      },
    ],
  },
]);
