import { Outlet } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Carrito from "../../components/order/Carrito";
import IsLogin from "../../components/order/IsLogin";
import FacturacionPopUp from "../../components/order/FacturacionPopUp";
import useAddress from "../../hooks/address/useAddress";
import { useEffect } from "react";
import { getAllCities, getAllProvinces } from "../../services/address/Address";

export default function Layout() {
  const { setProvinces, setCities } = useAddress();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provincesData = await getAllProvinces();
        const citiesData = await getAllCities();
        setProvinces(provincesData);
        setCities(citiesData);
      } catch (error) {
        console.error("Error cargando provincias o ciudades:", error);
      }
    };
    fetchData();
  }, []);
  
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
          <FacturacionPopUp />
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
