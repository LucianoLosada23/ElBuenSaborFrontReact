import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Carrito from "../components/order/Carrito";

export default function Layout() {
  return (
    <>
     
        <div>
            <header>
                <Navbar/>
            </header>
                <section>
                      <Carrito />
                  </section>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
     
    </>
  )
}
