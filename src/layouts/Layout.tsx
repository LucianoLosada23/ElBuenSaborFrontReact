import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Layout() {
  return (
    <>
     
        <div>
            <header>
                <Navbar/>
            </header>
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
