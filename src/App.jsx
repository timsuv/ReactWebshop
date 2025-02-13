import { router } from "./Router";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import "boxicons";
import ShopContextProvider from "./context/ShopContext";

function App() {
  return (
    <>
      <ShopContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </ShopContextProvider>
    </>
  );
}

export default App;
