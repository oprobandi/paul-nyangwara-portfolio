import { Outlet } from "react-router-dom";
import Navbar    from "./Navbar";
import Footer    from "./Footer";
import WhatsApp  from "./WhatsApp";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
