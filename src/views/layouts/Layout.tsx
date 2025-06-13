import { Outlet } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Carrito from "../../components/order/Carrito";
import IsLogin from "../../components/order/IsLogin";
import FacturacionPopUp from "../../components/order/FacturacionPopUp";

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
          <FacturacionPopUp/>
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
