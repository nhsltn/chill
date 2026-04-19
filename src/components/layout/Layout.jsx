import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";

function Layout() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="bg-page-header-bg">
      <Navbar isLoggedIn={isLoggedIn} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
