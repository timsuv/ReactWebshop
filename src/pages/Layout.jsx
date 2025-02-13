import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


const Layout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main >
        <div className="container mx-auto p-4">
        <Outlet />

        </div>
      </main>
      
    </>
  );
};

export default Layout;
