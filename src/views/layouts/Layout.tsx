import { Outlet } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Carrito from "../../components/order/Carrito";
import IsLogin from "../../components/order/IsLogin";

export default function Layout() {
  return (
    <>
      <div>
        <header>
          <Navbar />
        </header>
        <section>
          <Carrito />
        </section>
        <section>
          <IsLogin />
        </section>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}
