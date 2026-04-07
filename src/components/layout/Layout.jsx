import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuthStore } from "../../stores/authStore";

function Layout() {
  const { isLoggedIn } = useAuthStore();
  return (
    <div className="bg-page-header-bg">
      <Navbar isLoggedIn={isLoggedIn} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
